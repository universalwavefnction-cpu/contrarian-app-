import React, { useState } from 'react';
import { Protocol, Category, Difficulty } from '../types';
import { SAMPLE_PROTOCOLS } from '../constants';
import { Users, CheckCircle, Clock, Zap, ArrowLeft, Dumbbell, Apple, Briefcase, Cpu, Brain, Leaf } from 'lucide-react';

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
        color: 'text-white',
        bgIcon: 'bg-slate-800'
    },
    {
        id: 'cat-nutrition',
        category: Category.Nutrition,
        label: 'Nutrition',
        description: 'Explore experimental diets and eating patterns beyond the mainstream.',
        members: 519,
        icon: Apple,
        color: 'text-white',
        bgIcon: 'bg-slate-800'
    },
    {
        id: 'cat-productivity',
        category: Category.Productivity,
        label: 'Productivity',
        description: 'Find focus and effectiveness with anti-hustle systems and methods.',
        members: 241,
        icon: Briefcase,
        color: 'text-white',
        bgIcon: 'bg-slate-800'
    },
    {
        id: 'cat-biohacking',
        category: Category.Biohacking,
        label: 'Biohacking',
        description: 'Data-driven interventions to optimize your biology for longevity.',
        members: 892,
        icon: Cpu,
        color: 'text-white',
        bgIcon: 'bg-slate-800'
    },
    {
        id: 'cat-wellness',
        category: Category.Wellness,
        label: 'Wellness',
        description: 'Holistic approaches to mental and physical well-being.',
        members: 420,
        icon: Leaf,
        color: 'text-white',
        bgIcon: 'bg-slate-800'
    },
    {
        id: 'cat-philosophy',
        category: Category.Philosophy,
        label: 'Philosophy',
        description: 'Ancient wisdom applied to modern problem solving.',
        members: 156,
        icon: Brain,
        color: 'text-white',
        bgIcon: 'bg-slate-800'
    }
];

export const ProtocolExplorer: React.FC<ProtocolExplorerProps> = ({ onSelectProtocol }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredProtocols = SAMPLE_PROTOCOLS.filter(p => 
    selectedCategory ? p.category === selectedCategory : true
  );

  if (selectedCategory) {
      return (
        <div className="p-6 md:p-10 animate-fade-in">
            <button 
                onClick={() => setSelectedCategory(null)}
                className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Hub
            </button>
            
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-white mb-2">{selectedCategory} Protocols</h2>
                <p className="text-slate-400">Community verified experiments for this domain.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProtocols.length > 0 ? filteredProtocols.map(protocol => (
                <div 
                    key={protocol.id}
                    onClick={() => onSelectProtocol(protocol)}
                    className="group bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Zap className="text-blue-500 w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <span className={`text-xs font-mono px-2 py-1 rounded-md uppercase tracking-wider ${
                            protocol.difficulty === Difficulty.Extreme ? 'bg-red-900/30 text-red-400' :
                            protocol.difficulty === Difficulty.Hard ? 'bg-orange-900/30 text-orange-400' :
                            'bg-blue-900/30 text-blue-400'
                        }`}>
                            {protocol.difficulty}
                        </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {protocol.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-6 h-10">
                    {protocol.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-800 pt-4">
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{protocol.durationDays}d</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{(protocol.participantCount / 1000).toFixed(1)}k</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-500">
                            <CheckCircle className="w-4 h-4" />
                            <span>{protocol.successRate}%</span>
                        </div>
                    </div>
                </div>
                )) : (
                    <div className="col-span-full text-center py-20 border border-dashed border-slate-800 rounded-xl">
                        <p className="text-slate-500">No protocols found in this category yet.</p>
                        <button className="mt-4 text-blue-500 hover:underline">Submit an experiment</button>
                    </div>
                )}
            </div>
        </div>
      );
  }

  return (
    <div className="w-full animate-fade-in">
      {/* Hero Section */}
      <div className="bg-slate-950 py-20 md:py-28 text-center px-4 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-tight">
                Your mileage <span className="text-blue-500">will</span> vary.
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                A community for personal experimentation. No gurus. No universal answers. Just honest experiences. Pick a topic to explore protocols.
            </p>
        </div>
      </div>

      {/* Connect Section */}
      <div className="border-y border-slate-800 bg-slate-900/30 py-16">
         <div className="max-w-3xl mx-auto text-center px-6 space-y-6">
             <h2 className="text-2xl md:text-3xl font-bold text-white">Connect with Fellow Experimenters</h2>
             <p className="text-slate-400">Join virtual and in-person events to share insights, ask questions, and find your tribe.</p>
             <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20 hover:scale-105">
                 Explore Meetups
             </button>
         </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {CATEGORY_CARDS.map((card) => {
               const Icon = card.icon;
               return (
                   <div 
                        key={card.id}
                        onClick={() => setSelectedCategory(card.category)}
                        className="group bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:bg-slate-800 hover:border-slate-700 transition-all cursor-pointer flex flex-col h-full"
                   >
                        <div className="mb-6">
                            <Icon className={`w-10 h-10 ${card.color}`} strokeWidth={1.5} />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3">{card.label}</h3>
                        <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                            {card.description}
                        </p>

                        <div className="mt-auto pt-6 border-t border-slate-800/50 flex items-center justify-between">
                             <span className="text-sm text-slate-500 font-mono">
                                {card.members} members experimenting
                             </span>
                        </div>
                   </div>
               );
           })}
        </div>
      </div>
    </div>
  );
};