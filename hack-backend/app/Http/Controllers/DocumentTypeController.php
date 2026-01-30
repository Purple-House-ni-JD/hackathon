<?php

/**
 * DocumentTypeController
 * 
 * Handles full CRUD operations for document types in the system.
 * 
 * Read operations (index, show): Available to all authenticated users for populating
 * dropdowns when creating documents.
 * 
 * Write operations (store, update, destroy): Restricted to admin/OSA staff only.
 * Authorization is enforced via DocumentTypeRequest form request.
 * 
 * Document types categorize submissions and may require approval workflows.
 * Soft deletion is handled via is_active flag to preserve referential integrity.
 */

namespace App\Http\Controllers;

use App\Http\Requests\DocumentTypeRequest;
use App\Models\DocumentType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DocumentTypeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = DocumentType::query();

        if (!$request->user()?->isAdmin()) {
            $query->where('is_active', true);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $documentTypes = $query->orderBy('name')->get();

        return response()->json($documentTypes);
    }

    public function show(int $id): JsonResponse
    {
        $documentType = DocumentType::find($id);

        if (!$documentType) {
            return response()->json(['message' => 'Document type not found'], 404);
        }

        return response()->json($documentType);
    }

    public function store(DocumentTypeRequest $request): JsonResponse
    {
        $documentType = DocumentType::create([
            'name' => $request->name,
            'description' => $request->description,
            'requires_approval' => $request->boolean('requires_approval', false),
            'is_active' => $request->boolean('is_active', true),
        ]);

        return response()->json([
            'message' => 'Document type created successfully',
            'document_type' => $documentType,
        ], 201);
    }

    public function update(DocumentTypeRequest $request, int $id): JsonResponse
    {
        $documentType = DocumentType::find($id);

        if (!$documentType) {
            return response()->json(['message' => 'Document type not found'], 404);
        }

        $documentType->update([
            'name' => $request->name,
            'description' => $request->description,
            'requires_approval' => $request->boolean('requires_approval', $documentType->requires_approval),
            'is_active' => $request->boolean('is_active', $documentType->is_active),
        ]);

        return response()->json([
            'message' => 'Document type updated successfully',
            'document_type' => $documentType,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        if (!request()->user()?->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $documentType = DocumentType::find($id);

        if (!$documentType) {
            return response()->json(['message' => 'Document type not found'], 404);
        }

        if ($documentType->documents()->exists()) {
            $documentType->update(['is_active' => false]);
            return response()->json([
                'message' => 'Document type deactivated (has associated documents)',
                'document_type' => $documentType,
            ]);
        }

        $documentType->delete();

        return response()->json(['message' => 'Document type deleted successfully']);
    }
}
