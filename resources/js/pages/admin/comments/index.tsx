import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Comment {
    id: number;
    author_name: string;
    author_email: string;
    author_website?: string;
    content: string;
    status: string;
    created_at: string;
    blog_post: {
        id: number;
        title: string;
        slug: string;
    };
}

interface Props {
    comments: {
        data: Comment[];
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
        current_page: number;
        last_page: number;
    };
    currentStatus: string;
    [key: string]: unknown;
}

export default function AdminCommentsIndex({ comments, currentStatus }: Props) {
    const getStatusBadge = (status: string) => {
        const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
        switch (status) {
            case 'approved':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'rejected':
                return `${baseClasses} bg-red-100 text-red-800`;
            case 'spam':
                return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const handleStatusChange = (commentId: number, status: string) => {
        router.patch(route('admin.comments.update', commentId), { status }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const statusTabs = [
        { key: 'pending', label: 'Pending', emoji: '⏳' },
        { key: 'approved', label: 'Approved', emoji: '✅' },
        { key: 'rejected', label: 'Rejected', emoji: '❌' },
        { key: 'spam', label: 'Spam', emoji: '🚫' },
        { key: 'all', label: 'All', emoji: '📋' },
    ];

    return (
        <AppShell>
            <Head title="Comments Moderation - Admin Panel" />
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">💬 Comment Moderation</h1>
                    <p className="text-gray-600 mt-1">Review and moderate blog comments</p>
                </div>

                {/* Status Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {statusTabs.map((tab) => (
                            <Link
                                key={tab.key}
                                href={route('admin.comments.index', { status: tab.key })}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    currentStatus === tab.key
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.emoji} {tab.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {comments.data.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                        <div className="text-6xl mb-4">💬</div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            No {currentStatus === 'all' ? '' : currentStatus} comments
                        </h2>
                        <p className="text-gray-600">
                            {currentStatus === 'pending' 
                                ? 'No comments awaiting moderation'
                                : 'No comments in this category'
                            }
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                        {comments.data.map((comment) => (
                            <div key={comment.id} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        {/* Comment Header */}
                                        <div className="flex items-center space-x-2 mb-2">
                                            <div className="font-medium text-gray-900">
                                                {comment.author_name}
                                            </div>
                                            <span className="text-gray-400">•</span>
                                            <div className="text-sm text-gray-500">
                                                {comment.author_email}
                                            </div>
                                            {comment.author_website && (
                                                <>
                                                    <span className="text-gray-400">•</span>
                                                    <a
                                                        href={comment.author_website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-blue-600 hover:text-blue-500"
                                                    >
                                                        Website
                                                    </a>
                                                </>
                                            )}
                                        </div>

                                        {/* Blog Post Reference */}
                                        <div className="mb-3">
                                            <span className="text-sm text-gray-500">On: </span>
                                            <Link
                                                href={`/blog/${comment.blog_post.slug}`}
                                                className="text-sm text-blue-600 hover:text-blue-500"
                                                target="_blank"
                                            >
                                                {comment.blog_post.title}
                                            </Link>
                                        </div>

                                        {/* Comment Content */}
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                            <p className="text-gray-800 leading-relaxed">
                                                {comment.content}
                                            </p>
                                        </div>

                                        {/* Comment Meta */}
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span>{new Date(comment.created_at).toLocaleDateString('en-US', { 
                                                year: 'numeric', 
                                                month: 'short', 
                                                day: 'numeric' 
                                            })}</span>
                                            <span className={getStatusBadge(comment.status)}>
                                                {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-2 mt-4">
                                    {comment.status !== 'approved' && (
                                        <button
                                            onClick={() => handleStatusChange(comment.id, 'approved')}
                                            className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-500 transition-colors"
                                        >
                                            ✅ Approve
                                        </button>
                                    )}
                                    {comment.status !== 'rejected' && (
                                        <button
                                            onClick={() => handleStatusChange(comment.id, 'rejected')}
                                            className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-500 transition-colors"
                                        >
                                            ❌ Reject
                                        </button>
                                    )}
                                    {comment.status !== 'spam' && (
                                        <button
                                            onClick={() => handleStatusChange(comment.id, 'spam')}
                                            className="bg-orange-600 text-white px-3 py-1 text-sm rounded hover:bg-orange-500 transition-colors"
                                        >
                                            🚫 Spam
                                        </button>
                                    )}
                                    <Link
                                        href={route('admin.comments.show', comment.id)}
                                        className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-500 transition-colors"
                                    >
                                        👁️ View
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {/* Pagination */}
                        {comments.last_page > 1 && (
                            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                <div className="flex justify-center space-x-2">
                                    {comments.links.map((link, index) => (
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