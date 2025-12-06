import React, { useState } from 'react';
import { Category, BlogPost } from '../types';
import { BLOG_POSTS } from '../constants';
import { Search, Filter, Clock, ChevronRight, ArrowLeft, Dumbbell, Apple, Briefcase, Cpu, Brain, Leaf, Bot, Banknote, BookOpen } from 'lucide-react';

interface BlogPageProps {
    onBack: () => void;
}

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
    [Category.Biohacking]: <Cpu className="w-5 h-5" />,
    [Category.Wellness]: <Leaf className="w-5 h-5" />,
    [Category.Coding]: <Cpu className="w-5 h-5" />,
    [Category.Business]: <Briefcase className="w-5 h-5" />,
    [Category.Philosophy]: <Brain className="w-5 h-5" />,
    [Category.Science]: <Cpu className="w-5 h-5" />,
    [Category.Fitness]: <Dumbbell className="w-5 h-5" />,
    [Category.Nutrition]: <Apple className="w-5 h-5" />,
    [Category.Productivity]: <Briefcase className="w-5 h-5" />,
    [Category.AI]: <Bot className="w-5 h-5" />,
    [Category.Money]: <Banknote className="w-5 h-5" />
};

const CATEGORY_STYLES: Record<Category, { bg: string, border: string, text: string, gradient: string }> = {
    [Category.Biohacking]: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-500', gradient: 'from-purple-500/20 to-indigo-500/20' },
    [Category.Wellness]: { bg: 'bg-teal-500/10', border: 'border-teal-500/20', text: 'text-teal-500', gradient: 'from-teal-500/20 to-emerald-500/20' },
    [Category.Coding]: { bg: 'bg-slate-500/10', border: 'border-slate-500/20', text: 'text-slate-500', gradient: 'from-slate-500/20 to-gray-500/20' },
    [Category.Business]: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-500', gradient: 'from-blue-500/20 to-sky-500/20' },
    [Category.Philosophy]: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-500', gradient: 'from-yellow-500/20 to-amber-500/20' },
    [Category.Science]: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-500', gradient: 'from-indigo-500/20 to-violet-500/20' },
    [Category.Fitness]: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-500', gradient: 'from-emerald-500/20 to-green-500/20' },
    [Category.Nutrition]: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-500', gradient: 'from-orange-500/20 to-red-500/20' },
    [Category.Productivity]: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-500', gradient: 'from-blue-500/20 to-cyan-500/20' },
    [Category.AI]: { bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20', text: 'text-fuchsia-500', gradient: 'from-fuchsia-500/20 to-purple-500/20' },
    [Category.Money]: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-500', gradient: 'from-green-500/20 to-emerald-500/20' }
};

export const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = BLOG_POSTS.filter(post => {
        const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="animate-fade-in w-full max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <div className="p-2 rounded-full bg-slate-100 dark:bg-white/5 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">Back to Explore</span>
                </button>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">The Contrarian Blog</h1>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors text-slate-900 dark:text-white placeholder:text-slate-400"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${!selectedCategory ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'}`}
                    >
                        All
                    </button>
                    {Object.values(Category).map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border ${selectedCategory === cat ? `bg-${CATEGORY_STYLES[cat].text.split('-')[1]}-500/10 ${CATEGORY_STYLES[cat].border} ${CATEGORY_STYLES[cat].text}` : 'border-transparent bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Post (only if no search/filter) */}
            {!selectedCategory && !searchQuery && BLOG_POSTS.length > 0 && (
                <div className="mb-12 group cursor-pointer relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="p-8 md:p-12 relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${CATEGORY_STYLES[BLOG_POSTS[0].category].bg} ${CATEGORY_STYLES[BLOG_POSTS[0].category].text} border ${CATEGORY_STYLES[BLOG_POSTS[0].category].border}`}>
                                {BLOG_POSTS[0].category}
                            </span>
                            <span className="text-slate-400 text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {BLOG_POSTS[0].readTime}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {BLOG_POSTS[0].title}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg mb-6 max-w-2xl line-clamp-2">
                            {BLOG_POSTS[0].excerpt}
                        </p>
                        <div className="flex items-center gap-3">
                            <img src={BLOG_POSTS[0].author.avatar} alt={BLOG_POSTS[0].author.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">{BLOG_POSTS[0].author.name}</p>
                                <p className="text-xs text-slate-500">{BLOG_POSTS[0].date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                    <div
                        key={post.id}
                        className="group flex flex-col bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
                    >
                        <div className={`h-2 w-full bg-gradient-to-r ${CATEGORY_STYLES[post.category].gradient}`}></div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-2 rounded-lg ${CATEGORY_STYLES[post.category].bg} ${CATEGORY_STYLES[post.category].text}`}>
                                    {CATEGORY_ICONS[post.category]}
                                </div>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {post.readTime}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                                <div className="flex items-center gap-2">
                                    <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full" />
                                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{post.author.name}</span>
                                </div>
                                <span className="text-xs text-slate-400">{post.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No articles found</h3>
                    <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or category filter.</p>
                </div>
            )}
        </div>
    );
};
