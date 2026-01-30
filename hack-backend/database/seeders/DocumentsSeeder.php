<?php

namespace Database\Seeders;

use App\Models\Document;
use App\Models\DocumentType;
use App\Models\Office;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Seeder;

class DocumentsSeeder extends Seeder
{
    public function run(): void
    {
        $organizations = Organization::all();
        $documentTypes = DocumentType::all();
        $offices = Office::all();
        $users = User::where('user_type', 'admin')->get();

        $documents = [
            [
                'event_name' => 'Tech Conference 2026',
                'status' => 'Approved',
                'date_received' => now()->subDays(10),
                'org_name' => 'Computer Science Society',
                'doc_type' => 'Event Proposal',
                'current_office' => 'Office of Student Affairs',
                'submitted_by_email' => 'css@university.edu',
            ],
            [
                'event_name' => 'Debate Tournament',
                'status' => 'Under Review',
                'date_received' => now()->subDays(5),
                'org_name' => 'Debate Club',
                'doc_type' => 'Budget Request',
                'current_office' => 'Finance Office',
                'submitted_by_email' => 'debate@university.edu',
            ],
            [
                'event_name' => 'Art Exhibition',
                'status' => 'Forwarded',
                'date_received' => now()->subDays(3),
                'org_name' => 'Arts and Culture Club',
                'doc_type' => 'Venue Reservation',
                'current_office' => 'Facilities Management',
                'submitted_by_email' => 'arts@university.edu',
            ],
            [
                'event_name' => 'Sports Festival',
                'status' => 'Rejected',
                'date_received' => now()->subDays(7),
                'org_name' => 'Sports Association',
                'doc_type' => 'Permit Application',
                'current_office' => null,
                'submitted_by_email' => 'sports@university.edu',
            ],
            [
                'event_name' => 'Earth Day Campaign',
                'status' => 'Received',
                'date_received' => now()->subDays(1),
                'org_name' => 'Environmental Club',
                'doc_type' => 'Equipment Request',
                'current_office' => 'Office of Student Affairs',
                'submitted_by_email' => 'environment@university.edu',
            ],
        ];

        foreach ($documents as $docData) {
            $org = $organizations->where('name', $docData['org_name'])->first();
            $docType = $documentTypes->where('name', $docData['doc_type'])->first();
            $office = $docData['current_office'] ? $offices->where('name', $docData['current_office'])->first() : null;
            $user = $users->where('email', $docData['submitted_by_email'])->first();

            if ($org && $docType) {
                Document::create([
                    'organization_id' => $org->id,
                    'document_type_id' => $docType->id,
                    'event_name' => $docData['event_name'],
                    'status' => $docData['status'],
                    'current_office_id' => $office ? $office->id : null,
                    'date_received' => $docData['date_received'],
                    'submitted_by' => $user ? $user->id : null,
                    'created_at' => $docData['date_received'],
                    'updated_at' => $docData['date_received'],
                ]);
            }
        }
    }
}
