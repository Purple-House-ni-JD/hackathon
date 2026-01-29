<?php

/**
 * UpdateDocumentStatusRequest
 * 
 * Validates document status update requests from OSA admins.
 * Ensures status transitions are valid and remarks are provided for rejections.
 * Validates office changes if applicable.
 */
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDocumentStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'status' => ['required', 'string', 'max:50', Rule::in(['Received', 'Under Review', 'Forwarded', 'Approved', 'Rejected'])],
            'current_office_id' => ['nullable', 'integer', 'exists:offices,id'],
            'remarks' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            if ($this->status === 'Rejected' && empty($this->remarks)) {
                $validator->errors()->add('remarks', 'Remarks are required when rejecting a document.');
            }
        });
    }
}

