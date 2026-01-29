<?php

/**
 * LoginRequest
 * 
 * Validates authentication credentials for user login.
 * Ensures email and password are provided and properly formatted.
 */
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'string', 'max:255'],
            'password' => ['required', 'string'],
        ];
    }
}

