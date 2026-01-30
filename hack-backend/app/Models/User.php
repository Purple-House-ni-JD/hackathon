<?php

/**
 * User Model
 * 
 * Represents users in the system (OSA admins and student organization members).
 * Handles authentication and authorization based on user_type field.
 * Users belong to organizations (nullable for OSA admins).
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'email',
        'password_hash',
        'full_name',
        'user_type',
        'organization_id',
        'is_active',
        'last_login',
    ];

    protected $hidden = [
        'password_hash',
    ];

    protected function casts(): array
    {
        return [
            'password_hash' => 'hashed',
            'is_active' => 'boolean',
            'last_login' => 'datetime',
            'created_at' => 'datetime',
        ];
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'organization_id');
    }

    public function submittedDocuments()
    {
        return $this->hasMany(Document::class, 'submitted_by');
    }

    public function statusHistoryUpdates()
    {
        return $this->hasMany(DocumentStatusHistory::class, 'updated_by');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'recipient_user_id');
    }

    public function isAdmin(): bool
    {
        return $this->user_type === 'admin';
    }

    public function isStudentOrg(): bool
    {
        return $this->user_type === 'student_org';
    }
}
