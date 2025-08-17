<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\BlogComment
 *
 * @property int $id
 * @property int $blog_post_id
 * @property string $author_name
 * @property string $author_email
 * @property string|null $author_website
 * @property string $content
 * @property string $status
 * @property string|null $ip_address
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read BlogPost $blogPost
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment query()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment whereAuthorEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment whereAuthorName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment whereAuthorWebsite($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment whereBlogPostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment approved()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogComment pending()
 * @method static \Database\Factories\BlogCommentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class BlogComment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'blog_post_id',
        'author_name',
        'author_email',
        'author_website',
        'content',
        'status',
        'ip_address',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the blog post that owns the comment.
     *
     * @return BelongsTo
     */
    public function blogPost(): BelongsTo
    {
        return $this->belongsTo(BlogPost::class);
    }

    /**
     * Scope a query to only include approved comments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope a query to only include pending comments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Approve the comment.
     *
     * @return void
     */
    public function approve(): void
    {
        $this->update(['status' => 'approved']);
    }

    /**
     * Reject the comment.
     *
     * @return void
     */
    public function reject(): void
    {
        $this->update(['status' => 'rejected']);
    }

    /**
     * Mark the comment as spam.
     *
     * @return void
     */
    public function markAsSpam(): void
    {
        $this->update(['status' => 'spam']);
    }
}