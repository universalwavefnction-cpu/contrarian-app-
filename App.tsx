import React, { useState } from 'react';
import { Layout, Compass, Activity, Users, PlusCircle, Menu, X, Sparkles, BrainCircuit, Search, TrendingUp, BookOpen, Library } from 'lucide-react';
import { Protocol, Experiment } from './types';
import { CURRENT_USER, SAMPLE_PROTOCOLS, USER_EXPERIMENTS } from './constants';
import { ProtocolExplorer } from './components/ProtocolExplorer';
import { UserDashboard } from './components/UserDashboard';
import { CommunityHub } from './components/CommunityHub';
import { BlogPage } from './components/BlogPage';
import { ResourcesPage } from './components/ResourcesPage';
import { generateCustomProtocol } from './services/geminiService';

type View = 'explore' | 'dashboard' | 'community' | 'blog' | 'resources';

export default function App() {
    const [currentView, setCurrentView] = useState<View>('explore');
    const [user, setUser] = useState(CURRENT_USER);
    const [myExperiments, setMyExperiments] = useState<Experiment[]>(USER_EXPERIMENTS);

    // AI Generator State
    const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
    const [aiGoal, setAiGoal] = useState('');
    const [aiTime, setAiTime] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateProtocol = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!aiGoal || !aiTime) return;

        setIsGenerating(true);
        const newProtocol = await generateCustomProtocol(aiGoal, aiTime);
        setIsGenerating(false);

        if (newProtocol) {
            alert(`Generated Protocol: ${newProtocol.title}\n\n${newProtocol.description}`);
            setIsAIGeneratorOpen(false);
            setAiGoal('');
            setAiTime('');
        } else {
            alert('Failed to generate protocol. Please try again.');
        }
    };

    const BrandLogo = () => (
        <div className="flex items-center gap-3 select-none group cursor-pointer">
            <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative w-10 h-10 bg-slate-950 rounded-xl border border-white/10 flex items-center justify-center shadow-xl">
                    <TrendingUp className="w-5 h-5 text-blue-400" strokeWidth={2.5} />
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <span className="font-bold text-white tracking-tight text-base leading-none">CONTRARIAN</span>
                <span className="text-[10px] font-medium text-slate-500 tracking-[0.3em] leading-none mt-1.5 group-hover:text-blue-400 transition-colors">HUB</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-transparent text-slate-200 flex font-sans">

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-72 flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl fixed h-full z-20">
                <div className="p-8 border-b border-white/5 flex items-center">
                    <BrandLogo />
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2">
                    <button
                        onClick={() => setCurrentView('explore')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${currentView === 'explore' ? 'bg-white/5 text-white shadow-inner border border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Compass className={`w-5 h-5 ${currentView === 'explore' ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`} />
                        <span className="font-medium tracking-wide text-sm">Explore Protocols</span>
                    </button>
                    <button
                        onClick={() => setCurrentView('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${currentView === 'dashboard' ? 'bg-white/5 text-white shadow-inner border border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Activity className={`w-5 h-5 ${currentView === 'dashboard' ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`} />
                        <span className="font-medium tracking-wide text-sm">My Experiments</span>
                    </button>
                    <button
                        onClick={() => setCurrentView('community')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${currentView === 'community' ? 'bg-white/5 text-white shadow-inner border border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Users className={`w-5 h-5 ${currentView === 'community' ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`} />
                        <span className="font-medium tracking-wide text-sm">Community</span>
                    </button>
                    <button
                        onClick={() => setCurrentView('blog')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${currentView === 'blog' ? 'bg-white/5 text-white shadow-inner border border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <BookOpen className={`w-5 h-5 ${currentView === 'blog' ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`} />
                        <span className="font-medium tracking-wide text-sm">Blog</span>
                    </button>
                    <button
                        onClick={() => setCurrentView('resources')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${currentView === 'resources' ? 'bg-white/5 text-white shadow-inner border border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Library className={`w-5 h-5 ${currentView === 'resources' ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`} />
                        <span className="font-medium tracking-wide text-sm">Resources</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => setIsAIGeneratorOpen(true)}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <Sparkles className="w-4 h-4 relative z-10" />
                        <span className="font-semibold text-sm relative z-10">AI Protocol Gen</span>
                    </button>

                    <div className="mt-6 flex items-center gap-3 px-2 pb-2">
                        <div className="relative">
                            <img src={user.avatar} alt="User" className="w-9 h-9 rounded-full ring-2 ring-white/10" />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user.name}</p>
                            <p className="text-[10px] uppercase tracking-wider text-slate-500">Lvl {user.level} Contrarian</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Menu Button - Floating */}
            <button className="md:hidden fixed top-4 right-4 z-30 text-white bg-black/50 backdrop-blur-md p-2.5 rounded-full border border-white/10 shadow-lg">
                <Menu className="w-5 h-5" />
            </button>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-72 p-0 md:p-0 w-full relative">
                {/* Dynamic Content */}
                <div className="animate-fade-in-up min-h-screen">
                    {currentView === 'explore' && (
                        <ProtocolExplorer onSelectProtocol={(p) => console.log('Selected', p)} />
                    )}
                    <div className="p-6 md:p-12 max-w-7xl mx-auto">
                        {currentView === 'dashboard' && (
                            <UserDashboard user={user} experiments={myExperiments} />
                        )}
                        {currentView === 'community' && (
                            <CommunityHub />
                        )}
                        {currentView === 'blog' && (
                            <BlogPage onBack={() => setCurrentView('explore')} />
                        )}
                        {currentView === 'resources' && (
                            <ResourcesPage />
                        )}
                    </div>
                </div>
            </main>

            {/* AI Modal Overlay */}
            {isAIGeneratorOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-slate-900/90 border border-white/10 rounded-2xl w-full max-w-lg p-8 shadow-2xl shadow-black/50 relative backdrop-blur-xl">
                        <button
                            onClick={() => setIsAIGeneratorOpen(false)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-8 text-center">
                            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-5 mx-auto border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                <Sparkles className="w-6 h-6 text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Design Your Protocol</h2>
                            <p className="text-slate-400 text-sm">Leverage Gemini AI to build a data-driven optimization stack tailored to your physiology.</p>
                        </div>

                        <form onSubmit={handleGenerateProtocol} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Primary Objective</label>
                                <input
                                    type="text"
                                    value={aiGoal}
                                    onChange={(e) => setAiGoal(e.target.value)}
                                    placeholder="e.g. Increase deep sleep, Learn Python"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3.5 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500/50 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Daily Availability</label>
                                <input
                                    type="text"
                                    value={aiTime}
                                    onChange={(e) => setAiTime(e.target.value)}
                                    placeholder="e.g. 30 mins morning"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3.5 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500/50 outline-none transition-all"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isGenerating}
                                    className={`w-full py-4 rounded-xl font-semibold text-sm tracking-wide text-white transition-all ${isGenerating ? 'bg-slate-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5'}`}
                                >
                                    {isGenerating ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Activity className="w-4 h-4 animate-spin" /> Architecting Protocol...
                                        </span>
                                    ) : 'Generate Protocol'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}