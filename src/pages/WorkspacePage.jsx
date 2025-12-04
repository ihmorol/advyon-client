import React, { useState } from 'react';
import { DashboardView, WorkspaceView, ALL_CASES } from '../features/workspace';

const WorkspacePage = () => {
    const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'workspace'
    const [activeCase, setActiveCase] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Global search state

    const handleCaseSelect = (caseData) => {
        setActiveCase(caseData);
        setCurrentView('workspace');
        setSearchTerm(''); // Clear search when switching context
    };

    return (
        <div className="w-full h-full">
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
    );
};

export default WorkspacePage;
