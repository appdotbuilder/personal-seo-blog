import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string;
    author: {
        name: string;
    };
    approved_comments_count: number;
    seo_title?: string;
    seo_description?: string;
}

interface Props {
    posts: {
        data: BlogPost[];
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
        current_page: number;
        last_page: number;
    };
    [key: string]: unknown;
}

export default function BlogIndex({ posts }: Props) {
    return (
        <>
            <Head>
                <title>Personal Blog - SEO Optimized</title>
                <meta name="description" content="Welcome to my personal blog featuring SEO-optimized content on various topics." />
                <meta name="keywords" content="blog, personal blog, SEO, content writing" />
            </Head>
            
            <div className="min-h-screen bg-white">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="py-6">
                            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
                                📝 Personal Blog
                            </Link>
                            <p className="mt-2 text-gray-600">SEO-optimized personal thoughts and insights</p>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {posts.data.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">✍️</div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No posts yet</h2>
                            <p className="text-gray-600">Check back soon for new content!</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {posts.data.map((post) => (
                                <article key={post.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 mb-2">
                                            <span>{post.author.name}</span>
                                            <span className="mx-2">•</span>
                                            <span>{new Date(post.published_at).toLocaleDateString('en-US', { 
                                                year: 'numeric', 
                                                month: 'short', 
                                                day: 'numeric' 
                                            })}</span>
                                            {post.approved_comments_count > 0 && (
                                                <>
                                                    <span className="mx-2">•</span>
                                                    <span>💬 {post.approved_comments_count} comments</span>
                                                </>
                                            )}
                                        </div>
                                        
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                            <Link 
                                                href={`/blog/${post.slug}`}
                                                className="hover:text-blue-600 transition-colors"
                                            >
                                                {post.title}
                                            </Link>
                                        </h2>
                                        
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        
                                        <Link 
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium"
                                        >
                                            Read more 
                                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {posts.last_page > 1 && (
                        <div className="flex justify-center mt-12 space-x-2">
                            {posts.links.map((link, index) => (
                                link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-2 text-sm rounded-md border ${
                                            link.active
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={index}
                                        className="px-3 py-2 text-sm text-gray-400 border border-gray-200 rounded-md"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    )}
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