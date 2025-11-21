import React, { useState } from 'react';
import { Category, BlogPost } from '../types';
import { BLOG_POSTS } from '../constants';
import { ArrowLeft, Clock, Tag, User, ChevronRight, BookOpen } from 'lucide-react';

interface BlogPageProps {
    onBack: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

    const categories = ['All', ...Object.values(Category)];

    const filteredPosts = selectedCategory === 'All'
        ? BLOG_POSTS
        : BLOG_POSTS.filter(post => post.category === selectedCategory);

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
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat as Category | 'All')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${selectedCategory === cat
                                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/20'
                                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map(post => (
                        <article
                            key={post.id}
                            className="group bg-black/20 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 flex flex-col h-full"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/10">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                    <span>•</span>
                                    <span>{post.date}</span>
                                </div>

                                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug">
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
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-32 border border-dashed border-white/10 rounded-2xl bg-white/5">
                        <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-500 font-light">No articles found in this category yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
