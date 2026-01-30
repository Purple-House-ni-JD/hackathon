<?php

namespace Database\Seeders;

use App\Models\Organization;
use Illuminate\Database\Seeder;

class OrganizationsSeeder extends Seeder
{
    public function run(): void
    {
        $organizations = [
            ['name' => 'Computer Science Society', 'abbreviation' => 'CSS', 'contact_email' => 'css@university.edu', 'contact_person' => 'John Doe'],
            ['name' => 'Debate Club', 'abbreviation' => 'DC', 'contact_email' => 'debate@university.edu', 'contact_person' => 'Jane Smith'],
            ['name' => 'Arts and Culture Club', 'abbreviation' => 'ACC', 'contact_email' => 'arts@university.edu', 'contact_person' => 'Bob Johnson'],
            ['name' => 'Sports Association', 'abbreviation' => 'SA', 'contact_email' => 'sports@university.edu', 'contact_person' => 'Alice Brown'],
            ['name' => 'Environmental Club', 'abbreviation' => 'EC', 'contact_email' => 'environment@university.edu', 'contact_person' => 'Charlie Wilson'],
        ];

        foreach ($organizations as $org) {
            Organization::firstOrCreate(
                ['name' => $org['name']],
                array_merge($org, ['is_active' => true, 'created_at' => now(), 'updated_at' => now()])
            );
        }
    }
}
