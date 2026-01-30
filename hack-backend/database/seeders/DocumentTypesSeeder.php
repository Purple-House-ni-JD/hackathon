<?php

namespace Database\Seeders;

use App\Models\DocumentType;
use Illuminate\Database\Seeder;

class DocumentTypesSeeder extends Seeder
{
    public function run(): void
    {
        $documentTypes = [
            ['name' => 'Event Proposal', 'description' => 'Proposal for organizing an event', 'requires_approval' => true, 'is_active' => true],
            ['name' => 'Budget Request', 'description' => 'Request for event budget allocation', 'requires_approval' => true, 'is_active' => true],
            ['name' => 'Venue Reservation', 'description' => 'Request to reserve university venue', 'requires_approval' => true, 'is_active' => true],
            ['name' => 'Equipment Request', 'description' => 'Request for equipment and materials', 'requires_approval' => false, 'is_active' => true],
            ['name' => 'Permit Application', 'description' => 'Application for event permit', 'requires_approval' => true, 'is_active' => true],
            ['name' => 'Financial Report', 'description' => 'Post-event financial report', 'requires_approval' => false, 'is_active' => true],
        ];

        foreach ($documentTypes as $type) {
            DocumentType::firstOrCreate(
                ['name' => $type['name']],
                array_merge($type, ['created_at' => now(), 'updated_at' => now()])
            );
        }
    }
}
