import React from 'react';
import { COMMUNITY_POSTS } from '../constants';
import { MessageSquare, Heart, Map, Share2, MoreHorizontal, TrendingUp } from 'lucide-react';

export const CommunityHub: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fade-in">
        
      {/* Main Feed */}
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
             <h2 className="text-xl font-medium text-white">Global Feed</h2>
             <div className="flex bg-white/5 rounded-lg p-1">
                 <button className="text-xs font-medium text-slate-400 hover:text-white px-4 py-1.5 transition-colors rounded-md">Hot</button>
                 <button className="text-xs font-medium text-white bg-slate-800 px-4 py-1.5 rounded-md shadow-sm">New</button>
                 <button className="text-xs font-medium text-slate-400 hover:text-white px-4 py-1.5 transition-colors rounded-md">Top</button>
             </div>
        </div>

        {COMMUNITY_POSTS.map(post => (
            <div key={post.id} className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all group">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <img src={post.userAvatar} alt={post.userName} className="w-12 h-12 rounded-full object-cover border border-white/5" />
                        <div>
                            <h4 className="text-white font-medium text-sm">{post.userName}</h4>
                            <span className="text-slate-500 text-xs font-mono">{post.timestamp}</span>
                        </div>
                    </div>
                    <button className="text-slate-600 hover:text-slate-300 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed font-light">
                    {post.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-[11px] text-blue-400 bg-blue-500/5 px-2.5 py-1 rounded-md border border-blue-500/10 uppercase tracking-wide font-medium">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-8 text-slate-500 pt-6 border-t border-white/5">
                    <button className="flex items-center gap-2 hover:text-red-400 transition-colors text-sm group/btn">
                        <Heart className="w-4 h-4 group-hover/btn:fill-red-500/20 group-hover/btn:text-red-400 transition-colors" /> {post.likes}
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-400 transition-colors text-sm group/btn">
                        <MessageSquare className="w-4 h-4 group-hover/btn:text-blue-400 transition-colors" /> {post.comments}
                    </button>
                    <button className="flex items-center gap-2 hover:text-white transition-colors text-sm ml-auto">
                        <Share2 className="w-4 h-4" /> Share
                    </button>
                </div>
            </div>
        ))}
      </div>

      {/* Sidebar - Local & Leaderboard */}
      <div className="space-y-8">
         {/* Local Map Mockup */}
         <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-lg shadow-black/20">
            <div className="h-48 bg-slate-800 relative flex items-center justify-center group cursor-pointer overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://picsum.photos/400/200?grayscale')] opacity-40 bg-cover bg-center mix-blend-overlay transition-transform duration-700 group-hover:scale-110"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                 <div className="z-10 bg-black/60 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full flex items-center gap-2 group-hover:scale-105 transition-all shadow-xl">
                    <Map className="w-4 h-4 text-blue-400" />
                    <span className="text-white text-xs font-bold tracking-wide">San Francisco Chapter</span>
                 </div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="text-white font-medium">Nearby Contrarians</h3>
                        <p className="text-slate-500 text-xs mt-1">42 active members</p>
                    </div>
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border border-slate-900"></div>
                        ))}
                    </div>
                </div>
                
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-colors">
                         <span className="text-slate-300 text-xs font-medium">Biohacker Meetup</span>
                         <span className="text-blue-400 text-[10px] font-mono bg-blue-500/10 px-2 py-1 rounded">Sat, 2pm</span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-colors">
                         <span className="text-slate-300 text-xs font-medium">Code Sprint</span>
                         <span className="text-blue-400 text-[10px] font-mono bg-blue-500/10 px-2 py-1 rounded">Tue, 6pm</span>
                    </div>
                </div>
                <button className="w-full mt-6 bg-white text-slate-950 hover:bg-slate-200 font-medium text-sm py-3 rounded-xl transition-all">
                    Join Local Chapter
                </button>
            </div>
         </div>

         {/* Leaderboard */}
         <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-medium mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                <TrendingUp className="w-4 h-4 text-yellow-500" /> Monthly Rankings
            </h3>
            <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((rank) => (
                    <div key={rank} className="flex items-center justify-between p-3 bg-white/[0.02] hover:bg-white/5 border border-transparent hover:border-white/5 rounded-xl transition-all group">
                        <div className="flex items-center gap-4">
                            <span className={`text-xs font-mono w-5 text-center font-bold ${rank === 1 ? 'text-yellow-500' : rank === 2 ? 'text-slate-300' : rank === 3 ? 'text-amber-700' : 'text-slate-600'}`}>#{rank}</span>
                            <div className="flex items-center gap-3">
                                <img src={`https://picsum.photos/30/30?random=${rank + 10}`} className="w-8 h-8 rounded-full border border-white/5 group-hover:border-white/20 transition-colors" alt="User" />
                                <span className="text-slate-300 text-sm font-medium">User_{100 + rank}</span>
                            </div>
                        </div>
                        <span className="text-emerald-400 text-xs font-mono bg-emerald-500/10 px-2 py-1 rounded">9{9-rank}%</span>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};