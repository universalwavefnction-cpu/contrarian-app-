import React, { useState } from 'react';
import { Layout, Compass, Activity, Users, PlusCircle, Menu, X, Sparkles, BrainCircuit, Search } from 'lucide-react';
import { Protocol, Experiment } from './types';
import { CURRENT_USER, SAMPLE_PROTOCOLS, USER_EXPERIMENTS } from './constants';
import { ProtocolExplorer } from './components/ProtocolExplorer';
import { UserDashboard } from './components/UserDashboard';
import { CommunityHub } from './components/CommunityHub';
import { generateCustomProtocol } from './services/geminiService';

type View = 'explore' | 'dashboard' | 'community';

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
      // In a real app, we'd probably show a preview first. 
      // Here we auto-add it to a list or show an alert.
      alert(`Generated Protocol: ${newProtocol.title}\n\n${newProtocol.description}`);
      setIsAIGeneratorOpen(false);
      setAiGoal('');
      setAiTime('');
    } else {
      alert('Failed to generate protocol. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex font-sans selection:bg-emerald-500/30">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl fixed h-full z-20">
        <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-extrabold tracking-tighter text-white flex items-center gap-2 uppercase">
                <div className="w-2 h-8 bg-blue-600 rounded-sm"></div>
                CONTRARIAN HUB
            </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
            <button 
                onClick={() => setCurrentView('explore')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === 'explore' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
                <Compass className="w-5 h-5" />
                <span className="font-medium">Explore Protocols</span>
            </button>
            <button 
                onClick={() => setCurrentView('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === 'dashboard' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
                <Activity className="w-5 h-5" />
                <span className="font-medium">My Experiments</span>
            </button>
            <button 
                onClick={() => setCurrentView('community')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === 'community' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
            >
                <Users className="w-5 h-5" />
                <span className="font-medium">Community</span>
            </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
            <button 
                onClick={() => setIsAIGeneratorOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg border border-slate-700 transition-all"
            >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-sm">AI Protocol Gen</span>
            </button>
            
            <div className="mt-4 flex items-center gap-3 px-2">
                <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full border border-slate-700" />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-500">Lvl {user.level} Contrarian</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-30 bg-slate-950/90 backdrop-blur border-b border-slate-800 p-4 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded-sm"></div>
            <span className="font-bold text-white">CONTRARIAN HUB</span>
         </div>
         <button className="text-white">
            <Menu className="w-6 h-6" />
         </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-0 md:p-0 mt-14 md:mt-0 w-full">
        {/* Dynamic Content - adjusted padding internally in components */}
        <div className="animate-fade-in-up">
            {currentView === 'explore' && (
                <ProtocolExplorer onSelectProtocol={(p) => console.log('Selected', p)} />
            )}
            <div className="p-6 md:p-10">
                {currentView === 'dashboard' && (
                    <UserDashboard user={user} experiments={myExperiments} />
                )}
                {currentView === 'community' && (
                    <CommunityHub />
                )}
            </div>
        </div>
      </main>

      {/* AI Modal Overlay */}
      {isAIGeneratorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
                <button 
                    onClick={() => setIsAIGeneratorOpen(false)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="mb-6">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                        <Sparkles className="w-6 h-6 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Generate Protocol</h2>
                    <p className="text-slate-400 mt-1">Use Gemini AI to design a custom optimization stack.</p>
                </div>

                <form onSubmit={handleGenerateProtocol} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">What is your primary goal?</label>
                        <input 
                            type="text" 
                            value={aiGoal}
                            onChange={(e) => setAiGoal(e.target.value)}
                            placeholder="e.g. Increase deep sleep, Learn Python in 30 days"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Time commitment (daily)?</label>
                        <input 
                            type="text" 
                            value={aiTime}
                            onChange={(e) => setAiTime(e.target.value)}
                            placeholder="e.g. 30 mins morning, 1 hour evening"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={isGenerating}
                            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${isGenerating ? 'bg-slate-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
                        >
                            {isGenerating ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Activity className="w-4 h-4 animate-spin" /> Processing...
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