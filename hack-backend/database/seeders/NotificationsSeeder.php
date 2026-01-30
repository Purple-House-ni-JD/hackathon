<?php

namespace Database\Seeders;

use App\Models\Document;
use App\Models\DocumentStatusHistory;
use App\Models\Notification;
use App\Models\Organization;
use Illuminate\Database\Seeder;

class NotificationsSeeder extends Seeder
{
    public function run(): void
    {
        $documents = Document::all();
        $statusHistories = DocumentStatusHistory::all();

        foreach ($statusHistories as $history) {
            $document = $documents->find($history->document_id);
            if ($document && $history->new_status !== 'Received') {
                $org = Organization::find($document->organization_id);
                if ($org) {
                    $subject = "Document Status Update: {$document->event_name}";
                    $message = "Your document '{$document->event_name}' status has been updated to '{$history->new_status}'.";

                    if ($history->remarks) {
                        $message .= "\n\nRemarks: {$history->remarks}";
                    }

                    Notification::create([
                        'document_id' => $document->id,
                        'status_history_id' => $history->id,
                        'recipient_user_id' => null, // Since notifications are per org, not per user
                        'subject' => $subject,
                        'message' => $message,
                        'notification_type' => 'status_update',
                        'sent_at' => $history->created_at,
                        'status' => 'sent',
                        'error_message' => null,
                        'created_at' => $history->created_at,
                        'updated_at' => $history->created_at,
                    ]);
                }
            }
        }
    }
}
