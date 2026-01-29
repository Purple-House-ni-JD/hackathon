<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->unique();
            $table->string('abbreviation', 50)->nullable();
            $table->string('contact_email', 255);
            $table->string('contact_person', 255)->nullable();
            $table->boolean('is_active');
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();

            $table->index('name', 'idx_organizations_name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
