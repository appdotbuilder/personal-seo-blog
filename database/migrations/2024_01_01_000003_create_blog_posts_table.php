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
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('SEO-optimized post title');
            $table->string('slug')->unique()->comment('URL-friendly slug for SEO');
            $table->text('excerpt')->comment('Brief description for SEO and listings');
            $table->longText('content')->comment('Full post content');
            $table->string('meta_title')->nullable()->comment('SEO meta title');
            $table->text('meta_description')->nullable()->comment('SEO meta description');
            $table->string('featured_image')->nullable()->comment('Featured image path');
            $table->string('status')->default('draft')->comment('Post status: draft, published, archived');
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->timestamp('published_at')->nullable()->comment('Publication date and time');
            $table->timestamps();
            
            // SEO and performance indexes
            $table->index('slug');
            $table->index('status');
            $table->index('published_at');
            $table->index(['status', 'published_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};