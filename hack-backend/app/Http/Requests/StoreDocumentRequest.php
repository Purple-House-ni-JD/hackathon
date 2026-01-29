<?php

/**
 * StoreDocumentRequest
 * 
 * Validates document creation data when OSA admins manually log documents.
 * Ensures all required fields are present and valid, including foreign key
 * relationships to organizations, document types, and offices.
 */
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'organization_id' => ['required', 'integer', 'exists:organizations,id'],
            'document_type_id' => ['required', 'integer', 'exists:document_types,id'],
            'event_name' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:50', Rule::in(['Received', 'Under Review', 'Forwarded', 'Approved', 'Rejected'])],
            'current_office_id' => ['nullable', 'integer', 'exists:offices,id'],
            'date_received' => ['required', 'date'],
            'submitted_by' => ['nullable', 'integer', 'exists:users,id'],
        ];
    }
}

