<?php

use App\Http\Controllers\Admin\AdminBlogPostController;
use App\Http\Controllers\Admin\AdminCommentController;
use App\Http\Controllers\BlogCommentController;
use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Blog routes (public)
Route::get('/', [BlogController::class, 'index'])->name('home');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::post('/blog/{post}/comments', [BlogCommentController::class, 'store'])->name('blog.comments.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Admin panel routes
    Route::prefix('admin')->name('admin.')->group(function () {
        // Blog post management
        Route::resource('blog-posts', AdminBlogPostController::class);
        
        // Comment moderation
        Route::resource('comments', AdminCommentController::class)->except(['create', 'store', 'edit']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
