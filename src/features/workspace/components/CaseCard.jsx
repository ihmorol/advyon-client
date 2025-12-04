import React from 'react';
import { Briefcase, Clock } from 'lucide-react';
import { cn } from "@/lib/utils";

const CaseCard = ({ data, onOpen }) => (
    // Deepest Teal Card (#051C1B) with Accent Border (#3A7573)
    <div
        onClick={() => onOpen(data)}
        className="bg-[#051C1B] border border-[#3A7573] rounded-xl p-5 hover:bg-[#153433] hover:border-white/30 transition-all cursor-pointer group flex flex-col h-full shadow-lg hover:shadow-xl hover:shadow-[#1C4645]/20 animate-in fade-in zoom-in-95 duration-300"
    >
        <div className="flex items-start justify-between mb-4">
            <div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#3A7573] transition-colors">{data.title}</h3>
                <p className="text-xs text-[#B0C4C3] mt-1">Ref: {data.ref}</p>
            </div>
            <div className={cn(
                "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border",
                data.urgency === 'high' ? "bg-red-900/20 text-red-300 border-red-500/30" :
                    data.urgency === 'medium' ? "bg-amber-900/20 text-amber-300 border-amber-500/30" :
                        "bg-blue-900/20 text-blue-300 border-blue-500/30"
            )}>
                {data.urgency} Priority
            </div>
        </div>

        <div className="space-y-3 mb-6 flex-1">
            <div className="flex items-center justify-between text-xs text-[#B0C4C3]">
                <span className="flex items-center gap-1.5"><Briefcase size={12} /> {data.type}</span>
                <span className="flex items-center gap-1.5 text-[#B0C4C3]"><Clock size={12} /> {data.nextDeadline}</span>
            </div>
            <div className="w-full bg-[#153433] rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-[#1C4645] to-[#3A7573] h-full rounded-full" style={{ width: `${data.progress}%` }}></div>
            </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#3A7573]/50">
            <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#153433] border border-[#051C1B] flex items-center justify-center text-[8px] text-white">JD</div>
                <div className="w-6 h-6 rounded-full bg-[#1C4645] border border-[#051C1B] flex items-center justify-center text-[8px] text-white">AB</div>
            </div>
            <span className="text-xs font-medium text-[#3A7573] group-hover:text-white transition-colors">Open Workspace &rarr;</span>
        </div>
    </div>
);

export default CaseCard;
