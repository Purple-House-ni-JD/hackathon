<?php

/**
 * Notification Model
 * 
 * Stores email notification records for document status changes.
 * Tracks notification delivery status, errors, and links notifications
 * to specific status history entries and recipient users.
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notifications';

    protected $fillable = [
        'document_id',
        'status_history_id',
        'recipient_user_id',
        'subject',
        'message',
        'notification_type',
        'sent_at',
        'status',
        'error_message',
    ];

    protected function casts(): array
    {
        return [
            'sent_at' => 'datetime',
            'created_at' => 'datetime',
        ];
    }

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }

    public function statusHistory()
    {
        return $this->belongsTo(DocumentStatusHistory::class, 'status_history_id');
    }

    public function recipient()
    {
        return $this->belongsTo(User::class, 'recipient_user_id');
    }
}

