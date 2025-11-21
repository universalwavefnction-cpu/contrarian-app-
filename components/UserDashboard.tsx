import React from 'react';
import { Experiment, User } from '../types';
import { LineChart, Line, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Activity, Flame, Award, MapPin, ArrowUpRight } from 'lucide-react';

interface UserDashboardProps {
  user: User;
  experiments: Experiment[];
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, experiments }) => {
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-black/20 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-32 group hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start">
                <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Current Streak</div>
                <Flame className="w-5 h-5 text-orange-500 opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-4xl font-light text-white">{user.streak} <span className="text-lg text-slate-600">Days</span></div>
        </div>
        
        <div className="bg-black/20 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-32 group hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start">
                <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Contrarian Level</div>
                <Award className="w-5 h-5 text-blue-500 opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-4xl font-light text-white">{user.level} <span className="text-lg text-slate-600">Lvl</span></div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/10 to-indigo-900/10 backdrop-blur-md border border-blue-500/10 p-6 rounded-2xl md:col-span-2 h-32 flex items-center justify-between relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Local Chapter</span>
                </div>
                <div className="text-2xl font-medium text-white mb-1">{user.location}</div>
                <div className="text-sm text-blue-400/80 font-mono">Next Meetup: Tomorrow, 7 PM</div>
            </div>
            <button className="bg-white/5 hover:bg-white/10 border border-white/5 text-white p-3 rounded-full transition-all group-hover:scale-105">
                <ArrowUpRight className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Active Experiments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-white flex items-center gap-3">
                    <Activity className="w-5 h-5 text-blue-500" />
                    Active Experiments
                </h3>
            </div>
            
            {experiments.map(exp => (
                <div key={exp.id} className="bg-black/20 backdrop-blur-md border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h4 className="text-2xl font-light text-white mb-1">{exp.protocolTitle}</h4>
                            <p className="text-sm text-slate-500 font-mono">Day {exp.day} <span className="text-slate-700">/</span> {exp.totalDays}</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] rounded-full font-bold uppercase tracking-widest">
                            {exp.status}
                        </span>
                    </div>
                    
                    {/* Custom Progress Bar */}
                    <div className="w-full bg-slate-800/30 rounded-full h-1 mb-10 overflow-hidden">
                        <div 
                            className="bg-gradient-to-r from-blue-600 to-indigo-500 h-1 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] relative" 
                            style={{ width: `${(exp.day / exp.totalDays) * 100}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                        </div>
                    </div>

                    {/* Enhanced Chart */}
                    <div className="h-48 w-full mb-6">
                        <div className="flex items-center justify-between mb-4">
                             <p className="text-[10px] uppercase tracking-widest text-slate-500">Subjective Performance Score</p>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={exp.moodLogs}>
                                <defs>
                                    <linearGradient id={`gradient-${exp.id}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="date" hide />
                                <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                                    itemStyle={{ color: '#60a5fa' }}
                                    labelStyle={{ display: 'none' }}
                                    cursor={{ stroke: '#334155', strokeWidth: 1 }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke="#3b82f6" 
                                    strokeWidth={2} 
                                    fillOpacity={1} 
                                    fill={`url(#gradient-${exp.id})`} 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm py-3 rounded-xl transition-all border border-white/5 hover:border-white/10 font-medium">
                            Log Journal
                        </button>
                        <button className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm py-3 rounded-xl transition-all border border-white/5 hover:border-white/10 font-medium">
                            Share Update
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Sidebar Widget - Suggested */}
        <div className="space-y-8">
             <div>
                <h3 className="text-lg font-medium text-white mb-4">AI Analysis</h3>
                <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                        <span className="text-blue-400 font-medium">Insight:</span> Your cognitive performance scores tend to peak when you combine the <span className="text-white font-medium">Zone 2 Cardio</span> protocol with <span className="text-white font-medium">Monk Mode</span>. Consider stacking these habits on Tuesdays and Thursdays.
                    </p>
                </div>
             </div>

             <div className="bg-gradient-to-b from-blue-950/30 to-slate-950/30 border border-blue-500/20 rounded-2xl p-8 relative overflow-hidden text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -mt-20 pointer-events-none"></div>
                <h4 className="text-white font-medium text-lg mb-2 relative z-10">Premium Analytics</h4>
                <p className="text-slate-400 text-xs mb-6 relative z-10 font-light">Connect your Oura Ring or Apple Health to correlate biometrics with your protocols.</p>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-900/20 relative z-10 hover:shadow-blue-900/40">
                    Connect Device
                </button>
             </div>
        </div>
      </div>
    </div>
  );
};