<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email', 255);
            $table->string('password_hash', 255);
            $table->string('full_name', 255);
            $table->string('user_type', 20);
            $table->unsignedBigInteger('organization_id')->nullable();
            $table->boolean('is_active');
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('last_login')->nullable();

            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('set null');

            $table->index('email', 'idx_users_email');
            $table->index('organization_id', 'idx_users_organization_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
