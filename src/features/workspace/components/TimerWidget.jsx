import React, { useState, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';

const TimerWidget = () => {
    const [time, setTime] = useState(863);
    const [isActive, setIsActive] = useState(false);
    
    useEffect(() => {
        let interval = null;
        if (isActive) { 
            interval = setInterval(() => { setTime((s) => s + 1); }, 1000); 
        } else if (!isActive && time !== 0) { 
            clearInterval(interval); 
        }
        return () => clearInterval(interval);
    }, [isActive, time]);
    
    const formatTime = (t) => `${Math.floor(t / 3600).toString().padStart(2, '0')}:${Math.floor((t % 3600) / 60).toString().padStart(2, '0')}:${(t % 60).toString().padStart(2, '0')}`;
    
    return (
        <div className="bg-secondary rounded-lg p-2.5 border border-accent/20 mb-3 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Billable Time</span>
                <div className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-destructive animate-pulse' : 'bg-teal-accent'}`}></div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-xl font-mono text-foreground tracking-widest">{formatTime(time)}</div>
                <button 
                    onClick={() => setIsActive(!isActive)} 
                    className={`p-1.5 rounded-full transition-colors ${isActive ? 'bg-destructive/10 text-destructive hover:bg-destructive/20' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                >
                    {isActive ? <Pause size={14} /> : <Play size={14} />}
                </button>
            </div>
        </div>
    );
};

export default TimerWidget;
