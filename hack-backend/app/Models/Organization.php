<?php

/**
 * Organization Model
 * 
 * Represents student organizations in the system.
 * Organizations have multiple users and documents associated with them.
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $table = 'organizations';

    protected $fillable = [
        'name',
        'abbreviation',
        'contact_email',
        'contact_person',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'created_at' => 'datetime',
        ];
    }

    public function users()
    {
        return $this->hasMany(User::class, 'organization_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'organization_id');
    }

    public function offices()
    {
        return $this->hasMany(Office::class, 'organization_id');
    }
}

