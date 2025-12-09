import React, { useState } from 'react';
import {
    ChevronDown, Users, Folder, Settings, PanelLeft, PanelRight, Plus, ChevronRight, Search, FolderOpen, ArrowLeft
} from 'lucide-react';
import { cn } from "@/lib/utils";
import DocumentItem from './DocumentItem';
import TimerWidget from './TimerWidget';
import { CASE_FOLDERS_DATA, ALL_CASES } from '../mockData';

const WorkspaceView = ({ activeCase, onSwitchCase, searchTerm, onBack }) => {
    const [showLeftSidebar, setShowLeftSidebar] = useState(true);
    const [isCaseSwitcherOpen, setIsCaseSwitcherOpen] = useState(false);
    const [breadcrumbs, setBreadcrumbs] = useState([activeCase.title, 'Evidence']);
    const [expandedFolders, setExpandedFolders] = useState(['Evidence', 'Witness Statements']);
    const [selectedFile, setSelectedFile] = useState(null);

    const currentFolder = breadcrumbs[breadcrumbs.length - 1];
    const currentFiles = CASE_FOLDERS_DATA[currentFolder] || [];

    // Filter files based on search term
    const filteredFiles = currentFiles.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFolderClick = (folder) => {
        setBreadcrumbs([activeCase.title, folder]);
        setSelectedFile(null); // Clear file selection when switching folders via header/click

        // Toggle folder expansion
        setExpandedFolders(prev =>
            prev.includes(folder)
                ? prev.filter(f => f !== folder)
                : [...prev, folder]
        );
    };

    const handleFileClick = (folder, file) => {
        setBreadcrumbs([activeCase.title, folder]);
        if (!expandedFolders.includes(folder)) {
            setExpandedFolders(prev => [...prev, folder]);
        }
        setSelectedFile(file);
    };

    return (
        <div className="flex flex-1 overflow-hidden relative z-20 animate-in fade-in slide-in-from-right-4 duration-500 h-full">

            {/* LEFT SIDEBAR - Deepest Teal (#051C1B) */}
            <aside className={cn("bg-primary border-r border-[#3A7573] flex flex-col transition-all duration-300 ease-in-out", showLeftSidebar ? "w-72 translate-x-0 opacity-100" : "w-0 -translate-x-full opacity-0 overflow-hidden border-none")}>
                <div className="w-72 flex flex-col h-full overflow-hidden">
                    <div className="p-4 overflow-y-auto custom-scrollbar flex-1">

                        {/* Quick Case Switcher Dropdown */}
                        <div className="mb-6 relative">
                            <button
                                onClick={() => setIsCaseSwitcherOpen(!isCaseSwitcherOpen)}
                                className="w-full text-left flex items-start justify-between group"
                            >
                                <div>
                                    <h2 className="text-xl font-bold text-white leading-tight mb-1 group-hover:text-[#3A7573] transition-colors flex items-center gap-2">
                                        {activeCase.title} <ChevronDown size={16} className={`transition-transform duration-200 ${isCaseSwitcherOpen ? 'rotate-180' : ''}`} />
                                    </h2>
                                    <p className="text-xs text-[#B0C4C3]">Case #{activeCase.ref}</p>
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {isCaseSwitcherOpen && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-primary border border-[#3A7573] rounded-lg shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                                    <div className="p-2 bg-[#153433] border-b border-[#3A7573]">
                                        <p className="text-[10px] text-[#B0C4C3] font-bold uppercase">Switch Case</p>
                                    </div>
                                    <div className="max-h-48 overflow-y-auto custom-scrollbar">
                                        {ALL_CASES.filter(c => c.id !== activeCase.id).map(c => (
                                            <button
                                                key={c.id}
                                                onClick={() => { onSwitchCase(c); setIsCaseSwitcherOpen(false); }}
                                                className="w-full text-left px-3 py-2 text-sm text-[#B0C4C3] hover:bg-[#153433] hover:text-white transition-colors border-b border-[#3A7573]/20 last:border-0"
                                            >
                                                <div className="font-medium">{c.title}</div>
                                                <div className="text-[10px] text-[#B0C4C3]">{c.ref} • {c.urgency} priority</div>
                                            </button>
                                        ))}
                                        <button className="w-full text-left px-3 py-2 text-xs text-[#3A7573] hover:underline border-t border-[#3A7573] bg-primary">
                                            View All Cases in Dashboard
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-2 py-0.5 bg-blue-900/20 text-blue-300 text-[10px] rounded border border-blue-500/30">{activeCase.type}</span>
                            <span className="px-2 py-0.5 bg-green-900/20 text-green-300 text-[10px] rounded border border-green-500/30">{activeCase.status}</span>
                        </div>

                        <TimerWidget />

                        <div className="flex items-center justify-between p-2 bg-[#153433] rounded border border-[#3A7573]">
                            <div className="flex items-center gap-2"><Users size={14} className="text-[#3A7573]" /><span className="text-xs text-[#B0C4C3]">Client Access</span></div>
                            <div className="relative w-8 h-4 bg-[#051C1B] rounded-full cursor-pointer"><div className="absolute right-0.5 top-0.5 w-3 h-3 bg-[#3A7573] rounded-full shadow-sm"></div></div>
                        </div>

                        {/* Folder Navigation Tree */}
                        <div className="mt-6 space-y-1">
                            <div className="flex items-center gap-2 text-xs font-semibold text-[#B0C4C3] uppercase tracking-wider mb-2 px-2">Folders</div>
                            {Object.keys(CASE_FOLDERS_DATA).map((folder) => {
                                const isExpanded = expandedFolders.includes(folder);
                                const isCurrent = currentFolder === folder;
                                const files = CASE_FOLDERS_DATA[folder];

                                return (
                                    <div key={folder} className="mb-1">
                                        <button
                                            onClick={() => handleFolderClick(folder)}
                                            className={cn(
                                                "w-full flex items-center justify-between px-2 py-1.5 text-sm rounded-md transition-all group hover:bg-[#153433]/50",
                                                isCurrent ? "text-white" : "text-[#B0C4C3]"
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                <ChevronRight size={14} className={cn("transition-transform duration-200", isExpanded && "rotate-90")} />
                                                <Folder size={16} className={isCurrent ? "text-white" : "text-[#3A7573] group-hover:text-white"} />
                                                <span className="truncate">{folder}</span>
                                            </div>
                                            <span className="text-[10px] bg-[#051C1B] px-1.5 rounded text-[#B0C4C3]">{files.length}</span>
                                        </button>

                                        {/* Nested Files */}
                                        {isExpanded && (
                                            <div className="ml-6 mt-1 space-y-0.5 border-l border-[#3A7573]/30 pl-2">
                                                {files.map((file, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={(e) => { e.stopPropagation(); handleFileClick(folder, file); }}
                                                        className={cn(
                                                            "w-full text-left px-2 py-1 text-xs rounded-md transition-colors truncate flex items-center gap-2",
                                                            selectedFile?.name === file.name
                                                                ? "bg-[#153433] text-white"
                                                                : "text-[#B0C4C3] hover:text-white hover:bg-[#153433]/30"
                                                        )}
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#3A7573] flex-shrink-0"></span>
                                                        {file.name}
                                                    </button>
                                                ))}
                                                {files.length === 0 && (
                                                    <div className="px-2 py-1 text-[10px] text-[#B0C4C3]/50 italic">No files</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-auto p-4 border-t border-[#3A7573] bg-primary">
                        <button className="w-full flex items-center justify-center gap-2 py-2 text-xs text-[#B0C4C3] hover:text-white transition-colors"><Settings size={14} /> Workspace Settings</button>
                    </div>
                </div>
            </aside>

            {/* CENTER PANEL - Main BG bg-primary */}
            <main className="flex-1 flex flex-col min-w-0 bg-primary relative transition-all duration-300">
                <div className="h-14 border-b border-[#3A7573] flex items-center justify-between px-4 sm:px-6 bg-primary/95 backdrop-blur-sm">
                    <div className="flex items-center text-sm text-[#B0C4C3] gap-2 overflow-x-auto no-scrollbar mask-gradient-right">
                        <button onClick={onBack} className="p-1.5 rounded-md hover:bg-[#153433] text-[#3A7573] hover:text-white transition-colors mr-2 flex-shrink-0" title="Back to Dashboard">
                            <ArrowLeft size={18} />
                        </button>
                        <button onClick={() => setShowLeftSidebar(!showLeftSidebar)} className={cn("p-1.5 rounded-md hover:bg-[#153433] text-[#3A7573] transition-colors mr-2 flex-shrink-0", !showLeftSidebar && "bg-[#153433]")}><PanelLeft size={18} /></button>
                        {breadcrumbs.map((item, index) => (
                            <React.Fragment key={index}>
                                <span className={cn("cursor-pointer hover:text-white transition-colors whitespace-nowrap", index === breadcrumbs.length - 1 ? "text-white font-medium" : "text-[#B0C4C3]")}>{item}</span>
                                {index < breadcrumbs.length - 1 && <ChevronRight size={14} className="text-[#3A7573] flex-shrink-0" />}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                        {/* Action Button: Advyon Teal (#1C4645) */}
                        <button className="flex items-center gap-2 bg-[#1C4645] hover:bg-[#3A7573] text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-all shadow-lg border border-[#3A7573]"><Plus size={16} /><span className="hidden sm:inline">Upload File</span></button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="border-2 border-dashed border-[#3A7573] rounded-xl p-8 mb-6 flex flex-col items-center justify-center text-[#B0C4C3] hover:border-white/50 hover:bg-[#153433] transition-all cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-[#153433] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><Plus size={24} className="text-[#3A7573] group-hover:text-white" /></div>
                        <p className="text-sm font-medium">Drop new {currentFolder} here</p>
                    </div>

                    <div className="space-y-1">
                        {selectedFile ? (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <DocumentItem name={selectedFile.name} type={selectedFile.type} date={selectedFile.date} status={selectedFile.status} compact />
                                    </h3>
                                    <button onClick={() => setSelectedFile(null)} className="text-xs text-[#3A7573] hover:text-white underline">Back to list</button>
                                </div>
                                <div className="bg-[#153433]/30 border border-[#3A7573] rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] text-[#B0C4C3]">
                                    <p>File Preview for <strong>{selectedFile.name}</strong></p>
                                    <p className="text-xs opacity-50 mt-2">Preview not available in this demo.</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-xs font-semibold text-[#B0C4C3] uppercase tracking-wider mb-3 px-2 flex items-center justify-between">
                                    <span>{currentFolder}</span>
                                    <span className="text-[10px] bg-[#153433] px-2 py-0.5 rounded-full text-white">{filteredFiles.length} items</span>
                                </h3>

                                {filteredFiles.length > 0 ? (
                                    filteredFiles.map((file, idx) => (
                                        <DocumentItem key={idx} {...file} onClick={() => setSelectedFile(file)} />
                                    ))
                                ) : (
                                    <div className="text-center py-12 opacity-50">
                                        <FolderOpen size={48} className="mx-auto text-[#3A7573] mb-2" />
                                        <p className="text-sm text-[#B0C4C3]">
                                            {searchTerm ? `No files match "${searchTerm}"` : "No files in this folder yet."}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WorkspaceView;
