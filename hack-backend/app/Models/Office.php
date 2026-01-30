<?php

/**
 * Office Model
 * 
 * Represents offices that handle document processing.
 * Documents are routed through offices, and status history tracks office transfers.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    use HasFactory;

    protected $table = 'offices';

    protected $fillable = [
        'name',
        'abbreviation',
        'email',
        'is_active',
        'organization_id',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'organization_id');
    }

    public function currentDocuments()
    {
        return $this->hasMany(Document::class, 'current_office_id');
    }

    public function previousStatusHistory()
    {
        return $this->hasMany(DocumentStatusHistory::class, 'previous_office_id');
    }

    public function newStatusHistory()
    {
        return $this->hasMany(DocumentStatusHistory::class, 'new_office_id');
    }
}
