<?php

/**
 * DocumentController
 * 
 * Handles document CRUD operations and status updates.
 * Admins can create, update status, and view all documents with filtering.
 * Student org users can only view their organization's documents.
 * Status updates trigger email notifications to document submitters.
 */
namespace App\Http\Controllers;

use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentStatusRequest;
use App\Models\Document;
use App\Models\DocumentStatusHistory;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DocumentController extends Controller
{
    public function __construct(
        private NotificationService $notificationService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $query = Document::with(['organization', 'documentType', 'currentOffice', 'submittedBy']);

        if ($user->isStudentOrg()) {
            if (!$user->organization_id) {
                return response()->json(['message' => 'No organization associated'], 403);
            }
            $query->where('organization_id', $user->organization_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('organization_id')) {
            $query->where('organization_id', $request->organization_id);
        }

        if ($request->has('document_type_id')) {
            $query->where('document_type_id', $request->document_type_id);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('event_name', 'like', "%{$search}%")
                  ->orWhereHas('organization', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $sortBy = $request->get('sort_by', 'updated_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $perPage = $request->get('per_page', 15);
        $documents = $query->paginate($perPage);

        return response()->json($documents);
    }

    public function store(StoreDocumentRequest $request): JsonResponse
    {
        try {
            $document = Document::create([
                'organization_id' => $request->organization_id,
                'document_type_id' => $request->document_type_id,
                'event_name' => $request->event_name,
                'status' => $request->status,
                'current_office_id' => $request->current_office_id,
                'date_received' => $request->date_received,
                'submitted_by' => $request->submitted_by ?? $request->user()->id,
            ]);

            DocumentStatusHistory::create([
                'document_id' => $document->id,
                'previous_status' => null,
                'new_status' => $document->status,
                'previous_office_id' => null,
                'new_office_id' => $document->current_office_id,
                'updated_by' => $request->user()->id,
            ]);

            $document->load(['organization', 'documentType', 'currentOffice', 'submittedBy']);

            return response()->json([
                'message' => 'Document created successfully',
                'document' => $document,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create document',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $document = Document::with([
            'organization',
            'documentType',
            'currentOffice',
            'submittedBy',
            'statusHistory.updatedBy',
            'statusHistory.previousOffice',
            'statusHistory.newOffice',
        ])->find($id);

        if (!$document) {
            return response()->json(['message' => 'Document not found'], 404);
        }

        if ($user->isStudentOrg() && $document->organization_id !== $user->organization_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($document);
    }

    public function updateStatus(UpdateDocumentStatusRequest $request, int $id): JsonResponse
    {
        try {
            $document = Document::find($id);

            if (!$document) {
                return response()->json(['message' => 'Document not found'], 404);
            }

            $previousStatus = $document->status;
            $previousOfficeId = $document->current_office_id;

            DB::beginTransaction();

            $document->status = $request->status;
            if ($request->has('current_office_id')) {
                $document->current_office_id = $request->current_office_id;
            }
            $document->save();

            $statusHistory = DocumentStatusHistory::create([
                'document_id' => $document->id,
                'previous_status' => $previousStatus,
                'new_status' => $document->status,
                'previous_office_id' => $previousOfficeId,
                'new_office_id' => $document->current_office_id,
                'remarks' => $request->remarks,
                'updated_by' => $request->user()->id,
            ]);

            $this->notificationService->sendStatusChangeNotification($statusHistory);

            DB::commit();

            $document->load(['organization', 'documentType', 'currentOffice', 'submittedBy']);

            return response()->json([
                'message' => 'Document status updated successfully',
                'document' => $document,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to update document status',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

