import React from 'react';
import { Plus, Briefcase, Search, Clock } from 'lucide-react';
import CaseCard from './CaseCard';
import { RECENT_ACTIVITY } from '../mockData';

const DashboardView = ({ onSelectCase, searchTerm, cases = [] }) => {
    // Filter cases based on search term
    const filteredCases = cases.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 overflow-y-auto p-8 relative z-20 animate-in fade-in zoom-in-95 duration-500">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John</h1>
                        <p className="text-[#B0C4C3]">Here is what's happening across your active cases today.</p>
                    </div>
                    {/* Primary Button: Advyon Teal (#1C4645) */}
                    <button className="flex items-center gap-2 bg-[#1C4645] hover:bg-[#3A7573] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-[#051C1B]/50 border border-[#3A7573]">
                        <Plus size={18} /> New Case
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Grid - Cases */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Briefcase size={18} />
                                {searchTerm ? `Results for "${searchTerm}"` : "Active Cases"}
                            </h2>
                            <button className="text-xs text-[#3A7573] hover:text-white">View Archived</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredCases.map(c => (
                                <CaseCard key={c.id} data={c} onOpen={onSelectCase} />
                            ))}

                            {filteredCases.length === 0 && (
                                <div className="col-span-2 py-12 flex flex-col items-center justify-center text-center bg-[#051C1B] border border-[#3A7573] border-dashed rounded-xl">
                                    <Search size={48} className="text-[#3A7573]/50 mb-4" />
                                    <p className="text-white font-medium">No cases found</p>
                                    <p className="text-sm text-[#B0C4C3] mt-1">Try adjusting your search for "{searchTerm}"</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar - Global Feed */}
                    <div className="space-y-6">
                        <div className="bg-primary border border-[#3A7573] rounded-xl p-5">
                            <h2 className="text-sm font-bold text-[#B0C4C3] uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Clock size={14} className="text-[#3A7573]" /> Recent Activity
                            </h2>
                            <div className="space-y-4">
                                {RECENT_ACTIVITY.map((activity) => (
                                    <div key={activity.id} className="relative pl-4 border-l border-[#3A7573]">
                                        <div className="absolute -left-1.5 top-1 w-3 h-3 bg-[#051C1B] border border-[#3A7573] rounded-full"></div>
                                        <p className="text-sm text-white font-medium">{activity.action}</p>
                                        <p className="text-xs text-[#B0C4C3] mb-0.5">{activity.case}</p>
                                        <p className="text-[10px] text-[#3A7573]">{activity.user} • {activity.time}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 text-xs text-center text-[#B0C4C3] hover:text-white border border-[#3A7573] rounded hover:bg-[#153433] transition-colors">
                                View All Notifications
                            </button>
                        </div>

                        <div className="bg-primary border border-[#3A7573] rounded-xl p-5">
                            <h2 className="text-sm font-bold text-[#B0C4C3] uppercase tracking-wider mb-2">Daily Summary</h2>
                            <div className="text-2xl font-bold text-white mb-1">3 Deadlines</div>
                            <p className="text-xs text-[#B0C4C3] mb-3">You have 3 critical deadlines approaching in the next 48 hours.</p>
                            <div className="h-1.5 w-full bg-[#051C1B] rounded-full overflow-hidden">
                                <div className="h-full bg-[#3A7573] w-3/4"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardView;
