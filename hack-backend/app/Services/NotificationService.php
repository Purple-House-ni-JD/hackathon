<?php

/**
 * NotificationService
 * 
 * Handles email notification logic for document status changes.
 * Creates notification records and sends emails to document submitters
 * when status changes occur. Handles errors gracefully and logs failures.
 */
namespace App\Services;

use App\Mail\DocumentStatusChanged;
use App\Models\DocumentStatusHistory;
use App\Models\Notification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class NotificationService
{
    public function sendStatusChangeNotification(DocumentStatusHistory $statusHistory): void
    {
        $document = $statusHistory->document;
        $recipient = $document->submittedBy;

        if (!$recipient) {
            Log::warning("No submitter found for document {$document->id}");
            return;
        }

        try {
            $notification = Notification::create([
                'document_id' => $document->id,
                'status_history_id' => $statusHistory->id,
                'recipient_user_id' => $recipient->id,
                'subject' => "Document Status Update: {$document->event_name}",
                'message' => $this->buildMessage($statusHistory),
                'notification_type' => 'status_change',
                'status' => 'pending',
            ]);

            Mail::to($recipient->email)->send(new DocumentStatusChanged($statusHistory, $notification));

            $notification->update([
                'status' => 'sent',
                'sent_at' => now(),
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to send notification for document {$document->id}: " . $e->getMessage());

            if (isset($notification)) {
                $notification->update([
                    'status' => 'failed',
                    'error_message' => $e->getMessage(),
                ]);
            } else {
                Notification::create([
                    'document_id' => $document->id,
                    'status_history_id' => $statusHistory->id,
                    'recipient_user_id' => $recipient->id,
                    'subject' => "Document Status Update: {$document->event_name}",
                    'message' => $this->buildMessage($statusHistory),
                    'notification_type' => 'status_change',
                    'status' => 'failed',
                    'error_message' => $e->getMessage(),
                ]);
            }
        }
    }

    private function buildMessage(DocumentStatusHistory $statusHistory): string
    {
        $document = $statusHistory->document;
        $message = "Your document '{$document->event_name}' status has been updated from '{$statusHistory->previous_status}' to '{$statusHistory->new_status}'.";

        if ($statusHistory->remarks) {
            $message .= "\n\nRemarks: {$statusHistory->remarks}";
        }

        if ($statusHistory->newOffice) {
            $message .= "\n\nCurrent Office: {$statusHistory->newOffice->name}";
        }

        return $message;
    }
}

