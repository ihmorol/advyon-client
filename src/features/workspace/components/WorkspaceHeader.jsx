import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Briefcase, FileText, BookOpen, Globe, HelpCircle, ExternalLink, Search, X, Bell, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { ALL_CASES } from '../mockData';

const WorkspaceHeader = ({ onViewChange, currentView, onCaseSelect, searchTerm, onSearchChange }) => {
    const [activeMenu, setActiveMenu] = useState(null);
    const navRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const NAV_CONFIG = [
        {
            key: 'home',
            label: 'Home',
            action: () => { onViewChange('dashboard'); setActiveMenu(null); }
        },
        {
            key: 'matters',
            label: 'Matters',
            hasDropdown: true,
            content: (
                <div className="w-64 py-2">
                    <div className="px-4 py-2 text-xs font-bold text-[#B0C4C3] uppercase tracking-wider">Recent Matters</div>
                    {ALL_CASES.map(c => (
                        <button
                            key={c.id}
                            onClick={() => { onCaseSelect(c); setActiveMenu(null); }}
                            className="w-full text-left px-4 py-2 hover:bg-[#3A7573]/20 flex items-center justify-between group transition-colors"
                        >
                            <div className="flex flex-col">
                                <span className="text-sm text-white font-medium">{c.title}</span>
                                <span className="text-[10px] text-[#B0C4C3] group-hover:text-white">{c.ref}</span>
                            </div>
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-[#3A7573] transition-opacity" />
                        </button>
                    ))}
                    <div className="border-t border-[#3A7573] mt-2 pt-2">
                        <button onClick={() => { onViewChange('dashboard'); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-xs text-[#3A7573] hover:text-white flex items-center gap-2">
                            <Briefcase size={12} /> View All Matters
                        </button>
                    </div>
                </div>
            )
        },
        {
            key: 'resources',
            label: 'Resources',
            hasDropdown: true,
            content: (
                <div className="w-56 py-2">
                    <button className="w-full text-left px-4 py-2 hover:bg-[#3A7573]/20 flex items-center gap-2 text-sm text-[#B0C4C3] hover:text-white">
                        <FileText size={14} /> Templates Library
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-[#3A7573]/20 flex items-center gap-2 text-sm text-[#B0C4C3] hover:text-white">
                        <BookOpen size={14} /> Firm Precedents
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-[#3A7573]/20 flex items-center gap-2 text-sm text-[#B0C4C3] hover:text-white">
                        <Globe size={14} /> Legal Research
                    </button>
                </div>
            )
        },
        {
            key: 'docs',
            label: 'Docs',
            hasDropdown: true,
            content: (
                <div className="w-48 py-2">
                    <button className="w-full text-left px-4 py-2 hover:bg-[#3A7573]/20 flex items-center gap-2 text-sm text-[#B0C4C3] hover:text-white">
                        <HelpCircle size={14} /> User Guide
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-[#3A7573]/20 flex items-center gap-2 text-sm text-[#B0C4C3] hover:text-white">
                        <ExternalLink size={14} /> API Documentation
                    </button>
                </div>
            )
        }
    ];

    return (
        // Advyon Teal Background for Header (#1C4645) with Accent Border (#3A7573)
        <nav ref={navRef} className="h-16 border-b border-[#3A7573] bg-[#1C4645] flex items-center justify-between px-6 shrink-0 relative z-40 shadow-sm">
            <div className="flex items-center gap-8">
                <div
                    onClick={() => onViewChange('dashboard')}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    {/* Logo with slightly lighter gradient for contrast */}
                    <div className="w-9 h-9 bg-gradient-to-tr from-[#3A7573] to-[#1C4645] rounded-lg flex items-center justify-center font-bold text-white shadow-lg border border-white/10 group-hover:scale-105 transition-transform">
                        A
                    </div>
                    <span className="font-bold text-lg tracking-wide text-white">ADVYON</span>
                </div>

                <div className="hidden lg:flex items-center gap-1">
                    {NAV_CONFIG.map((item) => (
                        <div key={item.key} className="relative">
                            <button
                                onClick={() => item.hasDropdown ? toggleMenu(item.key) : item.action()}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-[#051C1B]",
                                    (currentView === 'dashboard' && item.key === 'home') || activeMenu === item.key ? "text-white bg-[#051C1B]" : "text-[#B0C4C3] hover:text-white"
                                )}
                            >
                                {item.label}
                                {item.hasDropdown && (
                                    <ChevronDown
                                        size={14}
                                        className={cn(
                                            "opacity-50 transition-transform duration-200",
                                            activeMenu === item.key ? "rotate-180" : ""
                                        )}
                                    />
                                )}
                            </button>

                            {/* Dropdown Menu - Deepest Teal Background with Accent Border */}
                            {item.hasDropdown && activeMenu === item.key && (
                                <div className="absolute top-full left-0 mt-1 bg-[#051C1B] border border-[#3A7573] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 min-w-[200px] ring-1 ring-black/5">
                                    {item.content}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-5">
                {/* Search - Dark Teal (#153433) background */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#153433] rounded-lg border border-[#3A7573] text-sm text-[#B0C4C3] w-56 hover:border-white/30 transition-colors focus-within:border-[#3A7573] focus-within:text-white group relative">
                    <Search size={14} className="text-[#B0C4C3] shrink-0" />
                    <input
                        type="text"
                        placeholder={currentView === 'dashboard' ? "Search active cases..." : "Search files..."}
                        className="bg-transparent border-none outline-none w-full placeholder-[#B0C4C3]/50 text-xs text-white"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    {searchTerm && (
                        <button onClick={() => onSearchChange('')} className="shrink-0 text-[#B0C4C3] hover:text-white">
                            <X size={12} />
                        </button>
                    )}
                    {!searchTerm && <div className="text-[10px] text-[#B0C4C3] border border-[#3A7573] px-1 rounded shrink-0">/</div>}
                </div>

                <div className="h-6 w-px bg-[#3A7573] mx-1 hidden md:block"></div>

                <div className="flex items-center gap-4">
                    <button className="text-[#B0C4C3] hover:text-white transition-colors" title="Switch Jurisdiction">
                        <Globe size={18} />
                    </button>

                    <button className="relative text-[#B0C4C3] hover:text-white transition-colors">
                        <Bell size={18} />
                        <span className="absolute 0 -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-[#051C1B]"></span>
                    </button>

                    <div className="w-8 h-8 rounded-full bg-[#153433] border border-[#3A7573] flex items-center justify-center text-xs font-medium text-white ring-2 ring-transparent hover:ring-[#3A7573]/50 transition-all cursor-pointer overflow-hidden shadow-lg">
                        <img src="https://ui-avatars.com/api/?name=John+Doe&background=1C4645&color=fff" alt="User" className="w-full h-full opacity-90" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default WorkspaceHeader;
