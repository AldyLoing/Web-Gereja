<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mortality extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'member_id',
        'name',
        'birth_date',
        'mortality_date',
        'mortality_place',
        'description',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'mortality_date' => 'datetime',
    ];

    /**
     * Get the member associated with this mortality
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }
}
