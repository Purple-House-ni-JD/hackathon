<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('organization_id');
            $table->unsignedBigInteger('document_type_id');
            $table->string('event_name', 255);
            $table->string('status', 50);
            $table->unsignedBigInteger('current_office_id')->nullable();
            $table->date('date_received');
            $table->unsignedBigInteger('submitted_by')->nullable();
            $table->timestamps();

            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('cascade');
            $table->foreign('document_type_id')->references('id')->on('document_types')->onDelete('cascade');
            $table->foreign('current_office_id')->references('id')->on('offices')->onDelete('set null');
            $table->foreign('submitted_by')->references('id')->on('users')->onDelete('set null');

            $table->index('organization_id', 'idx_documents_organization_id');
            $table->index('status', 'idx_documents_status');
            $table->index('date_received', 'idx_documents_date_received');
            $table->index('updated_at', 'idx_documents_updated_at');
            $table->index('event_name', 'idx_documents_event_name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
