import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    published_at: string;
    author: {
        name: string;
    };
    seo_title?: string;
    seo_description?: string;
}

interface Comment {
    id: number;
    author_name: string;
    author_website?: string;
    content: string;
    created_at: string;
}

interface Props {
    post: BlogPost;
    comments: Comment[];
    [key: string]: unknown;
}



export default function BlogShow({ post, comments }: Props) {
    const [showCommentForm, setShowCommentForm] = useState(false);
    
    const { data, setData, post: submit, processing, errors, reset } = useForm({
        author_name: '',
        author_email: '',
        author_website: '',
        content: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit(route('blog.comments.store', post.id), {
            onSuccess: () => {
                reset();
                setShowCommentForm(false);
            },
        });
    };

    return (
        <>
            <Head>
                <title>{post.seo_title || post.title}</title>
                <meta name="description" content={post.seo_description} />
                <meta property="og:title" content={post.seo_title || post.title} />
                <meta property="og:description" content={post.seo_description} />
                <meta property="og:type" content="article" />
            </Head>
            
            <div className="min-h-screen bg-white">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="py-6">
                            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
                                📝 Personal Blog
                            </Link>
                            <nav className="mt-2">
                                <Link href="/" className="text-blue-600 hover:text-blue-500">
                                    ← Back to all posts
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Article */}
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <article className="bg-white">
                        {/* Article Header */}
                        <header className="mb-8">
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center text-gray-600">
                                <span className="font-medium">{post.author.name}</span>
                                <span className="mx-2">•</span>
                                <time dateTime={post.published_at}>
                                    {new Date(post.published_at).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </time>
                                <span className="mx-2">•</span>
                                <span>{comments.length} comments</span>
                            </div>
                        </header>

                        {/* Article Content */}
                        <div className="prose prose-lg max-w-none">
                            <div 
                                className="text-gray-800 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
                            />
                        </div>
                    </article>

                    {/* Comments Section */}
                    <section className="mt-16 border-t border-gray-200 pt-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">
                                💬 Comments ({comments.length})
                            </h2>
                            <button
                                onClick={() => setShowCommentForm(!showCommentForm)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
                            >
                                Leave a Comment
                            </button>
                        </div>

                        {/* Comment Form */}
                        {showCommentForm && (
                            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="author_name"
                                                value={data.author_name}
                                                onChange={(e) => setData('author_name', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                            {errors.author_name && <p className="text-red-600 text-sm mt-1">{errors.author_name}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="author_email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="author_email"
                                                value={data.author_email}
                                                onChange={(e) => setData('author_email', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                            {errors.author_email && <p className="text-red-600 text-sm mt-1">{errors.author_email}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="author_website" className="block text-sm font-medium text-gray-700 mb-1">
                                            Website (optional)
                                        </label>
                                        <input
                                            type="url"
                                            id="author_website"
                                            value={data.author_website}
                                            onChange={(e) => setData('author_website', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        {errors.author_website && <p className="text-red-600 text-sm mt-1">{errors.author_website}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                            Comment *
                                        </label>
                                        <textarea
                                            id="content"
                                            rows={4}
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                        {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 disabled:opacity-50 transition-colors"
                                        >
                                            {processing ? 'Submitting...' : 'Submit Comment'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowCommentForm(false)}
                                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                                <p className="text-sm text-gray-600 mt-3">
                                    Your comment will be reviewed before being published.
                                </p>
                            </div>
                        )}

                        {/* Comments List */}
                        {comments.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">💭</div>
                                <p className="text-gray-600">No comments yet. Be the first to comment!</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-2">
                                                {comment.author_website ? (
                                                    <a
                                                        href={comment.author_website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-medium text-blue-600 hover:text-blue-500"
                                                    >
                                                        {comment.author_name}
                                                    </a>
                                                ) : (
                                                    <span className="font-medium text-gray-900">{comment.author_name}</span>
                                                )}
                                            </div>
                                            <time className="text-sm text-gray-500" dateTime={comment.created_at}>
                                                {new Date(comment.created_at).toLocaleDateString('en-US', { 
                                                    year: 'numeric', 
                                                    month: 'short', 
                                                    day: 'numeric' 
                                                })}
                                            </time>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            {comment.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-gray-50 border-t border-gray-200 mt-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center text-gray-500">
                            <p>© 2024 Personal Blog. Built with Laravel & React for optimal SEO.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}