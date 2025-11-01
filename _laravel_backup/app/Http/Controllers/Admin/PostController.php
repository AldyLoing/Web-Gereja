<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('categories')
            ->latest()
            ->paginate(15);

        return view('admin.posts.index', compact('posts'));
    }

    public function create()
    {
        $categories = Category::all();
        return view('admin.posts.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:1024',
            'content' => 'nullable|string',
            'cover' => 'nullable|image|max:2048',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:categories,id',
            'is_active' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $post = new Post();
        $post->title = $validated['title'];
        $post->slug = Str::slug($validated['title']);
        $post->content = $validated['content'] ?? null;
        $post->is_active = $request->has('is_active') ? true : false;
        
        // Handle published_at
        if (!empty($validated['published_at'])) {
            $post->published_at = $validated['published_at'];
        } elseif ($post->is_active) {
            $post->published_at = now();
        }
        
        $post->created_by = Auth::id();

        if ($request->hasFile('cover')) {
            $path = $request->file('cover')->store('posts', 'public');
            $post->cover = $path;
        }

        $post->save();

        if (!empty($validated['categories'])) {
            $post->categories()->sync($validated['categories']);
        }

        return redirect()->route('admin.posts.index')
            ->with('success', 'Post berhasil dibuat!');
    }

    public function show(Post $post)
    {
        $post->load('categories');
        return view('admin.posts.show', compact('post'));
    }

    public function edit(Post $post)
    {
        $categories = Category::all();
        $post->load('categories');
        return view('admin.posts.edit', compact('post', 'categories'));
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:1024',
            'content' => 'nullable|string',
            'cover' => 'nullable|image|max:2048',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:categories,id',
            'is_active' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $post->title = $validated['title'];
        $post->slug = Str::slug($validated['title']);
        $post->content = $validated['content'] ?? null;
        $post->is_active = $request->has('is_active') ? true : false;
        
        // Handle published_at
        if (!empty($validated['published_at'])) {
            $post->published_at = $validated['published_at'];
        } elseif ($post->is_active && !$post->published_at) {
            $post->published_at = now();
        }
        
        $post->updated_by = Auth::id();

        if ($request->hasFile('cover')) {
            // Delete old cover if exists
            if ($post->cover) {
                Storage::disk('public')->delete($post->cover);
            }
            $path = $request->file('cover')->store('posts', 'public');
            $post->cover = $path;
        }

        $post->save();

        if (!empty($validated['categories'])) {
            $post->categories()->sync($validated['categories']);
        }

        return redirect()->route('admin.posts.index')
            ->with('success', 'Post berhasil diperbarui!');
    }

    public function destroy(Post $post)
    {
        if ($post->cover) {
            Storage::disk('public')->delete($post->cover);
        }

        $post->delete();

        return redirect()->route('admin.posts.index')
            ->with('success', 'Post berhasil dihapus!');
    }
}
