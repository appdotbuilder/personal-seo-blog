<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\BlogComment;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a main author user if it doesn't exist
        $author = User::firstOrCreate(
            ['email' => 'author@blog.com'],
            [
                'name' => 'Blog Author',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create published blog posts
        $publishedPosts = BlogPost::factory(8)
            ->published()
            ->create(['author_id' => $author->id]);

        // Create draft posts
        $draftPosts = BlogPost::factory(3)
            ->draft()
            ->create(['author_id' => $author->id]);

        // Add comments to published posts
        foreach ($publishedPosts as $post) {
            // Approved comments
            BlogComment::factory(random_int(2, 6))
                ->approved()
                ->create(['blog_post_id' => $post->id]);

            // Pending comments
            BlogComment::factory(random_int(0, 2))
                ->pending()
                ->create(['blog_post_id' => $post->id]);

            // Some spam comments
            if (random_int(1, 3) === 1) {
                BlogComment::factory(random_int(1, 2))
                    ->spam()
                    ->create(['blog_post_id' => $post->id]);
            }
        }
    }
}