import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';



export default function CreateBlogPost() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        meta_title: '',
        meta_description: '',
        featured_image: '',
        status: 'draft',
        published_at: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.blog-posts.store'));
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (title: string) => {
        setData('title', title);
        if (!data.slug) {
            setData('slug', generateSlug(title));
        }
        if (!data.meta_title) {
            setData('meta_title', title);
        }
    };

    return (
        <AppShell>
            <Head title="Create Blog Post - Admin Panel" />
            
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">✏️ Create New Blog Post</h1>
                    <p className="text-gray-600 mt-1">Create SEO-optimized content for your blog</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                        </div>

                        {/* Slug */}
                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                                URL Slug
                            </label>
                            <input
                                type="text"
                                id="slug"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="auto-generated-from-title"
                            />
                            {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug}</p>}
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                                Excerpt * <span className="text-gray-500">(for SEO and listings)</span>
                            </label>
                            <textarea
                                id="excerpt"
                                rows={3}
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Brief description of your post..."
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">{data.excerpt.length}/500 characters</p>
                            {errors.excerpt && <p className="text-red-600 text-sm mt-1">{errors.excerpt}</p>}
                        </div>

                        {/* Content */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            <textarea
                                id="content"
                                rows={12}
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Write your blog post content here..."
                                required
                            />
                            {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
                        </div>
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">🔍 SEO Settings</h3>
                        
                        {/* Meta Title */}
                        <div>
                            <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-2">
                                SEO Title <span className="text-gray-500">(optional - defaults to post title)</span>
                            </label>
                            <input
                                type="text"
                                id="meta_title"
                                value={data.meta_title}
                                onChange={(e) => setData('meta_title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="SEO-optimized title for search engines"
                            />
                            <p className="text-sm text-gray-500 mt-1">{data.meta_title.length}/60 characters (recommended)</p>
                            {errors.meta_title && <p className="text-red-600 text-sm mt-1">{errors.meta_title}</p>}
                        </div>

                        {/* Meta Description */}
                        <div>
                            <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-2">
                                SEO Description <span className="text-gray-500">(optional - defaults to excerpt)</span>
                            </label>
                            <textarea
                                id="meta_description"
                                rows={3}
                                value={data.meta_description}
                                onChange={(e) => setData('meta_description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Description that appears in search results"
                            />
                            <p className="text-sm text-gray-500 mt-1">{data.meta_description.length}/160 characters (recommended)</p>
                            {errors.meta_description && <p className="text-red-600 text-sm mt-1">{errors.meta_description}</p>}
                        </div>
                    </div>

                    {/* Publishing Settings */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">📅 Publishing Settings</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Status */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                                {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
                            </div>

                            {/* Published At */}
                            <div>
                                <label htmlFor="published_at" className="block text-sm font-medium text-gray-700 mb-2">
                                    Publish Date <span className="text-gray-500">(optional - defaults to now)</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    id="published_at"
                                    value={data.published_at}
                                    onChange={(e) => setData('published_at', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.published_at && <p className="text-red-600 text-sm mt-1">{errors.published_at}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-colors"
                        >
                            {processing ? 'Creating...' : '✅ Create Post'}
                        </button>
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}