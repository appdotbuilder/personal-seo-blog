<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogPostRequest;
use App\Http\Requests\UpdateBlogPostRequest;
use App\Models\BlogPost;
use Inertia\Inertia;

class AdminBlogPostController extends Controller
{
    /**
     * Display a listing of all blog posts in admin panel.
     */
    public function index()
    {
        $posts = BlogPost::with('author')
            ->withCount(['comments', 'approvedComments'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('admin/blog-posts/index', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new blog post.
     */
    public function create()
    {
        return Inertia::render('admin/blog-posts/create');
    }

    /**
     * Store a newly created blog post.
     */
    public function store(StoreBlogPostRequest $request)
    {
        $post = BlogPost::create([
            ...$request->validated(),
            'author_id' => auth()->id(),
        ]);

        return redirect()->route('admin.blog-posts.show', $post)
            ->with('success', 'Blog post created successfully.');
    }

    /**
     * Display the specified blog post in admin panel.
     */
    public function show(BlogPost $post)
    {
        $post->load(['author', 'comments']);

        return Inertia::render('admin/blog-posts/show', [
            'post' => $post,
            'comments' => $post->comments,
        ]);
    }

    /**
     * Show the form for editing the blog post.
     */
    public function edit(BlogPost $post)
    {
        return Inertia::render('admin/blog-posts/edit', [
            'post' => $post
        ]);
    }

    /**
     * Update the specified blog post.
     */
    public function update(UpdateBlogPostRequest $request, BlogPost $post)
    {
        $post->update($request->validated());

        return redirect()->route('admin.blog-posts.show', $post)
            ->with('success', 'Blog post updated successfully.');
    }

    /**
     * Remove the specified blog post.
     */
    public function destroy(BlogPost $post)
    {
        $post->delete();

        return redirect()->route('admin.blog-posts.index')
            ->with('success', 'Blog post deleted successfully.');
    }
}