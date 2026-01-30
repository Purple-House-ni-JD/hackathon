<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * Creates a default admin and (optionally) a student org + user so you can log in.
     */
    public function run(): void
    {
        $this->call([
            DocumentTypesSeeder::class,
            OfficesSeeder::class,
            OrganizationsSeeder::class,
            UsersSeeder::class,
            DocumentsSeeder::class,
            DocumentStatusHistorySeeder::class,
            NotificationsSeeder::class,
        ]);
    }
}
