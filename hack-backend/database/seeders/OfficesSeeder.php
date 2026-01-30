<?php

namespace Database\Seeders;

use App\Models\Office;
use Illuminate\Database\Seeder;

class OfficesSeeder extends Seeder
{
    public function run(): void
    {
        $offices = [
            ['name' => 'Office of Student Affairs', 'abbreviation' => 'OSA', 'email' => 'osa@university.edu', 'is_active' => true],
            ['name' => 'Finance Office', 'abbreviation' => 'FIN', 'email' => 'finance@university.edu', 'is_active' => true],
            ['name' => 'Security Office', 'abbreviation' => 'SEC', 'email' => 'security@university.edu', 'is_active' => true],
            ['name' => 'Facilities Management', 'abbreviation' => 'FAC', 'email' => 'facilities@university.edu', 'is_active' => true],
            ['name' => 'Academic Affairs', 'abbreviation' => 'ACA', 'email' => 'academic@university.edu', 'is_active' => true],
        ];

        foreach ($offices as $office) {
            Office::firstOrCreate(
                ['name' => $office['name']],
                array_merge($office, ['created_at' => now(), 'updated_at' => now()])
            );
        }
    }
}
