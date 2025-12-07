import React, { useState } from 'react';
import { Protocol, Category, Difficulty } from '../types';
import { SAMPLE_PROTOCOLS } from '../constants';
import { Users, CheckCircle, Clock, Zap, ArrowLeft, Dumbbell, Apple, Briefcase, Cpu, Brain, Leaf, MapPin, Calendar, X, Plus, AlertCircle, ChevronRight, Trophy, Bot, Banknote } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';

const MEETUP_CITIES = [
    { id: 'berlin', city: 'Berlin', country: 'Germany', nextMeetup: 'Dec 12, 2025', members: 156, venue: 'Factory Berlin Mitte' },
    { id: 'sf', city: 'San Francisco', country: 'USA', nextMeetup: 'Dec 8, 2025', members: 342, venue: 'WeWork SOMA' },
    { id: 'london', city: 'London', country: 'UK', nextMeetup: 'Dec 14, 2025', members: 289, venue: 'Second Home Spitalfields' },
    { id: 'austin', city: 'Austin', country: 'USA', nextMeetup: 'Dec 10, 2025', members: 178, venue: 'Capital Factory' },
    { id: 'tokyo', city: 'Tokyo', country: 'Japan', nextMeetup: 'Dec 15, 2025', members: 124, venue: 'Impact Hub Tokyo' },
];

interface ProtocolExplorerProps {
    onSelectProtocol: (protocol: Protocol) => void;
    protocols?: Protocol[];
}

const CATEGORY_CARDS = [
    {
        id: 'cat-fitness',
        category: Category.Fitness,
        label: 'Fitness',
        icon: Dumbbell,
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/50',
        border: 'border-emerald-500/30'
    },
    {
        id: 'cat-nutrition',
        category: Category.Nutrition,
        label: 'Nutrition',
        icon: Apple,
        color: 'text-orange-400',
        bg: 'bg-orange-950/50',
        border: 'border-orange-500/30'
    },
    {
        id: 'cat-productivity',
        category: Category.Productivity,
        label: 'Productivity',
        icon: Briefcase,
        color: 'text-blue-400',
        bg: 'bg-blue-950/50',
        border: 'border-blue-500/30'
    },
    {
        id: 'cat-ai',
        category: Category.AI,
        label: 'AI Use',
        icon: Bot,
        color: 'text-fuchsia-400',
        bg: 'bg-fuchsia-950/50',
        border: 'border-fuchsia-500/30'
    },
    {
        id: 'cat-money',
        category: Category.Money,
        label: 'Money',
        icon: Banknote,
        color: 'text-green-400',
        bg: 'bg-green-950/50',
        border: 'border-green-500/30'
    },
    {
        id: 'cat-biohacking',
        category: Category.Biohacking,
        label: 'Biohacking',
        icon: Cpu,
        color: 'text-purple-400',
        bg: 'bg-purple-950/50',
        border: 'border-purple-500/30'
    },
    {
        id: 'cat-wellness',
        category: Category.Wellness,
        label: 'Wellness',
        icon: Leaf,
        color: 'text-teal-400',
        bg: 'bg-teal-950/50',
        border: 'border-teal-500/30'
    },
    {
        id: 'cat-philosophy',
        category: Category.Philosophy,
        label: 'Philosophy',
        icon: Brain,
        color: 'text-yellow-400',
        bg: 'bg-yellow-950/50',
        border: 'border-yellow-500/30'
    }
];

