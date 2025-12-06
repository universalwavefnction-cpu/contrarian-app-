import React, { useState } from 'react';
import { Protocol, Category, Difficulty } from '../types';
import { SAMPLE_PROTOCOLS } from '../constants';
import { Users, CheckCircle, Clock, Zap, ArrowLeft, Dumbbell, Apple, Briefcase, Cpu, Brain, Leaf, MapPin, Calendar, X } from 'lucide-react';

const MEETUP_CITIES = [
    { id: 'berlin', city: 'Berlin', country: 'Germany', nextMeetup: 'Dec 12, 2025', members: 156, venue: 'Factory Berlin Mitte' },
    { id: 'sf', city: 'San Francisco', country: 'USA', nextMeetup: 'Dec 8, 2025', members: 342, venue: 'WeWork SOMA' },
    { id: 'london', city: 'London', country: 'UK', nextMeetup: 'Dec 14, 2025', members: 289, venue: 'Second Home Spitalfields' },
    { id: 'austin', city: 'Austin', country: 'USA', nextMeetup: 'Dec 10, 2025', members: 178, venue: 'Capital Factory' },
    { id: 'tokyo', city: 'Tokyo', country: 'Japan', nextMeetup: 'Dec 15, 2025', members: 124, venue: 'Impact Hub Tokyo' },
];

interface ProtocolExplorerProps {
    onSelectProtocol: (protocol: Protocol) => void;
}

const CATEGORY_CARDS = [
    {
        id: 'cat-fitness',
        category: Category.Fitness,
        label: 'Fitness',
        description: 'Challenge conventional wisdom about training, recovery, and physical performance.',
        members: 374,
        icon: Dumbbell,
        color: 'text-emerald-400',
    },
    {
        id: 'cat-nutrition',
        category: Category.Nutrition,
        label: 'Nutrition',
        description: 'Explore experimental diets and eating patterns beyond the mainstream.',
        members: 519,
        icon: Apple,
        color: 'text-orange-400',
    },
    {
        id: 'cat-productivity',
        category: Category.Productivity,
        label: 'Productivity',
        description: 'Find focus and effectiveness with anti-hustle systems and methods.',
        members: 241,
        icon: Briefcase,
        color: 'text-blue-400',
    },
    {
        id: 'cat-biohacking',
        category: Category.Biohacking,
        label: 'Biohacking',
        description: 'Data-driven interventions to optimize your biology for longevity.',
        members: 892,
        icon: Cpu,
        color: 'text-purple-400',
    },
    {
        id: 'cat-wellness',
        category: Category.Wellness,
        label: 'Wellness',
        description: 'Holistic approaches to mental and physical well-being.',
        members: 420,
        icon: Leaf,
        color: 'text-teal-400',
    },
    {
        id: 'cat-philosophy',
        category: Category.Philosophy,
        label: 'Philosophy',
        description: 'Ancient wisdom applied to modern problem solving.',
        members: 156,
        icon: Brain,
        color: 'text-yellow-400',
    }
];

