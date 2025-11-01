<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Baptism extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'member_id',
        'name',
        'birth_date',
        'baptism_date',
        'baptism_place',
        'baptised_by',
        'description',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'baptism_date' => 'date',
    ];

    /**
     * Get the member associated with this baptism
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    /**
     * Scope: Baptisms this month
     */
    public function scopeThisMonth($query)
    {
        return $query->whereMonth('baptism_date', now()->month)
            ->whereYear('baptism_date', now()->year);
    }

    /**
     * Scope: Baptisms this year
     */
    public function scopeThisYear($query)
    {
        return $query->whereYear('baptism_date', now()->year);
    }
}
