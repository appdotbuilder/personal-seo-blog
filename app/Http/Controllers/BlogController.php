<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogCommentRequest;
use App\Models\BlogPost;
use App\Models\BlogComment;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of published blog posts.
     */
    public function index()
    {
        $posts = BlogPost::published()
            ->with('author')
            ->withCount('approvedComments')
            ->orderBy('published_at', 'desc')
            ->paginate(10);

        return Inertia::render('blog/index', [
            'posts' => $posts
        ]);
    }

    /**
     * Display the specified blog post.
     */
    public function show(string $slug)
    {
        $post = BlogPost::where('slug', $slug)
            ->published()
            ->with(['author', 'approvedComments'])
            ->firstOrFail();

        return Inertia::render('blog/show', [
            'post' => $post,
            'comments' => $post->approvedComments,
        ]);
    }


}