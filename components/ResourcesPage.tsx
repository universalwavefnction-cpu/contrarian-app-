import React, { useState } from 'react';
import { ExternalLink, BookOpen, Video, Headphones, FileText, Star, Download, Filter, Search, ChevronRight } from 'lucide-react';
import { Category, Resource } from '../types';

const typeIcons: Record<Resource['type'], React.ReactNode> = {
    book: <BookOpen className="w-4 h-4" />,
    video: <Video className="w-4 h-4" />,
    podcast: <Headphones className="w-4 h-4" />,
    article: <FileText className="w-4 h-4" />,
    tool: <Download className="w-4 h-4" />
};

const typeColors: Record<Resource['type'], string> = {
    book: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
    video: 'from-red-500/20 to-pink-500/20 border-red-500/30 text-red-400',
    podcast: 'from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-400',
    article: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    tool: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400'
};

interface ResourcesPageProps {
    resources: Resource[];
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ resources }) => {
    const [selectedType, setSelectedType] = useState<Resource['type'] | 'all'>('all');
    const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredResources = resources.filter(resource => {
        const matchesType = selectedType === 'all' || resource.type === selectedType;
        const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesCategory && matchesSearch;
    });

    const featuredResources = resources.filter(r => r.featured).slice(0, 3);

    return (
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Resources
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl">
                    Curated books, podcasts, videos, and tools to fuel your optimization journey.
                </p>
            </div>

            {/* Featured Section */}
            <div className="mb-12">
                <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Featured Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {featuredResources.map(resource => (
                        <a
                            key={resource.id}
                            href={resource.url}
                            className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative">
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${typeColors[resource.type]} border mb-3`}>
                                    {typeIcons[resource.type]}
                                    <span className="capitalize">{resource.type}</span>
                                </div>
                                <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                                    {resource.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                                    {resource.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500">{resource.author}</span>
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        <span className="text-xs font-medium">{resource.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-slate-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500/50 outline-none transition-all"
                    />
                </div>

                {/* Type Filter */}
                <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-4 h-4 text-slate-500" />
                    {['all', 'book', 'podcast', 'video', 'tool', 'article'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type as Resource['type'] | 'all')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedType === type
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                                }`}
                        >
                            {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Chips */}
            <div className="mb-8 flex flex-wrap gap-2">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === 'all'
                        ? 'bg-white/10 text-white'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10'
                        }`}
                >
                    All Categories
                </button>
                {Object.values(Category).map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat
                            ? 'bg-white/10 text-white'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResources.map(resource => (
                    <a
                        key={resource.id}
                        href={resource.url}
                        className="group bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:bg-white/5 hover:border-white/10 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${typeColors[resource.type]} border`}>
                                {typeIcons[resource.type]}
                                <span className="capitalize">{resource.type}</span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <h3 className="text-white font-medium mb-2 group-hover:text-blue-400 transition-colors">
                            {resource.title}
                        </h3>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                            {resource.description}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500">{resource.author}</span>
                                <span className="text-xs text-slate-600">•</span>
                                <span className="text-xs px-2 py-0.5 bg-white/5 rounded text-slate-400">{resource.category}</span>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="text-xs font-medium">{resource.rating}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Empty State */}
            {filteredResources.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No resources found</h3>
                    <p className="text-slate-500 text-sm">Try adjusting your filters or search query.</p>
                </div>
            )}
        </div>
    );
};
