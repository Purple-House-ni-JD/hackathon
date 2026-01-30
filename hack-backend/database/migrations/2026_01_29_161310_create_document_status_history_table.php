<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('document_status_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('document_id');
            $table->string('previous_status', 50)->nullable();
            $table->string('new_status', 50);
            $table->unsignedBigInteger('previous_office_id')->nullable();
            $table->unsignedBigInteger('new_office_id')->nullable();
            $table->text('remarks')->nullable();
            $table->unsignedBigInteger('updated_by');
            $table->timestamp('created_at');

            $table->foreign('document_id')->references('id')->on('documents')->onDelete('cascade');
            $table->foreign('previous_office_id')->references('id')->on('offices')->onDelete('set null');
            $table->foreign('new_office_id')->references('id')->on('offices')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');

            $table->index('document_id', 'idx_status_history_document_id');
            $table->index('created_at', 'idx_status_history_created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('document_status_history');
    }
};