export const ProtocolExplorer: React.FC<ProtocolExplorerProps> = ({ onSelectProtocol }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [showMeetupModal, setShowMeetupModal] = useState(false);

    const filteredProtocols = SAMPLE_PROTOCOLS.filter(p =>
        selectedCategory ? p.category === selectedCategory : true
    );

    if (selectedCategory) {
        return (
            <div className="p-6 md:p-12 animate-fade-in max-w-7xl mx-auto">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className="mb-10 group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                >
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm tracking-wide">Back to Hub</span>
                </button>

                <div className="mb-12 border-b border-white/5 pb-8">
                    <h2 className="text-5xl font-light text-white mb-4 tracking-tight">{selectedCategory} Protocols</h2>
                    <p className="text-slate-400 text-lg font-light">Community verified experiments for this domain.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProtocols.length > 0 ? filteredProtocols.map(protocol => (
                        <div
                            key={protocol.id}
                            onClick={() => onSelectProtocol(protocol)}
                            className="group bg-black/20 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-blue-500/30 hover:bg-white/5 transition-all duration-300 cursor-pointer relative overflow-hidden shadow-lg shadow-black/20"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:translate-x-0 translate-x-4">
                                <Zap className="text-blue-500 w-5 h-5 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <span className={`text-[10px] font-mono px-2.5 py-1 rounded uppercase tracking-wider font-semibold border ${protocol.difficulty === Difficulty.Extreme ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                    protocol.difficulty === Difficulty.Hard ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                    }`}>
                                    {protocol.difficulty}
                                </span>
                            </div>

                            <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-blue-100 transition-colors">
                                {protocol.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 h-10 line-clamp-2 font-light">
                                {protocol.description}
                            </p>

                            <div className="flex items-center justify-between text-sm text-slate-500 border-t border-white/5 pt-6 mt-auto">
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 text-slate-600" />
                                    <span className="font-mono text-xs">{protocol.durationDays}d</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4 text-slate-600" />
                                    <span className="font-mono text-xs">{(protocol.participantCount / 1000).toFixed(1)}k</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-blue-400">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="font-mono text-xs font-bold">{protocol.successRate}%</span>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full text-center py-32 border border-dashed border-white/10 rounded-2xl bg-white/5">
                            <p className="text-slate-500 font-light">No protocols found in this category yet.</p>
                            <button className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">Submit an experiment request</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full animate-fade-in pb-20">
            {/* Hero Section */}
            <div className="py-12 md:py-36 text-center px-4 relative overflow-hidden pt-16 md:pt-36">
                {/* Background ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

                <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                    <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter text-white leading-[0.9]">
                        Your mileage <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 relative">
                            will vary.
                            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></span>
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                        No gurus. No universal answers. Just honest data. <br />
                        <span className="text-slate-500">Pick a domain to start experimenting.</span>
                    </p>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CATEGORY_CARDS.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.id}
                                onClick={() => setSelectedCategory(card.category)}
                                className="group bg-white/[0.02] backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 cursor-pointer flex flex-col h-full hover:-translate-y-1 shadow-2xl shadow-black/20"
                            >
                                <div className="mb-8 flex items-center justify-between">
                                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`w-6 h-6 ${card.color}`} strokeWidth={1.5} />
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-slate-500">
                                        <ArrowLeft className="w-5 h-5 rotate-180" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">{card.label}</h3>
                                <p className="text-slate-400 leading-relaxed mb-8 flex-grow font-light text-sm">
                                    {card.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">
                                        {card.members} active members
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer Connect Banner */}
            <div className="max-w-4xl mx-auto mt-32 px-6">
                <div className="border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">Connect with Fellow Experimenters</h2>
                    <p className="text-slate-400 font-light mb-8 max-w-lg mx-auto">Join virtual and in-person events to share insights, ask questions, and find your tribe.</p>
                    <button
                        onClick={() => setShowMeetupModal(true)}
                        className="bg-white text-slate-950 hover:bg-slate-200 px-8 py-3.5 rounded-full font-medium transition-all hover:scale-105"
                    >
                        Find a Meetup
                    </button>
                </div>
            </div>

            {/* Meetup Modal */}
            {showMeetupModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-slate-900 border border-white/10 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-medium text-white">Find a Meetup</h3>
                                <p className="text-slate-400 text-sm mt-1">Join experimenters in your city</p>
                            </div>
                            <button
                                onClick={() => setShowMeetupModal(false)}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto max-h-[60vh]">
                            {MEETUP_CITIES.map((meetup) => (
                                <div
                                    key={meetup.id}
                                    className="p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10 mb-2"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
                                                <MapPin className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-medium text-white">{meetup.city}</h4>
                                                <p className="text-slate-500 text-sm">{meetup.country}</p>
                                                <p className="text-slate-400 text-sm mt-2">{meetup.venue}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1.5 text-emerald-400 text-sm mb-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{meetup.nextMeetup}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                                                <Users className="w-4 h-4" />
                                                <span>{meetup.members} members</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-white/10 bg-white/[0.02]">
                            <p className="text-center text-slate-500 text-sm">Don't see your city? <button className="text-blue-400 hover:text-blue-300">Request a meetup</button></p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};