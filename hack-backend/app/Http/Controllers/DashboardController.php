<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Notification;
use App\Models\Office;
use App\Models\Organization;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Return dashboard stats in a single request (admin: all docs; user: org docs).
     */
    public function stats(Request $request): JsonResponse
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $docQuery = Document::query();
        if ($user->isStudentOrg() && $user->organization_id) {
            $docQuery->where('organization_id', $user->organization_id);
        }

        $total = (clone $docQuery)->count();
        $pending = (clone $docQuery)->whereIn('status', ['Received', 'Under Review', 'Forwarded'])->count();
        $rejected = (clone $docQuery)->where('status', 'Rejected')->count();
        $approved = (clone $docQuery)->where('status', 'Approved')->count();

        $activeOrganizations = Organization::where('is_active', true)->count();
        $officesInvolved = Office::where('is_active', true)->count();

        return response()->json([
            'total_documents' => $total,
            'pending_approvals' => $pending,
            'rejected_documents' => $rejected,
            'approved_documents' => $approved,
            'active_organizations' => $activeOrganizations,
            'offices_involved' => $officesInvolved,
        ]);
    }
}
