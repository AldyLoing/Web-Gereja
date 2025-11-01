<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ChurchGroup extends Model
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
     * Get all members in this church group
     */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(Member::class, 'member_church_group')
            ->withTimestamps();
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
