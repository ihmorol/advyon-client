import React, { useState } from 'react';
import { DashboardView, WorkspaceView, WorkspaceHeader, ALL_CASES } from '../features/workspace';
import WorkspaceBackground from '../features/workspace/components/WorkspaceBackground';

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
        <WorkspaceBackground>
            <WorkspaceHeader
                currentView={currentView}
                onViewChange={setCurrentView}
                onCaseSelect={handleCaseSelect}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            {currentView === 'dashboard' ? (
                <DashboardView onSelectCase={handleCaseSelect} searchTerm={searchTerm} />
            ) : (
                <WorkspaceView
                    activeCase={activeCase || ALL_CASES[0]}
                    onSwitchCase={handleCaseSelect}
                    searchTerm={searchTerm}
                />
            )}
        </WorkspaceBackground>
    );
};

export default WorkspacePage;
