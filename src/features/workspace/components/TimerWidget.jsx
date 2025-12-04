import React, { useState, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';

const TimerWidget = () => {
    const [time, setTime] = useState(863);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        let interval = null;
        if (isActive) { interval = setInterval(() => { setTime((s) => s + 1); }, 1000); }
        else if (!isActive && time !== 0) { clearInterval(interval); }
        return () => clearInterval(interval);
    }, [isActive, time]);
    const formatTime = (t) => `${Math.floor(t / 3600).toString().padStart(2, '0')}:${Math.floor((t % 3600) / 60).toString().padStart(2, '0')}:${(t % 60).toString().padStart(2, '0')}`;
    return (
        <div className="bg-[#153433] rounded-lg p-3 border border-[#3A7573] mb-4 shadow-lg">
            <div className="flex items-center justify-between mb-2"><span className="text-xs text-[#B0C4C3] uppercase tracking-wider font-semibold">Billable Time</span><div className={`h-2 w-2 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-[#3A7573]'}`}></div></div>
            <div className="flex items-center justify-between"><div className="text-2xl font-mono text-white tracking-widest">{formatTime(time)}</div><button onClick={() => setIsActive(!isActive)} className={`p-2 rounded-full transition-colors ${isActive ? 'bg-red-900/20 text-red-300 hover:bg-red-900/40' : 'bg-[#1C4645] text-[#3A7573] hover:text-white'}`}>{isActive ? <Pause size={18} /> : <Play size={18} />}</button></div>
        </div>
    );
};

export default TimerWidget;
