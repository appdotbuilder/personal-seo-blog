import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface BlogPost {
    id: number;
    title: string;
    status: string;
    published_at: string | null;
    created_at: string;
    author: {
        name: string;
    };
    comments_count: number;
    approved_comments_count: number;
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

export default function AdminBlogPostsIndex({ posts }: Props) {
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

    return (
        <AppShell>
            <Head title="Blog Posts - Admin Panel" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📝 Blog Posts</h1>
                        <p className="text-gray-600 mt-1">Manage your blog posts</p>
                    </div>
                    <Link
                        href={route('admin.blog-posts.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                        ✏️ New Post
                    </Link>
                </div>

                {posts.data.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                        <div className="text-6xl mb-4">📄</div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h2>
                        <p className="text-gray-600 mb-6">Create your first blog post to get started</p>
                        <Link
                            href={route('admin.blog-posts.create')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors"
                        >
                            Create First Post
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Comments
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {posts.data.map((post) => (
                                        <tr key={post.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <Link
                                                        href={route('admin.blog-posts.show', post.id)}
                                                        className="font-medium text-gray-900 hover:text-blue-600"
                                                    >
                                                        {post.title}
                                                    </Link>
                                                    <p className="text-sm text-gray-500">by {post.author.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={getStatusBadge(post.status)}>
                                                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <div className="text-gray-900">{post.approved_comments_count} approved</div>
                                                    {post.comments_count > post.approved_comments_count && (
                                                        <div className="text-yellow-600">
                                                            {post.comments_count - post.approved_comments_count} pending
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
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
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                                                <Link
                                                    href={route('admin.blog-posts.show', post.id)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    👁️ View
                                                </Link>
                                                <Link
                                                    href={route('admin.blog-posts.edit', post.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {posts.last_page > 1 && (
                            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                <div className="flex justify-center space-x-2">
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
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppShell>
    );
}