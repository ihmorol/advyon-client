import React from 'react';
import { Folder, FileText, FileCheck, MoreVertical } from 'lucide-react';
import { cn } from "@/lib/utils";

const DocumentItem = ({ name, type, date, status, indent = 0, onClick, compact }) => (
    <div
        onClick={onClick}
        className={cn(
            "group flex items-center justify-between py-1.5 px-2 rounded-md transition-colors animate-in fade-in slide-in-from-bottom-1 duration-300",
            compact ? "cursor-default" : "hover:bg-secondary cursor-pointer border-b border-accent/10 last:border-0"
        )}
        style={{ paddingLeft: `${indent * 10 + 8}px` }}
    >
        <div className="flex items-center gap-2">
            {type === 'folder' ? <Folder size={14} className="text-teal-accent" /> : <FileText size={14} className="text-muted-foreground" />}
            <div className="flex flex-col">
                <span className="text-sm text-foreground font-medium">{name}</span>
                <span className="text-[9px] text-muted-foreground">{date}</span>
            </div>
        </div>
        <div className="flex items-center gap-2">
            {status === 'processing' && <span className="flex items-center gap-1 text-[9px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full border border-accent/30"><span className="w-1 h-1 bg-accent rounded-full animate-ping" />Processing</span>}
            {status === 'analyzed' && <span className="flex items-center gap-1 text-[9px] bg-teal-accent/10 text-teal-bright px-1.5 py-0.5 rounded-full border border-teal-accent/30"><FileCheck size={8} />AI Ready</span>}
            {!compact && <MoreVertical size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground transition-opacity" />}
        </div>
    </div>
);

export default DocumentItem;
