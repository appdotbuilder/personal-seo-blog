<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogCommentRequest;
use App\Models\BlogPost;

class BlogCommentController extends Controller
{
    /**
     * Store a new comment for the blog post.
     */
    public function store(StoreBlogCommentRequest $request, BlogPost $post)
    {
        $comment = $post->comments()->create([
            ...$request->validated(),
            'ip_address' => $request->ip(),
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Your comment has been submitted and is awaiting moderation.');
    }
}