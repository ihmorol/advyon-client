import React from 'react';
import { Folder, FileText, FileCheck, MoreVertical } from 'lucide-react';
import { cn } from "@/lib/utils";

const DocumentItem = ({ name, type, date, status, indent = 0, onClick, compact }) => (
    <div
        onClick={onClick}
        className={cn(
            "group flex items-center justify-between py-2 px-3 rounded-md transition-colors animate-in fade-in slide-in-from-bottom-1 duration-300",
            compact ? "cursor-default" : "hover:bg-[#153433] cursor-pointer border-b border-[#3A7573]/20 last:border-0"
        )}
        style={{ paddingLeft: `${indent * 12 + 12}px` }}
    >
        <div className="flex items-center gap-3">
            {type === 'folder' ? <Folder size={18} className="text-[#3A7573] fill-[#3A7573]/20" /> : <FileText size={18} className="text-[#B0C4C3]" />}
            <div className="flex flex-col">
                <span className="text-sm text-white font-medium">{name}</span>
                <span className="text-[10px] text-[#B0C4C3]">{date}</span>
            </div>
        </div>
        <div className="flex items-center gap-3">
            {status === 'processing' && <span className="flex items-center gap-1 text-[10px] bg-amber-900/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30"><span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />Processing</span>}
            {status === 'analyzed' && <span className="flex items-center gap-1 text-[10px] bg-emerald-900/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30"><FileCheck size={10} />AI Ready</span>}
            {!compact && <MoreVertical size={14} className="text-[#B0C4C3] opacity-0 group-hover:opacity-100 hover:text-white transition-opacity" />}
        </div>
    </div>
);

export default DocumentItem;
