import React, { useState } from 'react';
import { Protocol, Category, Difficulty } from '../types';
import { Save, Plus, Trash2, Image as ImageIcon, X, ChevronLeft, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminDashboardProps {
    protocols: Protocol[];
    onUpdateProtocol: (protocol: Protocol) => void;
    onAddProtocol: (protocol: Protocol) => void;
    onDeleteProtocol: (id: string) => void;
    onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
    protocols,
    onUpdateProtocol,
    onAddProtocol,
    onDeleteProtocol,
    onBack
}) => {
    const [selectedProtocolId, setSelectedProtocolId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<Protocol>>({
        title: '',
        description: '',
        category: Category.Biohacking,
        difficulty: Difficulty.Medium,
        durationDays: 30,
        steps: [''],
        tags: []
    });

    const selectedProtocol = protocols.find(p => p.id === selectedProtocolId);

    const handleSelectProtocol = (protocol: Protocol) => {
        setSelectedProtocolId(protocol.id);
        setFormData(protocol);
        setIsEditing(true);
    };

    const handleCreateNew = () => {
        const newProto: Protocol = {
            id: `p${Date.now()}`,
            title: 'New Protocol',
            description: '',
            category: Category.Biohacking,
            difficulty: Difficulty.Medium,
            durationDays: 30,
            participantCount: 0,
            successRate: 0,
            tags: [],
            author: 'Admin',
            verified: true,
            steps: ['']
        };
        onAddProtocol(newProto);
        handleSelectProtocol(newProto);
    };

    const handleSave = () => {
        if (selectedProtocolId && formData) {
            onUpdateProtocol(formData as Protocol);
            // Show success feedback?
        }
    };

    const handleDelete = () => {
        if (selectedProtocolId) {
            onDeleteProtocol(selectedProtocolId);
            setSelectedProtocolId(null);
            setIsEditing(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, upload to server. Here, create local URL.
            const url = URL.createObjectURL(file);
            // We don't have an image field in Protocol type yet, but let's assume we might or just log it
            // For now, let's just pretend.
            alert("Image selected! In a real app, this would upload to the cloud.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-midnight-950 text-slate-900 dark:text-white flex">
            {/* Sidebar List */}
            <div className="w-80 border-r border-slate-200 dark:border-white/10 flex flex-col bg-white dark:bg-slate-900/50 backdrop-blur-xl">
                <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <h2 className="font-bold text-lg">Protocols</h2>
                    <button onClick={handleCreateNew} className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {protocols.map(p => (
                        <div
                            key={p.id}
                            onClick={() => handleSelectProtocol(p)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedProtocolId === p.id ? 'bg-blue-50 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30' : 'hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'}`}
                        >
                            <div className="font-medium text-sm truncate">{p.title}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{p.category}</div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-white/10">
                    <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                        Back to App
                    </button>
                </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {selectedProtocolId ? (
                    <>
                        {/* Toolbar */}
                        <div className="h-16 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-8 bg-white dark:bg-slate-900/50 backdrop-blur-xl">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-mono text-slate-400">ID: {selectedProtocolId}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${formData.verified ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                    {formData.verified ? 'Verified' : 'Draft'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={handleDelete} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium">
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="max-w-3xl mx-auto space-y-8 pb-20">
                                {/* Title & Description */}
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-transparent text-4xl font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:outline-none"
                                        placeholder="Protocol Title"
                                    />
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-transparent text-lg text-slate-600 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:outline-none resize-none"
                                        placeholder="Short description..."
                                        rows={2}
                                    />
                                </div>

                                {/* Image Upload Placeholder */}
                                <div className="aspect-video rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors cursor-pointer relative group">
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} accept="image/*" />
                                    <div className="p-4 rounded-full bg-slate-100 dark:bg-white/5 group-hover:scale-110 transition-transform">
                                        <ImageIcon className="w-8 h-8" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-medium text-slate-900 dark:text-white">Drop cover image here</p>
                                        <p className="text-sm">or click to browse</p>
                                    </div>
                                </div>

                                {/* Metadata Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-500">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                                            className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                        >
                                            {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-500">Difficulty</label>
                                        <select
                                            value={formData.difficulty}
                                            onChange={e => setFormData({ ...formData, difficulty: e.target.value as Difficulty })}
                                            className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                        >
                                            {Object.values(Difficulty).map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-500">Duration (Days)</label>
                                        <input
                                            type="number"
                                            value={formData.durationDays}
                                            onChange={e => setFormData({ ...formData, durationDays: parseInt(e.target.value) })}
                                            className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-500">Author</label>
                                        <input
                                            type="text"
                                            value={formData.author}
                                            onChange={e => setFormData({ ...formData, author: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Steps */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-slate-500">Protocol Steps</label>
                                        <button
                                            onClick={() => setFormData({ ...formData, steps: [...(formData.steps || []), ''] })}
                                            className="text-sm text-blue-500 font-medium hover:underline"
                                        >
                                            + Add Step
                                        </button>
                                    </div>
                                    {formData.steps?.map((step, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <span className="py-3 text-slate-400 font-mono text-sm">{idx + 1}.</span>
                                            <input
                                                type="text"
                                                value={step}
                                                onChange={e => {
                                                    const newSteps = [...(formData.steps || [])];
                                                    newSteps[idx] = e.target.value;
                                                    setFormData({ ...formData, steps: newSteps });
                                                }}
                                                className="flex-1 p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                                placeholder={`Step ${idx + 1}`}
                                            />
                                            <button
                                                onClick={() => {
                                                    const newSteps = [...(formData.steps || [])];
                                                    newSteps.splice(idx, 1);
                                                    setFormData({ ...formData, steps: newSteps });
                                                }}
                                                className="p-3 text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
                            <Upload className="w-8 h-8" />
                        </div>
                        <p className="font-medium">Select a protocol to edit</p>
                        <p className="text-sm">or create a new one</p>
                    </div>
                )}
            </div>
        </div>
    );
};
