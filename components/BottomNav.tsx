import React from 'react';
import { Compass, Activity, Users, BookOpen, Library, Sparkles } from 'lucide-react';

type View = 'explore' | 'dashboard' | 'community' | 'blog' | 'resources';

interface BottomNavProps {
    currentView: View;
    onNavigate: (view: View) => void;
    onOpenAI: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate, onOpenAI }) => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full z-50 pb-safe-area-bottom bg-white/90 dark:bg-midnight-950/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-around px-2 py-3">
                <button
                    onClick={() => onNavigate('explore')}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${currentView === 'explore' ? 'text-blue-600 dark:text-aurora-peach' : 'text-slate-400 dark:text-slate-500'}`}
                >
                    <Compass className="w-6 h-6" strokeWidth={currentView === 'explore' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">Explore</span>
                </button>

                <button
                    onClick={() => onNavigate('dashboard')}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${currentView === 'dashboard' ? 'text-blue-600 dark:text-aurora-peach' : 'text-slate-400 dark:text-slate-500'}`}
                >
                    <Activity className="w-6 h-6" strokeWidth={currentView === 'dashboard' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">My Data</span>
                </button>

                <div className="relative -top-5">
                    <button
                        onClick={onOpenAI}
                        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-aurora-pink to-aurora-magenta text-white shadow-lg shadow-aurora-magenta/30 hover:scale-105 transition-transform"
                    >
                        <Sparkles className="w-6 h-6" />
                    </button>
                </div>

                <button
                    onClick={() => onNavigate('community')}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${currentView === 'community' ? 'text-blue-600 dark:text-aurora-peach' : 'text-slate-400 dark:text-slate-500'}`}
                >
                    <Users className="w-6 h-6" strokeWidth={currentView === 'community' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">Tribe</span>
                </button>

                <button
                    onClick={() => onNavigate('resources')}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${currentView === 'resources' ? 'text-blue-600 dark:text-aurora-peach' : 'text-slate-400 dark:text-slate-500'}`}
                >
                    <Library className="w-6 h-6" strokeWidth={currentView === 'resources' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">Library</span>
                </button>
            </div>
        </div>
    );
};
