<?php

/**
 * AuthController
 * 
 * Handles user authentication and admin-only user registration.
 * 
 * Authentication: Supports login/logout for both OSA admins and student organization users
 * using session-based authentication.
 * 
 * Registration: Only authenticated admins can register new users. Admins can create other
 * admin accounts or student organization accounts. Student organization users must be
 * assigned to a valid organization. The system prevents duplicate emails and validates
 * all input data before creating users.
 */

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password_hash)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if (!$user->is_active) {
            return response()->json(['message' => 'Account is inactive'], 403);
        }

        $user->last_login = now();
        $user->save();

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token, 
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'full_name' => $user->full_name,
                'user_type' => $user->user_type,
                'organization_id' => $user->organization_id,
                'is_active' => $user->is_active,
            ],
        ]);
    }

    public function register(RegisterUserRequest $request): JsonResponse
    {
        $user = User::create([
            'email' => $request->email,
            'password_hash' => Hash::make($request->password),
            'full_name' => $request->full_name,
            'user_type' => $request->user_type,
            'organization_id' => $request->organization_id,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'full_name' => $user->full_name,
                'user_type' => $user->user_type,
                'organization_id' => $user->organization_id,
                'is_active' => $user->is_active,
            ],
        ], 201);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout successful',
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated',
            ], 401);
        }

        return response()->json([
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'full_name' => $user->full_name,
                'user_type' => $user->user_type,
                'organization_id' => $user->organization_id,
            ],
        ]);
    }
}
