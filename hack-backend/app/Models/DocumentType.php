<?php

/**
 * DocumentType Model
 * 
 * Defines categories of documents in the system (e.g., Event Proposal, Budget Request).
 * Some document types may require approval workflows.
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentType extends Model
{
    use HasFactory;

    protected $table = 'document_types';

    protected $fillable = [
        'name',
        'description',
        'requires_approval',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'requires_approval' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'document_type_id');
    }
}

