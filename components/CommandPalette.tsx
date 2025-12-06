import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, ArrowRight, Sun, Moon, Layout, Compass, Activity, Users, BookOpen, Library, Plus, Sparkles, Cpu } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (view: string) => void;
}

type CommandItem = {
    id: string;
    label: string;
    icon: React.ElementType;
    shortcut?: string;
    action: () => void;
    group: 'Navigation' | 'Actions' | 'General';
};

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const { theme, toggleTheme } = useTheme();

    const commands: CommandItem[] = [
        // Navigation
        { id: 'nav-explore', label: 'Explore Protocols', icon: Compass, group: 'Navigation', action: () => onNavigate('explore') },
        { id: 'nav-dashboard', label: 'My Experiments', icon: Activity, group: 'Navigation', action: () => onNavigate('dashboard') },
        { id: 'nav-community', label: 'Community Hub', icon: Users, group: 'Navigation', action: () => onNavigate('community') },
        { id: 'nav-blog', label: 'Read Blog', icon: BookOpen, group: 'Navigation', action: () => onNavigate('blog') },
        { id: 'nav-resources', label: 'Resources', icon: Library, group: 'Navigation', action: () => onNavigate('resources') },
        { id: 'nav-lab', label: 'The Lab (AI)', icon: Cpu, group: 'Navigation', action: () => onNavigate('lab') },

        // Actions
        {
            id: 'admin',
            label: 'Open Admin Studio',
            icon: Sparkles,
            group: 'Actions',
            action: () => {
                // We need a way to set the view to 'admin'.
                // Since CommandPalette is inside App, we can pass a prop or use a custom event.
                // For now, let's assume we passed a handler or context.
                // Actually, CommandPalette doesn't have access to setView.
                // I need to update CommandPalette props to accept onAction or specific handlers.
                // Or I can emit a custom event.
                window.dispatchEvent(new CustomEvent('navigate-to-view', { detail: 'admin' }));
                onClose();
            }
        },
        { id: 'act-theme', label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, icon: theme === 'dark' ? Sun : Moon, group: 'Actions', action: () => toggleTheme() },
        { id: 'act-submit', label: 'Submit New Protocol', icon: Plus, group: 'Actions', action: () => { onNavigate('explore'); /* In a real app we'd trigger the modal too */ } },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
    );

    // Reset selection when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredCommands[selectedIndex]) {
                    filteredCommands[selectedIndex].action();
                    onClose();
                }
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-fade-in-up transform transition-all">

                {/* Search Bar */}
                <div className="flex items-center px-4 py-4 border-b border-slate-200 dark:border-white/5">
                    <Search className="w-5 h-5 text-slate-400 mr-3" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Type a command or search..."
                        className="flex-1 bg-transparent text-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-white/10 px-2 py-1 rounded">ESC</span>
                    </div>
                </div>

                {/* Results List */}
                <div className="max-h-[60vh] overflow-y-auto py-2">
                    {filteredCommands.length > 0 ? (
                        <div className="px-2 space-y-1">
                            {filteredCommands.map((cmd, index) => {
                                const isSelected = index === selectedIndex;
                                const Icon = cmd.icon;
                                return (
                                    <button
                                        key={cmd.id}
                                        onClick={() => { cmd.action(); onClose(); }}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        className={`w - full flex items - center justify - between px - 3 py - 3 rounded - lg transition - colors ${isSelected
                                            ? 'bg-blue-600 text-white'
                                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                                            } `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className={`w - 5 h - 5 ${isSelected ? 'text-white' : 'text-slate-400'} `} />
                                            <span className="font-medium">{cmd.label}</span>
                                        </div>
                                        {isSelected && (
                                            <ArrowRight className="w-4 h-4 text-white/70" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="px-6 py-8 text-center text-slate-500">
                            <p>No results found.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex gap-4">
                        <span><strong className="font-medium text-slate-500 dark:text-slate-300">↑↓</strong> to navigate</span>
                        <span><strong className="font-medium text-slate-500 dark:text-slate-300">↵</strong> to select</span>
                    </div>
                    <span>Raycast-inspired Command Palette</span>
                </div>
            </div>
        </div>
    );
};
