import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Terminal, Cpu, Zap, Activity, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AILab = () => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStep, setGenerationStep] = useState(0);
    const [result, setResult] = useState<null | any>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    const GENERATION_STEPS = [
        "Analyzing biometric baseline...",
        "Scanning protocol database (14,000+ entries)...",
        "Optimizing for circadian rhythm alignment...",
        "Checking contraindications...",
        "Finalizing protocol parameters..."
    ];

    const handleGenerate = () => {
        if (!prompt) return;
        setIsGenerating(true);
        setGenerationStep(0);
        setResult(null);

        // Simulate AI thinking process
        let step = 0;
        const interval = setInterval(() => {
            step++;
            setGenerationStep(step);
            if (step >= GENERATION_STEPS.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsGenerating(false);
                    setResult({
                        title: "Hyper-Recovery Protocol v4.2",
                        focus: "Deep Sleep & CNS Repair",
                        duration: "14 Days",
                        confidence: "94.8%",
                        steps: [
                            { time: "07:00 AM", action: "Morning sunlight exposure (10-15 mins)", type: "circadian" },
                            { time: "02:00 PM", action: "NSDR / Yoga Nidra (20 mins)", type: "recovery" },
                            { time: "07:30 PM", action: "Magnesium Threonate (144mg) + Glycine (2g)", type: "supplement" },
                            { time: "09:00 PM", action: "Hot Sauna (20 mins) -> Cold Shower (2 mins)", type: "thermal" }
                        ],
                        warnings: ["Avoid caffeine after 11:00 AM", "Monitor HRV daily"]
                    });
                }, 800);
            }
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-mono p-6 md:p-12 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl border border-blue-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <Cpu className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">The Lab <span className="text-blue-500 text-sm font-normal px-2 py-0.5 bg-blue-500/10 rounded border border-blue-500/20 ml-2">BETA</span></h1>
                        <p className="text-slate-400">AI-Powered Protocol Generator</p>
                    </div>
                </div>

                {/* Input Area */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-1 shadow-2xl mb-8">
                    <div className="relative">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe your goal (e.g., 'Maximize deep sleep after heavy lifting' or 'Cognitive stack for 12h coding sprint')..."
                            className="w-full bg-slate-900/50 text-white p-6 rounded-xl border border-transparent focus:border-blue-500/50 focus:bg-slate-900 focus:outline-none transition-all resize-none h-32 placeholder:text-slate-600"
                        />
                        <div className="absolute bottom-4 right-4 flex items-center gap-2">
                            <span className="text-xs text-slate-600">{prompt.length}/500</span>
                            <button
                                onClick={handleGenerate}
                                disabled={!prompt || isGenerating}
                                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${!prompt || isGenerating
                                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                                    }`}
                            >
                                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                {isGenerating ? 'Processing...' : 'Generate Protocol'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Output Area */}
                <AnimatePresence mode="wait">
                    {isGenerating && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-black/60 border border-blue-500/20 rounded-2xl p-8 font-mono text-sm"
                        >
                            <div className="flex items-center gap-3 mb-6 text-blue-400">
                                <Terminal className="w-4 h-4" />
                                <span className="uppercase tracking-widest text-xs">System Log</span>
                            </div>
                            <div className="space-y-3">
                                {GENERATION_STEPS.map((step, idx) => (
                                    <div key={idx} className={`flex items-center gap-3 transition-opacity duration-300 ${idx > generationStep ? 'opacity-0' : idx === generationStep ? 'text-blue-400' : 'text-slate-500'}`}>
                                        {idx < generationStep ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : idx === generationStep ? <Loader2 className="w-4 h-4 animate-spin" /> : <div className="w-4 h-4" />}
                                        <span>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {result && !isGenerating && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            {/* Result Card */}
                            <div className="bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                                {/* Result Header */}
                                <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-2">{result.title}</h2>
                                            <div className="flex items-center gap-3 text-sm">
                                                <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{result.focus}</span>
                                                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 border border-white/5">{result.duration}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Confidence</div>
                                            <div className="text-2xl font-bold text-emerald-400">{result.confidence}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Protocol Steps */}
                                <div className="p-8">
                                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-6">Daily Routine</h3>
                                    <div className="space-y-6 relative">
                                        {/* Connecting Line */}
                                        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-800"></div>

                                        {result.steps.map((step: any, idx: number) => (
                                            <div key={idx} className="relative flex items-start gap-6 group">
                                                <div className={`w-10 h-10 rounded-full border-4 border-slate-950 flex items-center justify-center shrink-0 z-10 ${step.type === 'circadian' ? 'bg-orange-500/20 text-orange-400' :
                                                        step.type === 'recovery' ? 'bg-blue-500/20 text-blue-400' :
                                                            step.type === 'supplement' ? 'bg-purple-500/20 text-purple-400' :
                                                                'bg-emerald-500/20 text-emerald-400'
                                                    }`}>
                                                    <Activity className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1 pt-2">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-white font-medium">{step.action}</span>
                                                        <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-white/5">{step.time}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-500">Optimized for peak bioavailability.</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Warnings/Footer */}
                                <div className="bg-red-500/5 border-t border-red-500/10 p-6 flex items-start gap-4">
                                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-red-400 font-medium text-sm mb-1">Contraindications & Warnings</h4>
                                        <ul className="list-disc list-inside text-xs text-red-400/70 space-y-1">
                                            {result.warnings.map((w: string, i: number) => (
                                                <li key={i}>{w}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-4">
                                <button className="px-6 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">
                                    Refine Results
                                </button>
                                <button className="px-6 py-3 rounded-xl bg-white text-black hover:bg-slate-200 transition-colors text-sm font-bold flex items-center gap-2">
                                    Save to Dashboard <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
