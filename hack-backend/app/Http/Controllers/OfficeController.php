<?php

/**
 * OfficeController
 * 
 * Provides full CRUD access to office data.
 * - index/show: Available to authenticated users for dropdowns and reference
 * - store/update/destroy: Admin-only operations for managing offices
 * 
 * CRUD Operations:
 * - Create: Validates organization reference, required fields via StoreOfficeRequest
 * - Read: Lists active offices with optional organization/search filters, individual retrieval by ID
 * - Update: Validates organization reference, required fields via UpdateOfficeRequest
 * - Delete: Sets current_office_id to null on documents, cascades history via foreign key
 * 
 * Assumes admin authorization is handled via middleware at the route level.
 */
namespace App\Http\Controllers;

use App\Http\Requests\StoreOfficeRequest;
use App\Http\Requests\UpdateOfficeRequest;
use App\Models\Office;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OfficeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Office::where('is_active', true);

        if ($request->has('organization_id')) {
            $query->where('organization_id', $request->organization_id);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('abbreviation', 'like', "%{$search}%");
            });
        }

        $offices = $query->orderBy('name')->get();

        return response()->json($offices);
    }

    public function show(int $id): JsonResponse
    {
        $office = Office::find($id);

        if (!$office) {
            return response()->json(['message' => 'Office not found'], 404);
        }

        return response()->json($office);
    }

    public function store(StoreOfficeRequest $request): JsonResponse
    {
        $office = Office::create([
            'name' => $request->name,
            'abbreviation' => $request->abbreviation,
            'email' => $request->email,
            'is_active' => $request->is_active,
            'organization_id' => $request->organization_id,
        ]);

        return response()->json($office, 201);
    }

    public function update(UpdateOfficeRequest $request, int $id): JsonResponse
    {
        $office = Office::find($id);

        if (!$office) {
            return response()->json(['message' => 'Office not found'], 404);
        }

        $office->update([
            'name' => $request->name,
            'abbreviation' => $request->abbreviation,
            'email' => $request->email,
            'is_active' => $request->is_active,
            'organization_id' => $request->organization_id,
        ]);

        return response()->json($office);
    }

    public function destroy(int $id): JsonResponse
    {
        $office = Office::find($id);

        if (!$office) {
            return response()->json(['message' => 'Office not found'], 404);
        }

        $office->delete();

        return response()->json(['message' => 'Office deleted successfully'], 200);
    }
}