<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogComment;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminCommentController extends Controller
{
    /**
     * Display a listing of all comments for moderation.
     */
    public function index(Request $request)
    {
        $status = $request->get('status', 'pending');
        
        $comments = BlogComment::with(['blogPost'])
            ->when($status !== 'all', function ($query) use ($status) {
                return $query->where('status', $status);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('admin/comments/index', [
            'comments' => $comments,
            'currentStatus' => $status,
        ]);
    }

    /**
     * Display the specified comment for detailed review.
     */
    public function show(BlogComment $comment)
    {
        $comment->load('blogPost');

        return Inertia::render('admin/comments/show', [
            'comment' => $comment
        ]);
    }

    /**
     * Update the comment status (approve, reject, spam).
     */
    public function update(Request $request, BlogComment $comment)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected,spam,pending'
        ]);

        $comment->update(['status' => $request->status]);

        $statusMessages = [
            'approved' => 'Comment approved successfully.',
            'rejected' => 'Comment rejected successfully.',
            'spam' => 'Comment marked as spam.',
            'pending' => 'Comment moved back to pending review.',
        ];

        return redirect()->back()
            ->with('success', $statusMessages[$request->status]);
    }

    /**
     * Remove the specified comment.
     */
    public function destroy(BlogComment $comment)
    {
        $comment->delete();

        return redirect()->route('admin.comments.index')
            ->with('success', 'Comment deleted successfully.');
    }
}