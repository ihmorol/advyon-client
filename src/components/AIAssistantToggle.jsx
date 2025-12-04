import React from 'react';
import { Sparkles, Bot } from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

/**
 * AIAssistantToggle - A floating button to toggle the AI Assistant panel
 * Can be placed in navbar or as a floating action button
 * 
 * @param {function} onClick - Callback when button is clicked
 * @param {boolean} isActive - Whether AI panel is currently open
 * @param {string} position - 'navbar' | 'floating' - determines styling
 */
const AIAssistantToggle = ({ 
  onClick, 
  isActive = false, 
  position = 'navbar' 
}) => {
  
  if (position === 'floating') {
    return (
      <button
        onClick={onClick}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 z-30",
          "flex items-center justify-center group",
          isActive 
            ? "bg-teal-500 shadow-teal-500/50 scale-95" 
            : "bg-gradient-to-tr from-teal-400 to-emerald-600 hover:scale-110 hover:shadow-2xl hover:shadow-teal-500/50"
        )}
        title="Toggle AI Assistant"
      >
        <div className="relative">
          <Sparkles 
            size={24} 
            className={cn(
              "transition-all duration-300",
              isActive ? "text-white rotate-180" : "text-white group-hover:rotate-12"
            )} 
          />
          {!isActive && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </div>
      </button>
    );
  }

  // Navbar style button
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300",
        isActive 
          ? "bg-teal-500/30 text-teal-200 border border-teal-500/50" 
          : "bg-[#153433] text-gray-300 border border-[#2A5C5A] hover:bg-[#2A5C5A] hover:text-white hover:border-teal-500/30"
      )}
      title="Toggle AI Assistant"
    >
      <div className="relative">
        <Bot 
          size={18} 
          className={cn(
            "transition-transform duration-300",
            isActive && "rotate-12"
          )} 
        />
        {!isActive && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
        )}
      </div>
      <span className="text-sm font-medium hidden sm:inline">AI Assistant</span>
    </button>
  );
};

export default AIAssistantToggle;
