<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('offices', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('abbreviation', 50)->nullable();
            $table->string('email', 255)->nullable();
            $table->boolean('is_active');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            $table->foreignId('organization_id')->constrained('organizations')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offices');
    }
};
