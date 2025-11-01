<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'slug',
        'title',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    /**
     * Get all posts for this category
     */
    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, 'post_category')
            ->withTimestamps();
    }
}
