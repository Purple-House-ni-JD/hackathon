<?php

/**
 * DocumentStatusHistory Model
 * 
 * Audit trail for document status and office changes.
 * Records every status update with previous/new status, office transfers,
 * remarks, and the user who made the update. Used for accountability and
 * triggers email notifications to document submitters.
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentStatusHistory extends Model
{
    use HasFactory;

    protected $table = 'document_status_history';

    protected $fillable = [
        'document_id',
        'previous_status',
        'new_status',
        'previous_office_id',
        'new_office_id',
        'remarks',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
        ];
    }

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }

    public function previousOffice()
    {
        return $this->belongsTo(Office::class, 'previous_office_id');
    }

    public function newOffice()
    {
        return $this->belongsTo(Office::class, 'new_office_id');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'status_history_id');
    }
}

