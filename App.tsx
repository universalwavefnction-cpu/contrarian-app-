import React, { useState, useEffect } from 'react';
import { Layout, Compass, Activity, Users, PlusCircle, Menu, X, Sparkles, BrainCircuit, Search, TrendingUp, BookOpen, Library, Sun, Moon, Command } from 'lucide-react';
import { Protocol, Experiment, Resource } from './types';
import { CURRENT_USER, SAMPLE_PROTOCOLS, USER_EXPERIMENTS, SAMPLE_RESOURCES } from './constants';
import { ProtocolExplorer } from './components/ProtocolExplorer';
import { UserDashboard } from './components/UserDashboard';
import { CommunityHub } from './components/CommunityHub';
import { BlogPage } from './components/BlogPage';
import { ResourcesPage } from './components/ResourcesPage';
import { generateCustomProtocol } from './services/geminiService';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { CommandPalette } from './components/CommandPalette';
import { BottomNav } from './components/BottomNav';
import { NoiseOverlay } from './components/NoiseOverlay';

import { AdminDashboard } from './components/AdminDashboard';
import { AILab } from './components/AILab';

type View = 'explore' | 'dashboard' | 'community' | 'blog' | 'resources' | 'admin' | 'lab';

function AppContent() {
    const [currentView, setCurrentView] = useState<View>('explore');
    const [user, setUser] = useState(CURRENT_USER);
    const [myExperiments, setMyExperiments] = useState<Experiment[]>(USER_EXPERIMENTS);
    const [protocols, setProtocols] = useState<Protocol[]>(SAMPLE_PROTOCOLS);
    const [resources, setResources] = useState<Resource[]>(SAMPLE_RESOURCES);
    const { theme, toggleTheme } = useTheme();
    const [exploreKey, setExploreKey] = useState(0);

    // Command Palette State
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

    // AI Generator State
    const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
    const [aiGoal, setAiGoal] = useState('');
    const [aiTime, setAiTime] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleUpdateProtocol = (updatedProtocol: Protocol) => {
        setProtocols(protocols.map(p => p.id === updatedProtocol.id ? updatedProtocol : p));
    };

    const handleAddProtocol = (newProtocol: Protocol) => {
        setProtocols([newProtocol, ...protocols]);
    };

    const handleDeleteProtocol = (id: string) => {
        setProtocols(protocols.filter(p => p.id !== id));
    };

    const handleUpdateResource = (updatedResource: Resource) => {
        setResources(resources.map(r => r.id === updatedResource.id ? updatedResource : r));
    };

    const handleAddResource = (newResource: Resource) => {
        setResources([newResource, ...resources]);
    };

    const handleDeleteResource = (id: string) => {
        setResources(resources.filter(r => r.id !== id));
    };

    // Handle Custom Navigation Events (from Command Palette)
    useEffect(() => {
        const handleNavigation = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail) {
                setCurrentView(customEvent.detail as View);
            }
        };

        window.addEventListener('navigate-to-view', handleNavigation);
        return () => window.removeEventListener('navigate-to-view', handleNavigation);
    }, []);

    // Global Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsCommandPaletteOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

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

    const handleNavigateHome = () => {
        setCurrentView('explore');
        setExploreKey(prev => prev + 1);
    };

    const BrandLogo = () => (
        <div
            onClick={handleNavigateHome}
            className="flex items-center gap-3 select-none group cursor-pointer active:scale-95 transition-transform"
        >
            <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-aurora-pink to-aurora-magenta rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative w-10 h-10 bg-white dark:bg-midnight-900 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-xl overflow-hidden">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-500">
                        <path d="M12 2.5L3.5 7.5V17.5L12 22.5L20.5 17.5V7.5L12 2.5Z" className="fill-slate-900 dark:fill-midnight-950" />
                        <path d="M12 2.5L3.5 7.5L12 12.5L20.5 7.5L12 2.5Z" className="fill-yellow-400 dark:fill-yellow-500" />
                        <path d="M3.5 7.5V17.5L12 22.5L12 12.5L3.5 7.5Z" className="fill-aurora-pink dark:fill-pink-500" />
                        <path d="M20.5 7.5V17.5L12 22.5L12 12.5L20.5 7.5Z" className="fill-blue-500 dark:fill-blue-600" />
                        <path d="M12 12.5V22.5" className="stroke-white/10 dark:stroke-black/20" strokeWidth="0.5" />
                    </svg>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <span className="font-bold text-slate-900 dark:text-white tracking-tight text-base leading-none">CONTRARIAN</span>
                <span className="text-[10px] font-medium text-slate-500 tracking-[0.3em] leading-none mt-1.5 group-hover:text-blue-600 dark:group-hover:text-aurora-peach transition-colors">HUB</span>
            </div>
        </div>
    );
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-midnight-950 text-slate-900 dark:text-slate-200 flex font-sans transition-colors duration-300 relative overflow-hidden">
            <NoiseOverlay />

            {/* Ambient Background Gradient for Dark Mode (Aurora) */}
            <div className="fixed inset-0 w-full h-full pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-1000 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-aurora-magenta/10 blur-[120px] rounded-full mix-blend-screen transform-gpu"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-aurora-teal/10 blur-[100px] rounded-full mix-blend-screen transform-gpu"></div>
                <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-aurora-purple/10 blur-[100px] rounded-full mix-blend-screen transform-gpu"></div>
            </div>

            {/* Command Palette */}
            <CommandPalette
                isOpen={isCommandPaletteOpen}
                onClose={() => setIsCommandPaletteOpen(false)}
                onNavigate={(view) => setCurrentView(view as View)}
            />

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 dark:border-white/5 bg-white/80 dark:bg-midnight-950/50 backdrop-blur-xl fixed h-full z-20 transition-colors duration-300">
                <div className="p-8 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                    <BrandLogo />
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2">
                    <button
                        onClick={() => setIsCommandPaletteOpen(true)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 mb-6 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all group"
                    >
                        <Search className="w-4 h-4" />
                        <span className="text-sm font-medium flex-1 text-left">Search...</span>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/10 bg-white dark:bg-midnight-900">
                            <Command className="w-3 h-3" />
                            <span className="text-[10px] font-bold">K</span>
                        </div>
                    </button>

                    <button
                        onClick={handleNavigateHome}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${currentView === 'explore' ? 'bg-slate-100 dark:bg-white/10 text-blue-600 dark:text-white shadow-sm dark:shadow-inner border border-slate-200 dark:border-white/5' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}`}
                    >
                        <Compass className={`w-5 h-5 ${currentView === 'explore' ? 'text-blue-600 dark:text-aurora-peach' : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-aurora-peach'} transition-colors`} />
                        <span className="font-medium tracking-wide text-sm">Explore Protocols</span>
                    </button>
                    <button
                        onClick={() => setCurrentView('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${currentView === 'dashboard' ? 'bg-slate-100 dark:bg-white/10 text-blue-600 dark:text-white shadow-sm dark:shadow-inner border border-slate-200 dark:border-white/5' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}`}
                    >
                        <Activity className={`w-5 h-5 ${currentView === 'dashboard' ? 'text-blue-600 dark:text-aurora-peach' : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-aurora-peach'} transition-colors`} />
                        <span className="font-medium tracking-wide text-sm">My Experiments</span>
                    </button>
                    <button
                        onClick={() => setCurrentView('community')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${currentView === 'community' ? 'bg-slate-100 dark:bg-white/10 text-blue-600 dark:text-white shadow-sm dark:shadow-inner border border-slate-200 dark:border-white/5' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}`}
                    >
                        <Users className={`w-5 h-5 ${currentView === 'community' ? 'text-blue-600 dark:text-aurora-peach' : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-aurora-peach'} transition-colors`} />
                        <span className="font-medium tracking-wide text-sm">Community</span>
                    </button>
                    <button
                        onClick={() => setCurrentView('blog')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${currentView === 'blog' ? 'bg-slate-100 dark:bg-white/10 text-blue-600 dark:text-white shadow-sm dark:shadow-inner border border-slate-200 dark:border-white/5' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}`}
                    >
                        <BookOpen className={`w-5 h-5 ${currentView === 'blog' ? 'text-blue-600 dark:text-aurora-peach' : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-aurora-peach'} transition-colors`} />
                        <span className="font-medium tracking-wide text-sm">Blog</span>
                    </button>
                    <button
                        onClick={() => setCurrentView('resources')}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${currentView === 'resources' ? 'bg-slate-100 dark:bg-white/10 text-blue-600 dark:text-white shadow-sm dark:shadow-inner border border-slate-200 dark:border-white/5' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}`}
                    >
                        <Library className={`w-5 h-5 ${currentView === 'resources' ? 'text-blue-600 dark:text-aurora-peach' : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-aurora-peach'} transition-colors`} />
                        <span className="font-medium tracking-wide text-sm">Resources</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-white/5 space-y-4">
                    <button
                        onClick={() => setCurrentView('lab')}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-aurora-pink to-aurora-magenta hover:from-aurora-peach hover:to-aurora-pink text-white py-3.5 rounded-xl transition-all shadow-lg shadow-aurora-magenta/20 hover:shadow-aurora-magenta/40 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <Sparkles className="w-4 h-4 relative z-10" />
                        <span className="font-semibold text-sm relative z-10">The Lab (AI)</span>
                    </button>

                    <div className="flex items-center gap-3 px-2 pb-2">
                        <div className="relative">
                            <img src={user.avatar} alt="User" className="w-9 h-9 rounded-full ring-2 ring-slate-200 dark:ring-white/10" />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-aurora-teal rounded-full border-2 border-white dark:border-midnight-950"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.name}</p>
                            <p className="text-[10px] uppercase tracking-wider text-slate-500">Lvl {user.level} Contrarian</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Header - Minimal */}
            <div className="md:hidden fixed top-0 left-0 w-full z-30 bg-white/80 dark:bg-midnight-950/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-4 py-3 flex items-center justify-between">
                <BrandLogo />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-72 p-0 md:p-0 w-full relative bg-slate-50 dark:bg-transparent transition-colors duration-300 z-10">
                {/* Dynamic Content */}
                <div className="animate-fade-in-up min-h-screen pt-16 md:pt-0 pb-24 md:pb-0">
                    {currentView === 'explore' && <ProtocolExplorer key={exploreKey} protocols={protocols} onSelectProtocol={(p) => {
                        // Handle selection
                        console.log('Selected:', p);
                    }} />}
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
                        {currentView === 'resources' && <ResourcesPage resources={resources} />}
                        {currentView === 'admin' && (
                            <AdminDashboard
                                protocols={protocols}
                                resources={resources}
                                onUpdateProtocol={handleUpdateProtocol}
                                onAddProtocol={handleAddProtocol}
                                onDeleteProtocol={handleDeleteProtocol}
                                onUpdateResource={handleUpdateResource}
                                onAddResource={handleAddResource}
                                onDeleteResource={handleDeleteResource}
                                onBack={() => setCurrentView('explore')}
                            />
                        )}
                        {currentView === 'lab' && <AILab />}
                    </div>
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <BottomNav
                currentView={currentView}
                onNavigate={(view) => {
                    if (view === 'explore') {
                        handleNavigateHome();
                    } else {
                        setCurrentView(view);
                    }
                }}
                onOpenAI={() => setCurrentView('lab')}
            />

            {/* Floating Action Button for The Lab */}
            <button
                onClick={() => setCurrentView('lab')}
                className="fixed bottom-24 md:bottom-8 right-6 md:right-8 w-16 h-16 bg-gradient-to-tr from-aurora-pink to-aurora-magenta rounded-full flex items-center justify-center shadow-lg shadow-aurora-magenta/30 hover:scale-110 hover:shadow-aurora-magenta/50 transition-all z-50 group"
            >
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </button>

            {/* AI Modal Overlay */}
            {isAIGeneratorOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-midnight-950/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-midnight-900/90 border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-lg p-8 shadow-2xl shadow-black/50 relative backdrop-blur-xl">
                        <button
                            onClick={() => setIsAIGeneratorOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-8 text-center">
                            <div className="w-14 h-14 bg-aurora-magenta/10 rounded-2xl flex items-center justify-center mb-5 mx-auto border border-aurora-magenta/20 shadow-[0_0_15px_rgba(181,131,141,0.1)]">
                                <Sparkles className="w-6 h-6 text-blue-600 dark:text-aurora-peach" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Design Your Protocol</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Leverage Gemini AI to build a data-driven optimization stack tailored to your physiology.</p>
                        </div>

                        <form onSubmit={handleGenerateProtocol} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-300 uppercase tracking-wider">Primary Objective</label>
                                <input
                                    type="text"
                                    value={aiGoal}
                                    onChange={(e) => setAiGoal(e.target.value)}
                                    placeholder="e.g. Increase deep sleep, Learn Python"
                                    className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-1 focus:ring-aurora-magenta focus:border-aurora-magenta/50 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-300 uppercase tracking-wider">Daily Availability</label>
                                <input
                                    type="text"
                                    value={aiTime}
                                    onChange={(e) => setAiTime(e.target.value)}
                                    placeholder="e.g. 30 mins morning"
                                    className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-1 focus:ring-aurora-magenta focus:border-aurora-magenta/50 outline-none transition-all"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isGenerating}
                                    className={`w-full py-4 rounded-xl font-semibold text-sm tracking-wide text-white transition-all ${isGenerating ? 'bg-slate-800 cursor-not-allowed' : 'bg-gradient-to-r from-aurora-pink to-aurora-magenta hover:from-aurora-peach hover:to-aurora-pink shadow-lg shadow-aurora-magenta/20 hover:shadow-aurora-magenta/40 hover:-translate-y-0.5'}`}
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

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}