import React from 'react';
import { Experiment, User } from '../types';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Flame, Award, MapPin } from 'lucide-react';

interface UserDashboardProps {
  user: User;
  experiments: Experiment[];
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, experiments }) => {
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-full text-orange-500 border border-orange-500/20">
                <Flame className="w-6 h-6" />
            </div>
            <div>
                <div className="text-sm text-slate-400">Current Streak</div>
                <div className="text-2xl font-bold text-white">{user.streak} Days</div>
            </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-full text-blue-500 border border-blue-500/20">
                <Award className="w-6 h-6" />
            </div>
            <div>
                <div className="text-sm text-slate-400">Contrarian Level</div>
                <div className="text-2xl font-bold text-white">Lvl {user.level}</div>
            </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4 md:col-span-2">
            <div className="p-3 bg-indigo-500/10 rounded-full text-indigo-500 border border-indigo-500/20">
                <MapPin className="w-6 h-6" />
            </div>
            <div>
                <div className="text-sm text-slate-400">Local Chapter</div>
                <div className="text-lg font-bold text-white">{user.location} Contrarians</div>
                <div className="text-xs text-blue-400">Next Meetup: Tomorrow, 7 PM</div>
            </div>
        </div>
      </div>

      {/* Active Experiments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Active Experiments
            </h3>
            
            {experiments.map(exp => (
                <div key={exp.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h4 className="text-lg font-semibold text-white">{exp.protocolTitle}</h4>
                            <p className="text-sm text-slate-400">Day {exp.day} of {exp.totalDays}</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-900/30 text-blue-400 border border-blue-800/50 text-xs rounded font-mono uppercase">
                            {exp.status}
                        </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-2 mb-6">
                        <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
                            style={{ width: `${(exp.day / exp.totalDays) * 100}%` }}
                        ></div>
                    </div>

                    {/* Mini Chart */}
                    <div className="h-32 w-full">
                        <p className="text-xs text-slate-500 mb-2">Subjective Performance Score</p>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={exp.moodLogs}>
                                <Line 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke="#3b82f6" 
                                    strokeWidth={2} 
                                    dot={{r: 3, fill: '#0f172a', stroke: '#3b82f6', strokeWidth: 2}} 
                                    activeDot={{r: 5, fill: '#60a5fa'}}
                                />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', color: '#fff' }}
                                    itemStyle={{ color: '#60a5fa' }}
                                    labelStyle={{ display: 'none' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm py-2 rounded-lg transition-colors border border-slate-700 hover:border-slate-600">
                            Log Journal
                        </button>
                        <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm py-2 rounded-lg transition-colors border border-slate-700 hover:border-slate-600">
                            Share Update
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Sidebar Widget - Suggested */}
        <div className="space-y-6">
             <h3 className="text-xl font-bold text-white">Analysis</h3>
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <p className="text-slate-300 text-sm leading-relaxed">
                    <span className="text-blue-400 font-bold">Insight:</span> Your cognitive performance scores tend to peak when you combine the <span className="text-white">Zone 2 Cardio</span> protocol with <span className="text-white">Monk Mode</span>. Consider stacking these habits on Tuesdays and Thursdays.
                </p>
             </div>

             <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/30 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                <h4 className="text-white font-bold mb-2 relative z-10">Premium Analytics</h4>
                <p className="text-slate-400 text-xs mb-4 relative z-10">Connect your Oura Ring or Apple Health to correlate biometrics with your protocols.</p>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-900/20 relative z-10">
                    Connect Device
                </button>
             </div>
        </div>
      </div>
    </div>
  );
};