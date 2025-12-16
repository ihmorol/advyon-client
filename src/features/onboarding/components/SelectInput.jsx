import React from 'react';
import { ChevronRight } from 'lucide-react';

const SelectInput = ({ icon: Icon, label, value, onChange, options }) => (
    <div className="space-y-2 text-left">
        <label className="text-sm font-semibold text-slate-700 ml-1">{label}</label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#3A7573] transition-colors">
                <Icon size={20} />
            </div>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3A7573]/20 focus:border-[#3A7573] transition-all duration-300 appearance-none cursor-pointer"
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <ChevronRight size={16} className="rotate-90" />
            </div>
        </div>
    </div>
);

export default SelectInput;
