<?php

/**
 * DocumentStatusChanged Mailable
 * 
 * Email template for notifying users when their document status changes.
 * Includes document details, status transition, remarks (if any), and current office.
 */
namespace App\Mail;

use App\Models\DocumentStatusHistory;
use App\Models\Notification;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DocumentStatusChanged extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public DocumentStatusHistory $statusHistory,
        public Notification $notification
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->notification->subject,
        );
    }

    public function content(): Content
    {
        $document = $this->statusHistory->document;
        $document->load(['organization', 'documentType', 'currentOffice']);

        return new Content(
            view: 'emails.document-status-changed',
            with: [
                'document' => $document,
                'statusHistory' => $this->statusHistory,
                'previousStatus' => $this->statusHistory->previous_status ?? 'N/A',
                'newStatus' => $this->statusHistory->new_status,
                'remarks' => $this->statusHistory->remarks,
                'currentOffice' => $this->statusHistory->newOffice,
            ],
        );
    }
}

