<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        // Admin users
        $admins = [
            ['email' => 'admin@osa.university.edu', 'full_name' => 'OSA Administrator', 'user_type' => 'admin'],
            ['email' => 'staff1@osa.university.edu', 'full_name' => 'OSA Staff 1', 'user_type' => 'admin'],
        ];

        foreach ($admins as $admin) {
            User::firstOrCreate(
                ['email' => $admin['email']],
                array_merge($admin, [
                    'password_hash' => Hash::make('password'),
                    'organization_id' => null,
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ])
            );
        }

        // Student org users
        $orgUsers = [
            ['email' => 'css@university.edu', 'full_name' => 'CSS President', 'org_name' => 'Computer Science Society'],
            ['email' => 'debate@university.edu', 'full_name' => 'Debate President', 'org_name' => 'Debate Club'],
            ['email' => 'arts@university.edu', 'full_name' => 'Arts President', 'org_name' => 'Arts and Culture Club'],
            ['email' => 'sports@university.edu', 'full_name' => 'Sports President', 'org_name' => 'Sports Association'],
            ['email' => 'environment@university.edu', 'full_name' => 'Environment President', 'org_name' => 'Environmental Club'],
        ];

        foreach ($orgUsers as $user) {
            $org = Organization::where('name', $user['org_name'])->first();
            if ($org) {
                User::firstOrCreate(
                    ['email' => $user['email']],
                    array_merge(array_diff_key($user, ['org_name' => '']), [
                        'password_hash' => Hash::make('password'),
                        'user_type' => 'student_org',
                        'organization_id' => $org->id,
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ])
                );
            }
        }
    }
}
