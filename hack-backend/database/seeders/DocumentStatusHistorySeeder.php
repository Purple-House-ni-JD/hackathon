<?php

namespace Database\Seeders;

use App\Models\Document;
use App\Models\DocumentStatusHistory;
use App\Models\Office;
use App\Models\User;
use Illuminate\Database\Seeder;

class DocumentStatusHistorySeeder extends Seeder
{
    public function run(): void
    {
        $documents = Document::all();
        $offices = Office::all();
        $users = User::where('user_type', 'admin')->get();

        foreach ($documents as $document) {
            // Create initial status history
            DocumentStatusHistory::create([
                'document_id' => $document->id,
                'previous_status' => null,
                'new_status' => 'Received',
                'previous_office_id' => null,
                'new_office_id' => $offices->where('name', 'Office of Student Affairs')->first()->id ?? null,
                'remarks' => 'Document received and logged',
                'updated_by' => $users->first()->id,
                'created_at' => $document->created_at,
            ]);

            // Add more history based on current status
            if ($document->status !== 'Received') {
                $history = [
                    'Approved' => [
                        'previous_status' => 'Under Review',
                        'new_status' => 'Approved',
                        'remarks' => 'Document approved after review',
                    ],
                    'Under Review' => [
                        'previous_status' => 'Received',
                        'new_status' => 'Under Review',
                        'remarks' => 'Document under review',
                    ],
                    'Forwarded' => [
                        'previous_status' => 'Under Review',
                        'new_status' => 'Forwarded',
                        'remarks' => 'Document forwarded to facilities',
                    ],
                    'Rejected' => [
                        'previous_status' => 'Under Review',
                        'new_status' => 'Rejected',
                        'remarks' => 'Document rejected due to incomplete information',
                    ],
                ];

                if (isset($history[$document->status])) {
                    DocumentStatusHistory::create([
                        'document_id' => $document->id,
                        'previous_status' => $history[$document->status]['previous_status'],
                        'new_status' => $document->status,
                        'previous_office_id' => $offices->where('name', 'Office of Student Affairs')->first()->id ?? null,
                        'new_office_id' => $document->current_office_id,
                        'remarks' => $history[$document->status]['remarks'],
                        'updated_by' => $users->first()->id,
                        'created_at' => $document->updated_at,
                    ]);
                }
            }
        }
    }
}
