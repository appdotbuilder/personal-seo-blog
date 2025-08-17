<?php

namespace Tests\Feature;

use App\Models\BlogComment;
use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlogTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
    }

    public function test_blog_index_displays_published_posts(): void
    {
        $user = User::factory()->create();
        
        // Create published posts
        $publishedPost = BlogPost::factory()->published()->create(['author_id' => $user->id]);
        
        // Create draft post (should not be visible)
        BlogPost::factory()->draft()->create(['author_id' => $user->id]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('blog/index')
                ->has('posts.data', 1)
        );
    }

    public function test_blog_post_shows_with_comments(): void
    {
        $user = User::factory()->create();
        $post = BlogPost::factory()->published()->create(['author_id' => $user->id]);
        
        // Create approved comments
        BlogComment::factory()->approved()->count(3)->create(['blog_post_id' => $post->id]);
        
        // Create pending comment (should not be visible)
        BlogComment::factory()->pending()->create(['blog_post_id' => $post->id]);

        $response = $this->get("/blog/{$post->slug}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('blog/show')
                ->has('post')
                ->has('comments', 3)
        );
    }

    public function test_comment_can_be_submitted(): void
    {
        $user = User::factory()->create();
        $post = BlogPost::factory()->published()->create(['author_id' => $user->id]);

        $commentData = [
            'author_name' => 'John Doe',
            'author_email' => 'john@example.com',
            'author_website' => 'https://example.com',
            'content' => 'This is a test comment.',
        ];

        $response = $this->post("/blog/{$post->id}/comments", $commentData);

        $response->assertRedirect();
        $this->assertDatabaseHas('blog_comments', [
            'blog_post_id' => $post->id,
            'author_name' => 'John Doe',
            'author_email' => 'john@example.com',
            'status' => 'pending',
        ]);
    }

    public function test_admin_can_access_blog_posts_index(): void
    {
        $user = User::factory()->create();
        BlogPost::factory()->count(3)->create(['author_id' => $user->id]);

        $response = $this->actingAs($user)->get('/admin/blog-posts');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('admin/blog-posts/index')
                ->has('posts.data', 3)
        );
    }

    public function test_admin_can_create_blog_post(): void
    {
        $user = User::factory()->create();

        $postData = [
            'title' => 'Test Blog Post',
            'excerpt' => 'This is a test excerpt for SEO.',
            'content' => 'This is the full content of the test blog post.',
            'status' => 'published',
        ];

        $response = $this->actingAs($user)->post('/admin/blog-posts', $postData);

        $response->assertRedirect();
        $this->assertDatabaseHas('blog_posts', [
            'title' => 'Test Blog Post',
            'slug' => 'test-blog-post',
            'author_id' => $user->id,
            'status' => 'published',
        ]);
    }

    public function test_admin_can_moderate_comments(): void
    {
        $user = User::factory()->create();
        $post = BlogPost::factory()->create(['author_id' => $user->id]);
        $comment = BlogComment::factory()->pending()->create(['blog_post_id' => $post->id]);

        $response = $this->actingAs($user)->patch("/admin/comments/{$comment->id}", [
            'status' => 'approved'
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('blog_comments', [
            'id' => $comment->id,
            'status' => 'approved',
        ]);
    }
}