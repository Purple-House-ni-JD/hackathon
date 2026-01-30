<?php

/**
 * API Routes
 * 
 * Defines all API endpoints for the document tracking system.
 * 
 * Route Groups:
 * - auth: Login (public), register/logout/me (authenticated)
 * - authenticated: All other resources require authentication
 * 
 * Resource Routes:
 * - documents: Custom CRUD (no default update/destroy)
 * - organizations: Full CRUD
 * - offices: Full CRUD
 * - document-types: Full CRUD (store/update/destroy admin-only via form request)
 */

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DocumentTypeController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\OrganizationController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('documents', DocumentController::class)->except(['update', 'destroy']);
    Route::patch('documents/{id}/status', [DocumentController::class, 'updateStatus']);

    Route::get('organizations', [OrganizationController::class, 'index']);
    Route::get('organizations/{id}', [OrganizationController::class, 'show']);
    Route::post('organizations', [OrganizationController::class, 'store']);
    Route::put('organizations/{id}', [OrganizationController::class, 'update']);
    Route::delete('organizations/{id}', [OrganizationController::class, 'destroy']);

    Route::get('offices', [OfficeController::class, 'index']);
    Route::get('offices/{id}', [OfficeController::class, 'show']);
    Route::post('offices', [OfficeController::class, 'store']);
    Route::put('offices/{id}', [OfficeController::class, 'update']);
    Route::delete('offices/{id}', [OfficeController::class, 'destroy']);

    Route::get('document-types', [DocumentTypeController::class, 'index']);
    Route::get('document-types/{id}', [DocumentTypeController::class, 'show']);
    Route::post('document-types', [DocumentTypeController::class, 'store']);
    Route::put('document-types/{id}', [DocumentTypeController::class, 'update']);
    Route::delete('document-types/{id}', [DocumentTypeController::class, 'destroy']);
});
