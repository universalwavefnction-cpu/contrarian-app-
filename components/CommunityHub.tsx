import React from 'react';
import { COMMUNITY_POSTS } from '../constants';
import { MessageSquare, Heart, Map, Share2, MoreHorizontal } from 'lucide-react';

export const CommunityHub: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
        
      {/* Main Feed */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
             <h2 className="text-2xl font-bold text-white">Global Feed</h2>
             <div className="flex gap-2">
                 <button className="text-sm text-slate-400 hover:text-white px-3 py-1 transition-colors">Hot</button>
                 <button className="text-sm text-white bg-slate-800 px-3 py-1 rounded-full">New</button>
                 <button className="text-sm text-slate-400 hover:text-white px-3 py-1 transition-colors">Top</button>
             </div>
        </div>

        {COMMUNITY_POSTS.map(post => (
            <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <img src={post.userAvatar} alt={post.userName} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                        <div>
                            <h4 className="text-white font-medium text-sm">{post.userName}</h4>
                            <span className="text-slate-500 text-xs">{post.timestamp}</span>
                        </div>
                    </div>
                    <button className="text-slate-600 hover:text-slate-400">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-slate-300 mb-4 leading-relaxed">
                    {post.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-xs text-blue-400 bg-blue-900/20 px-2 py-1 rounded border border-blue-900/30">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-6 text-slate-500 border-t border-slate-800 pt-4">
                    <button className="flex items-center gap-2 hover:text-red-500 transition-colors text-sm group">
                        <Heart className="w-4 h-4 group-hover:fill-red-500/10" /> {post.likes}
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-400 transition-colors text-sm">
                        <MessageSquare className="w-4 h-4" /> {post.comments}
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
         <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="h-40 bg-slate-800 relative flex items-center justify-center group cursor-pointer">
                 <div className="absolute inset-0 bg-[url('https://picsum.photos/400/200?grayscale')] opacity-30 bg-cover bg-center mix-blend-luminosity"></div>
                 <div className="z-10 bg-slate-950/90 backdrop-blur-sm border border-slate-700 px-4 py-2 rounded-full flex items-center gap-2 group-hover:scale-105 transition-transform shadow-xl">
                    <Map className="w-4 h-4 text-blue-500" />
                    <span className="text-white text-xs font-bold">San Francisco Chapter</span>
                 </div>
            </div>
            <div className="p-5">
                <h3 className="text-white font-bold mb-1">Nearby Contrarians</h3>
                <p className="text-slate-400 text-xs mb-4">42 active members in 5 mile radius</p>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm p-2 hover:bg-slate-800/50 rounded transition-colors">
                         <span className="text-slate-300">Biohacker Meetup</span>
                         <span className="text-blue-400 text-xs bg-blue-900/20 px-2 py-0.5 rounded">Sat, 2pm</span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-2 hover:bg-slate-800/50 rounded transition-colors">
                         <span className="text-slate-300">Code Sprint</span>
                         <span className="text-blue-400 text-xs bg-blue-900/20 px-2 py-0.5 rounded">Tue, 6pm</span>
                    </div>
                </div>
                <button className="w-full mt-4 bg-slate-800 hover:bg-blue-900/30 hover:text-blue-400 hover:border-blue-800/50 border border-transparent text-slate-300 text-sm py-2 rounded-lg transition-all">
                    Join Local Chapter
                </button>
            </div>
         </div>

         {/* Leaderboard */}
         <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="text-yellow-500">♛</span> Monthly Rankings
            </h3>
            <div className="space-y-1">
                {[1, 2, 3, 4, 5].map((rank) => (
                    <div key={rank} className="flex items-center justify-between p-2 hover:bg-slate-800/50 rounded transition-colors">
                        <div className="flex items-center gap-3">
                            <span className={`text-sm font-mono w-4 text-center ${rank === 1 ? 'text-yellow-500 font-bold' : 'text-slate-500'}`}>{rank}</span>
                            <img src={`https://picsum.photos/30/30?random=${rank + 10}`} className="w-8 h-8 rounded-full border border-slate-700" alt="User" />
                            <span className="text-slate-300 text-sm">User_{100 + rank}</span>
                        </div>
                        <span className="text-blue-500 text-xs font-bold font-mono">9{9-rank}% Imp</span>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};