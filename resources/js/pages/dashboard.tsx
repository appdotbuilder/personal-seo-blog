import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    const adminStats = [
        {
            title: 'Blog Posts',
            icon: '📝',
            description: 'Manage your blog content',
            link: route('admin.blog-posts.index'),
            color: 'bg-blue-50 border-blue-200',
            iconColor: 'text-blue-600'
        },
        {
            title: 'Comments',
            icon: '💬',
            description: 'Moderate user comments',
            link: route('admin.comments.index'),
            color: 'bg-green-50 border-green-200',
            iconColor: 'text-green-600'
        },
        {
            title: 'View Blog',
            icon: '🌐',
            description: 'See your live blog',
            link: route('home'),
            color: 'bg-purple-50 border-purple-200',
            iconColor: 'text-purple-600'
        }
    ];

    const quickActions = [
        {
            title: 'New Blog Post',
            description: 'Create a new SEO-optimized blog post',
            link: route('admin.blog-posts.create'),
            icon: '✏️',
            buttonText: 'Create Post'
        },
        {
            title: 'Pending Comments',
            description: 'Review comments awaiting moderation',
            link: route('admin.comments.index', { status: 'pending' }),
            icon: '⏳',
            buttonText: 'Review Comments'
        }
    ];

    return (
        <AppShell>
            <Head title="Blog Admin Dashboard" />
            
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">📊 Blog Admin Dashboard</h1>
                    <p className="text-gray-600 mt-2">Manage your SEO-optimized personal blog</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {adminStats.map((stat, index) => (
                        <Link
                            key={index}
                            href={stat.link}
                            className={`${stat.color} rounded-lg border-2 p-6 hover:shadow-md transition-all duration-200 block`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
                                </div>
                                <div className={`text-2xl ${stat.iconColor}`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">⚡ Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {quickActions.map((action, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="text-xl">{action.icon}</div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                                        <p className="text-sm text-gray-600">{action.description}</p>
                                    </div>
                                </div>
                                <Link
                                    href={action.link}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors text-sm"
                                >
                                    {action.buttonText}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SEO Tips */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">🔍 SEO Best Practices</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="flex items-start space-x-2">
                                <div className="text-green-600 mt-1">✅</div>
                                <div>
                                    <p className="font-medium text-gray-900">Optimize your titles</p>
                                    <p className="text-sm text-gray-600">Keep titles under 60 characters</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="text-green-600 mt-1">✅</div>
                                <div>
                                    <p className="font-medium text-gray-900">Write compelling excerpts</p>
                                    <p className="text-sm text-gray-600">They appear in search results</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-2">
                                <div className="text-green-600 mt-1">✅</div>
                                <div>
                                    <p className="font-medium text-gray-900">Use meta descriptions</p>
                                    <p className="text-sm text-gray-600">Keep them under 160 characters</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="text-green-600 mt-1">✅</div>
                                <div>
                                    <p className="font-medium text-gray-900">Encourage engagement</p>
                                    <p className="text-sm text-gray-600">Moderate comments regularly</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}