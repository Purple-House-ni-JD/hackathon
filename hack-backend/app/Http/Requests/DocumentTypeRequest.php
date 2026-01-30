<?php

/**
 * DocumentTypeRequest
 * 
 * Validates document type data for store and update operations.
 * Only authenticated admins (OSA staff) can create, update, or delete document types.
 * Enforces unique name constraint (excluding current record on update) and validates
 * boolean fields for approval workflow and active status.
 */

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DocumentTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isAdmin();
    }

    public function rules(): array
    {
        $documentTypeId = $this->route('id');

        return [
            'name' => [
                'required',
                'string',
                'max:100',
                Rule::unique('document_types', 'name')->ignore($documentTypeId),
            ],
            'description' => ['nullable', 'string', 'max:500'],
            'requires_approval' => ['boolean'],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Document type name is required.',
            'name.unique' => 'A document type with this name already exists.',
            'name.max' => 'Document type name cannot exceed 100 characters.',
            'description.max' => 'Description cannot exceed 500 characters.',
        ];
    }
}
