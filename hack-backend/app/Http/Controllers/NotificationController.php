<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * List notifications for the authenticated user (recipient).
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $notifications = Notification::where('recipient_user_id', $user->id)
            ->with(['document', 'statusHistory'])
            ->orderBy('created_at', 'desc')
            ->limit(100)
            ->get();

        return response()->json($notifications);
    }
}
