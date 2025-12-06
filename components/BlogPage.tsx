import React, { useState } from 'react';
import { Category, BlogPost } from '../types';
import { BLOG_POSTS } from '../constants';
import { ArrowLeft, Clock, Tag, User, ChevronRight, BookOpen, Sparkles, Brain, Code, Briefcase, BookMarked, Flask, Dumbbell, Apple, Zap } from 'lucide-react';

interface BlogPageProps {
    onBack: () => void;
}

const categoryIcons: Record<Category, React.ReactNode> = {
    [Category.Biohacking]: <Sparkles className="w-5 h-5" />,
    [Category.Wellness]: <Brain className="w-5 h-5" />,
    [Category.Coding]: <Code className="w-5 h-5" />,
    [Category.Business]: <Briefcase className="w-5 h-5" />,
    [Category.Philosophy]: <BookMarked className="w-5 h-5" />,
    [Category.Science]: <Flask className="w-5 h-5" />,
    [Category.Fitness]: <Dumbbell className="w-5 h-5" />,
    [Category.Nutrition]: <Apple className="w-5 h-5" />,
    [Category.Productivity]: <Zap className="w-5 h-5" />
};

const categoryColors: Record<Category, { bg: string; border: string; text: string; gradient: string }> = {
    [Category.Biohacking]: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', gradient: 'from-purple-500/20 to-violet-500/10' },
    [Category.Wellness]: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', gradient: 'from-emerald-500/20 to-teal-500/10' },
    [Category.Coding]: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', gradient: 'from-blue-500/20 to-cyan-500/10' },
    [Category.Business]: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', gradient: 'from-amber-500/20 to-orange-500/10' },
    [Category.Philosophy]: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400', gradient: 'from-indigo-500/20 to-purple-500/10' },
    [Category.Science]: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', gradient: 'from-cyan-500/20 to-blue-500/10' },
    [Category.Fitness]: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', gradient: 'from-red-500/20 to-rose-500/10' },
    [Category.Nutrition]: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', gradient: 'from-green-500/20 to-emerald-500/10' },
    [Category.Productivity]: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400', gradient: 'from-yellow-500/20 to-amber-500/10' }
};

export const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
    const [expandedCategory, setExpandedCategory] = useState<Category | null>(null);

    // Group posts by category
    const postsByCategory = Object.values(Category).reduce((acc, category) => {
        const posts = BLOG_POSTS.filter(post => post.category === category);
        if (posts.length > 0) {
            acc[category] = posts;
        }
        return acc;
    }, {} as Record<Category, BlogPost[]>);

    const categoriesWithPosts = Object.keys(postsByCategory) as Category[];

    const BlogCard: React.FC<{ post: BlogPost; featured?: boolean }> = ({ post, featured = false }) => (
        <article
            className={`group bg-black/20 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 flex flex-col h-full ${featured ? 'md:col-span-2 md:flex-row' : ''}`}
        >
            <div className={`${featured ? 'md:w-1/2 h-48 md:h-auto' : 'h-48'} overflow-hidden relative`}>
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 ${categoryColors[post.category].bg} ${categoryColors[post.category].border} border backdrop-blur-md ${categoryColors[post.category].text} text-[10px] font-bold uppercase tracking-wider rounded-md`}>
                        {post.category}
                    </span>
                </div>
            </div>

            <div className={`p-6 flex-1 flex flex-col ${featured ? 'md:w-1/2' : ''}`}>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                </div>

                <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-medium text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug`}>
                    {post.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 font-light flex-1">
                    {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-white/5">
                            {post.author.charAt(0)}
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{post.author}</span>
                    </div>
                    <button className="text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1 group/btn">
                        Read <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </article>
    );

    return (
        <div className="animate-fade-in min-h-screen pb-20">
            {/* Header */}
            <div className="bg-black/20 border-b border-white/5 pt-24 pb-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
                        Contrarian <span className="text-blue-400 font-medium">Insights</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl font-light">
                        Deep dives into protocols, experiments, and the science of optimization.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                {/* Category Quick Nav */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {categoriesWithPosts.map(category => (
                        <a
                            key={category}
                            href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${categoryColors[category].bg} ${categoryColors[category].border} ${categoryColors[category].text}`}
                        >
                            {categoryIcons[category]}
                            <span className="text-sm font-medium">{category}</span>
                            <span className="text-xs opacity-60 ml-1">({postsByCategory[category].length})</span>
                        </a>
                    ))}
                </div>

                {/* Category Sections */}
                {categoriesWithPosts.map(category => (
                    <section
                        key={category}
                        id={category.toLowerCase().replace(/\s+/g, '-')}
                        className="mb-16 scroll-mt-8"
                    >
                        {/* Category Header */}
                        <div className={`flex items-center gap-4 mb-8 pb-4 border-b border-white/5`}>
                            <div className={`w-12 h-12 rounded-xl ${categoryColors[category].bg} ${categoryColors[category].border} border flex items-center justify-center ${categoryColors[category].text}`}>
                                {categoryIcons[category]}
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-white">{category}</h2>
                                <p className="text-sm text-slate-500">{postsByCategory[category].length} article{postsByCategory[category].length !== 1 ? 's' : ''}</p>
                            </div>
                        </div>

                        {/* Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {postsByCategory[category].map((post, index) => (
                                <BlogCard
                                    key={post.id}
                                    post={post}
                                    featured={index === 0 && postsByCategory[category].length > 2}
                                />
                            ))}
                        </div>
                    </section>
                ))}

                {categoriesWithPosts.length === 0 && (
                    <div className="text-center py-32 border border-dashed border-white/10 rounded-2xl bg-white/5">
                        <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-500 font-light">No articles found yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
