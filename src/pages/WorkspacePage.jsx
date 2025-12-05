import React, { useState } from 'react';
import { DashboardView, WorkspaceView, ALL_CASES } from '../features/workspace';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { motion } from 'framer-motion';

const WorkspacePage = () => {
    const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'workspace'
    const [activeCase, setActiveCase] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Global search state
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

    const handleCaseSelect = (caseData) => {
        setActiveCase(caseData);
        setCurrentView('workspace');
        setSearchTerm(''); // Clear search when switching context
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">

            <div className="flex flex-1 relative">
                {/* Animated Placeholder for the fixed sidebar width */}
                <motion.div
                    initial={{ width: 80 }}
                    animate={{ width: isSidebarCollapsed ? 80 : 250 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="hidden md:block shrink-0"
                />

                <Sidebar
                    className="hidden md:flex bg-primary"
                    isCollapsed={isSidebarCollapsed}
                    onMouseEnter={() => setIsSidebarCollapsed(false)}
                    onMouseLeave={() => setIsSidebarCollapsed(true)}
                />

                <main className="flex-1 overflow-hidden relative z-10 flex flex-col bg-primary rounded-[30px] m-4 shadow-2xl border border-[#3A7573]/20">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1C4645] via-[#153433] to-[#0f2524] -z-10"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 -z-10 mix-blend-overlay fixed"></div>

                    {/* Workspace Content */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {currentView === 'dashboard' ? (
                            <DashboardView onSelectCase={handleCaseSelect} searchTerm={searchTerm} />
                        ) : (
                            <WorkspaceView
                                activeCase={activeCase || ALL_CASES[0]}
                                onSwitchCase={handleCaseSelect}
                                searchTerm={searchTerm}
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default WorkspacePage;
