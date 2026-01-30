<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('document_id');
            $table->unsignedBigInteger('status_history_id');
            $table->unsignedBigInteger('recipient_user_id')->nullable();
            $table->string('subject', 255);
            $table->text('message');
            $table->string('notification_type', 50);
            $table->timestamp('sent_at')->nullable();
            $table->string('status', 20);
            $table->text('error_message')->nullable();
            $table->timestamps();

            $table->foreign('document_id')->references('id')->on('documents')->onDelete('cascade');
            $table->foreign('status_history_id')->references('id')->on('document_status_history')->onDelete('cascade');
            $table->foreign('recipient_user_id')->references('id')->on('users')->onDelete('set null');

            $table->index('status', 'idx_notifications_status');
            $table->index('created_at', 'idx_notifications_created_at');
            $table->index('document_id', 'idx_notifications_document_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
