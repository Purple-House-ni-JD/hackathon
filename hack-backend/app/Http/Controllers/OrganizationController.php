<?php

/**
 * OrganizationController
 * 
 * Provides full CRUD access to organization data.
 * - index/show: Available to authenticated users for dropdowns and reference
 * - store/update/destroy: Admin-only operations for managing organizations
 * 
 * CRUD Operations:
 * - Create: Validates unique name, required fields via StoreOrganizationRequest
 * - Read: Lists active organizations with optional search, individual retrieval by ID
 * - Update: Validates unique name (excluding self), required fields via UpdateOrganizationRequest
 * - Delete: Cascades to related offices and sets organization_id to null on users/documents
 * 
 * Assumes admin authorization is handled via middleware at the route level.
 */
namespace App\Http\Controllers;

use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Requests\UpdateOrganizationRequest;
use App\Models\Organization;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Organization::where('is_active', true);

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('abbreviation', 'like', "%{$search}%");
            });
        }

        $organizations = $query->orderBy('name')->get();

        return response()->json($organizations);
    }

    public function show(int $id): JsonResponse
    {
        $organization = Organization::find($id);

        if (!$organization) {
            return response()->json(['message' => 'Organization not found'], 404);
        }

        return response()->json($organization);
    }

    public function store(StoreOrganizationRequest $request): JsonResponse
    {
        $organization = Organization::create([
            'name' => $request->name,
            'abbreviation' => $request->abbreviation,
            'contact_email' => $request->contact_email,
            'contact_person' => $request->contact_person,
            'is_active' => $request->is_active,
            'created_at' => now(),
        ]);

        return response()->json($organization, 201);
    }

    public function update(UpdateOrganizationRequest $request, int $id): JsonResponse
    {
        $organization = Organization::find($id);

        if (!$organization) {
            return response()->json(['message' => 'Organization not found'], 404);
        }

        $organization->update([
            'name' => $request->name,
            'abbreviation' => $request->abbreviation,
            'contact_email' => $request->contact_email,
            'contact_person' => $request->contact_person,
            'is_active' => $request->is_active,
        ]);

        return response()->json($organization);
    }

    public function destroy(int $id): JsonResponse
    {
        $organization = Organization::find($id);

        if (!$organization) {
            return response()->json(['message' => 'Organization not found'], 404);
        }

        $organization->delete();

        return response()->json(['message' => 'Organization deleted successfully'], 200);
    }
}