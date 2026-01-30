<?php

/**
 * Document Model
 * 
 * Core entity representing submitted documents in the system.
 * Tracks document status, current office, and maintains relationships with
 * organizations, document types, and users. Status changes are logged in
 * document_status_history table.
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $table = 'documents';

    protected $fillable = [
        'organization_id',
        'document_type_id',
        'event_name',
        'status',
        'current_office_id',
        'date_received',
        'submitted_by',
    ];

    protected function casts(): array
    {
        return [
            'date_received' => 'date',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'organization_id');
    }

    public function documentType()
    {
        return $this->belongsTo(DocumentType::class, 'document_type_id');
    }

    public function currentOffice()
    {
        return $this->belongsTo(Office::class, 'current_office_id');
    }

    public function submittedBy()
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }

    public function statusHistory()
    {
        return $this->hasMany(DocumentStatusHistory::class, 'document_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'document_id');
    }
}

