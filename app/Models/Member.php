<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Member extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'family_id',
        'nik',
        'kk_number',
        'name',
        'gender',
        'birth_date',
        'birth_place',
        'blood_group',
        'address',
        'telp',
        'email',
        'marital_status',
        'is_baptized',
        'activity_status',
        'status',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'is_baptized' => 'boolean',
        'status' => 'integer',
    ];

    /**
     * Get the family that owns the member
     */
    public function family(): BelongsTo
    {
        return $this->belongsTo(Family::class);
    }

    /**
     * Get all church groups for this member
     */
    public function churchGroups(): BelongsToMany
    {
        return $this->belongsToMany(ChurchGroup::class, 'member_church_group')
            ->withTimestamps();
    }

    /**
     * Get baptism records for this member
     */
    public function baptisms(): HasMany
    {
        return $this->hasMany(Baptism::class);
    }

    /**
     * Check if member has birthday this month
     */
    public function hasBirthdayThisMonth(): bool
    {
        if (!$this->birth_date) {
            return false;
        }

        return $this->birth_date->month === now()->month;
    }

    /**
     * Scope: Get members with birthday this month
     */
    public function scopeBirthdayThisMonth($query)
    {
        return $query->whereMonth('birth_date', now()->month)
            ->whereNotNull('birth_date')
            ->orderByRaw('DAY(birth_date)');
    }

    /**
     * Scope: Active members only
     */
    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }
}
