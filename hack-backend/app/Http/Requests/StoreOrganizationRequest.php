<?php

/**
 * StoreOrganizationRequest
 * 
 * Validates data when creating a new organization.
 * Ensures name uniqueness, valid email format, and required fields.
 * Admin-only access is enforced at the route/middleware level.
 */
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrganizationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:organizations,name',
            'abbreviation' => 'nullable|string|max:50',
            'contact_email' => 'required|email|max:255',
            'contact_person' => 'nullable|string|max:255',
            'is_active' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Organization name is required',
            'name.unique' => 'An organization with this name already exists',
            'contact_email.required' => 'Contact email is required',
            'contact_email.email' => 'Contact email must be a valid email address',
            'is_active.required' => 'Active status is required',
        ];
    }
}