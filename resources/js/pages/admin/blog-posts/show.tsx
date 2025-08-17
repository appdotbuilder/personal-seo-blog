import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    status: string;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    author: {
        name: string;
    };
}

interface Comment {
    id: number;
    author_name: string;
    author_email: string;
    content: string;
    status: string;
    created_at: string;
}

interface Props {
    post: BlogPost;
    comments: Comment[];
    [key: string]: unknown;
}

export default function AdminBlogPostShow({ post, comments }: Props) {
    const getStatusBadge = (status: string) => {
        const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
        switch (status) {
            case 'published':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'draft':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'archived':
                return `${baseClasses} bg-gray-100 text-gray-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
            router.delete(route('admin.blog-posts.destroy', post.id));
        }
    };

    return (
        <AppShell>
            <Head title={`${post.title} - Admin Panel`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href={route('admin.blog-posts.index')}
                            className="text-blue-600 hover:text-blue-500 text-sm"
                        >
                            ← Back to all posts
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 mt-2">{post.title}</h1>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span className={getStatusBadge(post.status)}>
                                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                            </span>
                            <span>by {post.author.name}</span>
                            <span>
                                {post.published_at 
                                    ? new Date(post.published_at).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })
                                    : new Date(post.created_at).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })
                                }
                            </span>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        {post.status === 'published' && (
                            <a
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors"
                            >
                                🌐 View Live
                            </a>
                        )}
                        <Link
                            href={route('admin.blog-posts.edit', post.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                        >
                            ✏️ Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                </div>

                {/* Post Content */}
                <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                    {/* Excerpt */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">📝 Excerpt</h3>
                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                            {post.excerpt}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">📄 Content</h3>
                        <div className="prose prose-lg max-w-none">
                            <div 
                                className="text-gray-800 leading-relaxed bg-gray-50 p-6 rounded-lg"
                                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
                            />
                        </div>
                    </div>

                    {/* SEO Information */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">🔍 SEO Information</h3>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">URL Slug</dt>
                                <dd className="mt-1 text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                                    {post.slug}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Meta Title</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {post.title || <span className="italic text-gray-500">Using post title</span>}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">💬 Comments ({comments.length})</h3>
                            <Link
                                href={route('admin.comments.index')}
                                className="text-blue-600 hover:text-blue-500 text-sm"
                            >
                                View all comments →
                            </Link>
                        </div>
                    </div>
                    
                    {comments.length === 0 ? (
                        <div className="p-6 text-center">
                            <div className="text-4xl mb-4">💭</div>
                            <p className="text-gray-600">No comments yet</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {comments.slice(0, 5).map((comment) => (
                                <div key={comment.id} className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="font-medium text-gray-900">{comment.author_name}</span>
                                                <span className="text-gray-400">•</span>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(comment.created_at).toLocaleDateString('en-US', { 
                                                        year: 'numeric', 
                                                        month: 'short', 
                                                        day: 'numeric' 
                                                    })}
                                                </span>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    comment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    comment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {comment.status}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 text-sm leading-relaxed">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {comments.length > 5 && (
                                <div className="p-4 text-center">
                                    <Link
                                        href={route('admin.comments.index')}
                                        className="text-blue-600 hover:text-blue-500 text-sm"
                                    >
                                        View all {comments.length} comments →
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}