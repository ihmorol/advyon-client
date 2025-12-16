import React from 'react';

const StepInput = ({ icon: Icon, label, value, onChange, placeholder, type = "text" }) => (
    <div className="space-y-2 text-left">
        <label className="text-sm font-semibold text-slate-700 ml-1">{label}</label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#3A7573] transition-colors">
                <Icon size={20} />
            </div>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3A7573]/20 focus:border-[#3A7573] transition-all duration-300"
            />
        </div>
    </div>
);

export default StepInput;