export const ProtocolExplorer: React.FC<ProtocolExplorerProps> = ({ onSelectProtocol, protocols: propProtocols }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [showMeetupModal, setShowMeetupModal] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    // Use prop protocols if available, otherwise default to constant
    // We use a local state to allow the "Submit" button to still visually work for the user session
    const [localProtocols, setLocalProtocols] = useState<Protocol[]>([]);

    const allProtocols = [...(propProtocols || SAMPLE_PROTOCOLS), ...localProtocols];

    // Form state
    const [newProtocol, setNewProtocol] = useState<Partial<Protocol>>({
        title: '',
        description: '',
        difficulty: Difficulty.Medium,
        durationDays: 30,
        steps: ['']
    });

    const filteredProtocols = allProtocols.filter(p =>
        selectedCategory ? p.category === selectedCategory : true
    );

    const handleSubmitProtocol = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProtocol.title || !newProtocol.description || !selectedCategory) return;

        const protocol: Protocol = {
            id: `p${Date.now()}`,
            title: newProtocol.title,
            description: newProtocol.description,
            category: selectedCategory,
            difficulty: newProtocol.difficulty || Difficulty.Medium,
            durationDays: newProtocol.durationDays || 30,
            participantCount: 1,
            successRate: 0,
            tags: ['New', selectedCategory],
            author: 'You',
            verified: false,
            steps: newProtocol.steps || []
        };

        setLocalProtocols([protocol, ...localProtocols]);
        setShowSubmitModal(false);
        setNewProtocol({
            title: '',
            description: '',
            difficulty: Difficulty.Medium,
            durationDays: 30,
            steps: ['']
        });
    };

    const handleStepChange = (index: number, value: string) => {
        const updatedSteps = [...(newProtocol.steps || [])];
        updatedSteps[index] = value;
        setNewProtocol({ ...newProtocol, steps: updatedSteps });
    };

    const addStep = () => {
        setNewProtocol({ ...newProtocol, steps: [...(newProtocol.steps || []), ''] });
    };

    const removeStep = (index: number) => {
        const updatedSteps = [...(newProtocol.steps || [])];
        updatedSteps.splice(index, 1);
        setNewProtocol({ ...newProtocol, steps: updatedSteps });
    };

    if (selectedCategory) {
        return (
            <div className="p-6 md:p-8 animate-fade-in max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <div className="p-2 rounded-full bg-slate-100 dark:bg-white/5 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-sm">Back</span>
                    </button>

                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">{selectedCategory}</h2>
                        <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                        <span className="text-sm text-slate-500">{filteredProtocols.length} protocols</span>
                    </div>

                    <button
                        onClick={() => setShowSubmitModal(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5"
                    >
                        <Plus className="w-4 h-4" />
                        Submit
                    </button>
                </div>

                <motion.div layout className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {filteredProtocols.length > 0 ? filteredProtocols.map((protocol, index) => (
                            <motion.div
                                layout
                                key={protocol.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => onSelectProtocol(protocol)}
                                className="group flex items-center gap-4 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-xl p-4 hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-200 cursor-pointer"
                            >
                                {/* Rank / Index */}
                                <span className="w-6 text-center text-xs font-mono text-slate-400 dark:text-slate-600 font-medium">#{index + 1}</span>

                                {/* Icon/Image Placeholder */}
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${protocol.difficulty === Difficulty.Extreme ? 'bg-red-500/10 text-red-500' :
                                    protocol.difficulty === Difficulty.Hard ? 'bg-orange-500/10 text-orange-500' :
                                        'bg-blue-500/10 text-blue-500'
                                    }`}>
                                    <Zap className="w-5 h-5" />
                                </div>

                                {/* Main Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h3 className="text-base font-medium text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {protocol.title}
                                        </h3>
                                        {!protocol.verified && (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
                                                Community
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate font-light">
                                        {protocol.description}
                                    </p>
                                </div>

                                {/* Stats Columns - Hidden on mobile, visible on desktop */}
                                <div className="hidden md:flex items-center gap-8 text-sm">
                                    <div className="w-24">
                                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="font-mono text-xs">{protocol.durationDays}d</span>
                                        </div>
                                    </div>
                                    <div className="w-24">
                                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                                            <Users className="w-3.5 h-3.5" />
                                            <span className="font-mono text-xs">{(protocol.participantCount / 1000).toFixed(1)}k</span>
                                        </div>
                                    </div>
                                    <div className="w-20 text-right">
                                        <div className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                                            <Trophy className="w-3 h-3" />
                                            <span className="font-mono text-xs font-bold">{protocol.successRate}%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Chevron */}
                                <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors" />
                            </motion.div>
                        )) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-20 border border-dashed border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5"
                            >
                                <p className="text-slate-500 font-light">No protocols found.</p>
                                <button
                                    onClick={() => setShowSubmitModal(true)}
                                    className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                                >
                                    Submit an experiment request
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Submit Protocol Modal */}
                {showSubmitModal && (
                    <div className="fixed inset-0 bg-slate-950/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
                                <div>
                                    <h3 className="text-2xl font-medium text-slate-900 dark:text-white">Submit Protocol</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Share your experiment with the community</p>
                                </div>
                                <button
                                    onClick={() => setShowSubmitModal(false)}
                                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitProtocol} className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Protocol Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={newProtocol.title}
                                        onChange={e => setNewProtocol({ ...newProtocol, title: e.target.value })}
                                        placeholder="e.g., 30-Day Cold Shower Challenge"
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                                    <textarea
                                        required
                                        value={newProtocol.description}
                                        onChange={e => setNewProtocol({ ...newProtocol, description: e.target.value })}
                                        placeholder="Briefly describe the protocol and its benefits..."
                                        rows={3}
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Difficulty</label>
                                        <select
                                            value={newProtocol.difficulty}
                                            onChange={e => setNewProtocol({ ...newProtocol, difficulty: e.target.value as Difficulty })}
                                            className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none cursor-pointer"
                                        >
                                            {Object.values(Difficulty).map(d => (
                                                <option key={d} value={d} className="bg-white dark:bg-slate-800">{d}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Duration (Days)</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={newProtocol.durationDays}
                                            onChange={e => setNewProtocol({ ...newProtocol, durationDays: parseInt(e.target.value) })}
                                            className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Protocol Steps</label>
                                        <button
                                            type="button"
                                            onClick={addStep}
                                            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors"
                                        >
                                            + Add Step
                                        </button>
                                    </div>
                                    {newProtocol.steps?.map((step, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <span className="flex-shrink-0 w-6 h-10 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-mono">{idx + 1}.</span>
                                            <input
                                                type="text"
                                                value={step}
                                                onChange={e => handleStepChange(idx, e.target.value)}
                                                placeholder={`Step ${idx + 1}`}
                                                className="flex-1 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors text-sm"
                                            />
                                            {idx > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeStep(idx)}
                                                    className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-4 flex gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                    <p className="text-sm text-blue-700 dark:text-blue-200/80">
                                        Your protocol will be submitted for community verification. Once verified, it will appear in the public explorer.
                                    </p>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowSubmitModal(false)}
                                        className="flex-1 px-6 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
                                    >
                                        Submit Protocol
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="w-full animate-fade-in pb-20">
            {/* Hero Section - Compact */}
            <div className="py-12 md:py-20 text-center px-4 relative overflow-hidden pt-12 md:pt-20">
                {/* Background ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-aurora-peach/20 dark:bg-aurora-magenta/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

                <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                        First Community of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-peach via-aurora-pink to-aurora-magenta dark:from-aurora-peach dark:via-aurora-pink dark:to-aurora-magenta relative">
                            Authentic Achievers.
                            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-aurora-pink to-transparent opacity-50"></span>
                        </span>
                    </h1>

                    <div className="space-y-3">
                        <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl font-light">
                            Pick a domain to start experimenting.
                        </p>
                        <p className="text-slate-500 dark:text-slate-500 text-xs md:text-sm uppercase tracking-widest font-medium">
                            No gurus. No universal answers. <span className="text-slate-900 dark:text-white">Just honest data.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Categories Grid - 2 Columns */}
            <div className="max-w-5xl mx-auto px-4 md:px-8">
                <motion.div
                    layout
                    className="grid grid-cols-2 gap-3 md:gap-4"
                >
                    <AnimatePresence mode="popLayout">
                        {CATEGORY_CARDS.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <SpotlightCard
                                    key={card.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    onClick={() => setSelectedCategory(card.category)}
                                    className="group flex items-center gap-3 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:border-slate-300 dark:hover:border-white/10 cursor-pointer shadow-sm hover:shadow-md"
                                    spotlightColor="rgba(255, 255, 255, 0.05)"
                                >
                                    {/* Icon */}
                                    <div className={`p-2.5 rounded-lg ${card.bg} border ${card.border} group-hover:scale-105 transition-transform duration-300 flex-shrink-0 relative z-10`}>
                                        <Icon className={`w-5 h-5 ${card.color}`} strokeWidth={2} />
                                    </div>

                                    {/* Content - Just Label */}
                                    <div className="flex-1 min-w-0 relative z-10">
                                        <h3 className="text-sm md:text-base font-semibold text-slate-900 dark:text-white tracking-tight">{card.label}</h3>
                                    </div>

                                    {/* Chevron */}
                                    <div className="pl-1 relative z-10">
                                        <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors" />
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Footer Connect Banner */}
            <div className="max-w-4xl mx-auto mt-20 px-6">
                <div className="border border-slate-200 dark:border-white/5 bg-gradient-to-b from-slate-50 dark:from-white/[0.02] to-transparent rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent"></div>
                    <h2 className="text-xl md:text-2xl font-medium text-slate-900 dark:text-white mb-3">Connect with Fellow Experimenters</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-light mb-6 max-w-lg mx-auto text-sm">Join virtual and in-person events to share insights, ask questions, and find your tribe.</p>
                    <button
                        onClick={() => setShowMeetupModal(true)}
                        className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-200 px-6 py-3 rounded-full font-medium text-sm transition-all hover:scale-105"
                    >
                        Find a Meetup
                    </button>
                </div>
            </div>

            {/* Meetup Modal */}
            {showMeetupModal && (
                <div className="fixed inset-0 bg-slate-950/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-medium text-slate-900 dark:text-white">Find a Meetup</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Join experimenters in your city</p>
                            </div>
                            <button
                                onClick={() => setShowMeetupModal(false)}
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto max-h-[60vh]">
                            {MEETUP_CITIES.map((meetup) => (
                                <div
                                    key={meetup.id}
                                    className="p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/10 mb-2"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-slate-200 dark:border-white/10">
                                                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-medium text-slate-900 dark:text-white">{meetup.city}</h4>
                                                <p className="text-slate-500 dark:text-slate-500 text-sm">{meetup.country}</p>
                                                <p className="text-slate-400 dark:text-slate-400 text-sm mt-2">{meetup.venue}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-sm mb-1">
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
                        <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
                            <p className="text-center text-slate-500 text-sm">Don't see your city? <button className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">Request a meetup</button></p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};