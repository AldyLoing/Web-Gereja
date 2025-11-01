<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Family extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'total_member',
        'description',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected $casts = [
        'total_member' => 'integer',
    ];

    /**
     * Get all members for this family
     */
    public function members(): HasMany
    {
        return $this->hasMany(Member::class);
    }

    /**
     * Update total member count
     */
    public function updateTotalMember(): void
    {
        $this->total_member = $this->members()->count();
        $this->save();
    }
}
