<?php

/**
 * UpdateOfficeRequest
 * 
 * Validates data when updating an existing office.
 * Ensures valid organization reference, email format, and required fields.
 * Admin-only access is enforced at the route/middleware level.
 */
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOfficeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'abbreviation' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'is_active' => 'required|boolean',
            'organization_id' => 'required|exists:organizations,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Office name is required',
            'email.email' => 'Email must be a valid email address',
            'is_active.required' => 'Active status is required',
            'organization_id.required' => 'Organization is required',
            'organization_id.exists' => 'Selected organization does not exist',
        ];
    }
}