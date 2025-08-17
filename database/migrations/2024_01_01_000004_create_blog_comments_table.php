<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blog_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_post_id')->constrained()->onDelete('cascade');
            $table->string('author_name')->comment('Comment author name');
            $table->string('author_email')->comment('Comment author email');
            $table->string('author_website')->nullable()->comment('Optional author website');
            $table->text('content')->comment('Comment content');
            $table->string('status')->default('pending')->comment('Comment status: pending, approved, rejected, spam');
            $table->ipAddress('ip_address')->nullable()->comment('Author IP for moderation');
            $table->timestamps();
            
            // Moderation and performance indexes
            $table->index('status');
            $table->index('blog_post_id');
            $table->index(['blog_post_id', 'status']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_comments');
    }
};