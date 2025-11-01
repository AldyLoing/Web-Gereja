<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with(['categories'])
            ->where('is_active', true)
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc');

        // Filter by category
        if ($request->has('category')) {
            $query->whereHas('categories', function($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $posts = $query->paginate(12);
        $categories = Category::withCount(['posts' => function($q) {
            $q->where('is_active', true)->whereNotNull('published_at');
        }])->get();

        return view('posts.index', compact('posts', 'categories'));
    }

    public function show(Post $post)
    {
        // Only show published posts
        if (!$post->is_active || !$post->published_at) {
            abort(404);
        }

        $post->load('categories');
        
        // Get related posts
        $relatedPosts = Post::where('is_active', true)
            ->whereNotNull('published_at')
            ->where('id', '!=', $post->id)
            ->whereHas('categories', function($q) use ($post) {
                $q->whereIn('categories.id', $post->categories->pluck('id'));
            })
            ->limit(3)
            ->get();

        return view('posts.show', compact('post', 'relatedPosts'));
    }
}
