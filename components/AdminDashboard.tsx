import React, { useState } from 'react';
import { Protocol, Category, Difficulty, Resource } from '../types';
import { Save, Plus, Trash2, Image as ImageIcon, X, ChevronLeft, Upload, BookOpen, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminDashboardProps {
    protocols: Protocol[];
    resources: Resource[];
    onUpdateProtocol: (protocol: Protocol) => void;
    onAddProtocol: (protocol: Protocol) => void;
    onDeleteProtocol: (id: string) => void;
    onUpdateResource: (resource: Resource) => void;
    onAddResource: (resource: Resource) => void;
    onDeleteResource: (id: string) => void;
    onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
    protocols,
    resources,
    onUpdateProtocol,
    onAddProtocol,
    onDeleteProtocol,
    onUpdateResource,
    onAddResource,
    onDeleteResource,
    onBack
}) => {
    const [activeTab, setActiveTab] = useState<'protocols' | 'resources'>('protocols');
    const [selectedProtocolId, setSelectedProtocolId] = useState<string | null>(null);
    const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Protocol Form State
    const [protocolFormData, setProtocolFormData] = useState<Partial<Protocol>>({
        title: '',
        description: '',
        category: Category.Biohacking,
        difficulty: Difficulty.Medium,
        durationDays: 30,
        steps: [''],
        tags: []
    });

    // Resource Form State
    const [resourceFormData, setResourceFormData] = useState<Partial<Resource>>({
        title: '',
        description: '',
        type: 'book',
        category: Category.Biohacking,
        author: '',
        url: '',
        rating: 5,
        featured: false
    });

    const selectedProtocol = protocols.find(p => p.id === selectedProtocolId);
    const selectedResource = resources.find(r => r.id === selectedResourceId);

    const handleSelectProtocol = (protocol: Protocol) => {
        setSelectedProtocolId(protocol.id);
        setProtocolFormData(protocol);
        setIsEditing(true);
    };

    const handleSelectResource = (resource: Resource) => {
        setSelectedResourceId(resource.id);
        setResourceFormData(resource);
        setIsEditing(true);
    };

    const handleCreateNew = () => {
        if (activeTab === 'protocols') {
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
        } else {
            const newResource: Resource = {
                id: `r${Date.now()}`,
                title: 'New Resource',
                description: '',
                type: 'book',
                category: Category.Biohacking,
                author: 'Admin',
                url: '#',
                rating: 5,
                featured: false
            };
            onAddResource(newResource);
            handleSelectResource(newResource);
        }
    };

    const handleSave = () => {
        if (activeTab === 'protocols' && selectedProtocolId && protocolFormData) {
            onUpdateProtocol(protocolFormData as Protocol);
        } else if (activeTab === 'resources' && selectedResourceId && resourceFormData) {
            onUpdateResource(resourceFormData as Resource);
        }
    };

    const handleDelete = () => {
        if (activeTab === 'protocols' && selectedProtocolId) {
            onDeleteProtocol(selectedProtocolId);
            setSelectedProtocolId(null);
            setIsEditing(false);
        } else if (activeTab === 'resources' && selectedResourceId) {
            onDeleteResource(selectedResourceId);
            setSelectedResourceId(null);
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
                <div className="p-4 border-b border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                        <button
                            onClick={() => { setActiveTab('protocols'); setIsEditing(false); setSelectedProtocolId(null); setSelectedResourceId(null); }}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'protocols' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                        >
                            Protocols
                        </button>
                        <button
                            onClick={() => { setActiveTab('resources'); setIsEditing(false); setSelectedProtocolId(null); setSelectedResourceId(null); }}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'resources' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                        >
                            Resources
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-lg">{activeTab === 'protocols' ? 'Protocols' : 'Resources'}</h2>
                        <button onClick={handleCreateNew} className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {activeTab === 'protocols' ? protocols.map(p => (
                        <div
                            key={p.id}
                            onClick={() => handleSelectProtocol(p)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedProtocolId === p.id ? 'bg-blue-50 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30' : 'hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'}`}
                        >
                            <div className="font-medium text-sm truncate">{p.title}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{p.category}</div>
                        </div>
                    )) : resources.map(r => (
                        <div
                            key={r.id}
                            onClick={() => handleSelectResource(r)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedResourceId === r.id ? 'bg-blue-50 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30' : 'hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'}`}
                        >
                            <div className="font-medium text-sm truncate">{r.title}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{r.type} • {r.category}</div>
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
                {(activeTab === 'protocols' && selectedProtocolId) || (activeTab === 'resources' && selectedResourceId) ? (
                    <>
                        {/* Toolbar */}
                        <div className="h-16 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-8 bg-white dark:bg-slate-900/50 backdrop-blur-xl">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-mono text-slate-400">ID: {activeTab === 'protocols' ? selectedProtocolId : selectedResourceId}</span>
                                {activeTab === 'protocols' ? (
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${protocolFormData.verified ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                        {protocolFormData.verified ? 'Verified' : 'Draft'}
                                    </span>
                                ) : (
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${resourceFormData.featured ? 'bg-yellow-500/10 text-yellow-500' : 'bg-slate-500/10 text-slate-500'}`}>
                                        {resourceFormData.featured ? 'Featured' : 'Standard'}
                                    </span>
                                )}
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
                                {activeTab === 'protocols' ? (
                                    // Protocol Form
                                    <>
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                value={protocolFormData.title}
                                                onChange={e => setProtocolFormData({ ...protocolFormData, title: e.target.value })}
                                                className="w-full bg-transparent text-4xl font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:outline-none"
                                                placeholder="Protocol Title"
                                            />
                                            <textarea
                                                value={protocolFormData.description}
                                                onChange={e => setProtocolFormData({ ...protocolFormData, description: e.target.value })}
                                                className="w-full bg-transparent text-lg text-slate-600 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:outline-none resize-none"
                                                placeholder="Short description..."
                                                rows={2}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-500">Category</label>
                                                <select
                                                    value={protocolFormData.category}
                                                    onChange={e => setProtocolFormData({ ...protocolFormData, category: e.target.value as Category })}
                                                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                                >
                                                    {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-500">Difficulty</label>
                                                <select
                                                    value={protocolFormData.difficulty}
                                                    onChange={e => setProtocolFormData({ ...protocolFormData, difficulty: e.target.value as Difficulty })}
                                                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                                >
                                                    {Object.values(Difficulty).map(d => <option key={d} value={d}>{d}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-500">Duration (Days)</label>
                                                <input
                                                    type="number"
                                                    value={protocolFormData.durationDays}
                                                    onChange={e => setProtocolFormData({ ...protocolFormData, durationDays: parseInt(e.target.value) })}
                                                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-500">Author</label>
                                                <input
                                                    type="text"
                                                    value={protocolFormData.author}
                                                    onChange={e => setProtocolFormData({ ...protocolFormData, author: e.target.value })}
                                                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-slate-500">Protocol Steps</label>
                                                <button
                                                    onClick={() => setProtocolFormData({ ...protocolFormData, steps: [...(protocolFormData.steps || []), ''] })}
                                                    className="text-sm text-blue-500 font-medium hover:underline"
                                                >
                                                    + Add Step
                                                </button>
                                            </div>
                                            {protocolFormData.steps?.map((step, idx) => (
                                                <div key={idx} className="flex gap-3">
                                                    <span className="py-3 text-slate-400 font-mono text-sm">{idx + 1}.</span>
                                                    <input
                                                        type="text"
                                                        value={step}
                                                        onChange={e => {
                                                            const newSteps = [...(protocolFormData.steps || [])];
                                                            newSteps[idx] = e.target.value;
                                                            setProtocolFormData({ ...protocolFormData, steps: newSteps });
                                                        }}
                                                        className="flex-1 p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                                        placeholder={`Step ${idx + 1}`}
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            const newSteps = [...(protocolFormData.steps || [])];
                                                            newSteps.splice(idx, 1);
                                                            setProtocolFormData({ ...protocolFormData, steps: newSteps });
                                                        }}
                                                        className="p-3 text-slate-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    // Resource Form
                                    <>
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                value={resourceFormData.title}
                                                onChange={e => setResourceFormData({ ...resourceFormData, title: e.target.value })}
                                                className="w-full bg-transparent text-4xl font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:outline-none"
                                                placeholder="Resource Title"
                                            />
                                            <textarea
                                                value={resourceFormData.description}
                                                onChange={e => setResourceFormData({ ...resourceFormData, description: e.target.value })}
                                                className="w-full bg-transparent text-lg text-slate-600 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:outline-none resize-none"
                                                placeholder="Short description..."
                                                rows={2}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-500">Type</label>
                                                <select
                                                    value={resourceFormData.type}
                                                    onChange={e => setResourceFormData({ ...resourceFormData, type: e.target.value as any })}
                                                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                                >
                                                    {['book', 'video', 'podcast', 'article', 'tool'].map(t => <option key={t} value={t}>{t}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-500">Category</label>
                                                <select
                                                    value={resourceFormData.category}
                                                    onChange={e => setResourceFormData({ ...resourceFormData, category: e.target.value as Category })}
                                                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                                >
                                                    {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-500">Author</label>
                                                <input
                                                    type="text"
                                                    value={resourceFormData.author}
                                                    onChange={e => setResourceFormData({ ...resourceFormData, author: e.target.value })}
                                                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-500">URL</label>
                                                <input
                                                    type="text"
                                                    value={resourceFormData.url}
                                                    onChange={e => setResourceFormData({ ...resourceFormData, url: e.target.value })}
                                                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-500">Rating</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="5"
                                                    value={resourceFormData.rating}
                                                    onChange={e => setResourceFormData({ ...resourceFormData, rating: parseFloat(e.target.value) })}
                                                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 outline-none transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-2 flex items-center gap-3 pt-6">
                                                <input
                                                    type="checkbox"
                                                    checked={resourceFormData.featured}
                                                    onChange={e => setResourceFormData({ ...resourceFormData, featured: e.target.checked })}
                                                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <label className="text-sm font-medium text-slate-500">Featured Resource</label>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
                            <Upload className="w-8 h-8" />
                        </div>
                        <p className="font-medium">Select a {activeTab === 'protocols' ? 'protocol' : 'resource'} to edit</p>
                        <p className="text-sm">or create a new one</p>
                    </div>
                )}
            </div>
        </div>
    );
};
