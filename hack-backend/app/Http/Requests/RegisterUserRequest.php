<?php

/**
 * RegisterUserRequest
 * 
 * Validates user registration data for admin-only registration flow.
 * Only authenticated admins can create new users (both admins and student_org users).
 * Enforces unique email constraint, valid user types, and organization requirements
 * for student organization users.
 */

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'string', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'full_name' => ['required', 'string', 'max:255'],
            'user_type' => ['required', 'string', Rule::in(['admin', 'student_org'])],
            'organization_id' => [
                'nullable',
                'integer',
                'exists:organizations,id',
                Rule::requiredIf($this->input('user_type') === 'student_org'),
            ],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'A user with this email already exists.',
            'organization_id.required_if' => 'Organization is required for student organization users.',
            'organization_id.exists' => 'The selected organization does not exist.',
            'user_type.in' => 'User type must be either admin or student_org.',
        ];
    }
}
