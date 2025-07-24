// Chatbot Icon Component based on your design
import React from 'react';
import { colors } from '@/styles/colors';

interface ChatbotIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16', 
  lg: 'w-20 h-20',
  xl: 'w-24 h-24'
};

const textSizes = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl', 
  xl: 'text-3xl'
};

export const ChatbotIcon: React.FC<ChatbotIconProps> = ({ 
  size = 'lg', 
  onClick, 
  className = '',
  isActive = false 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${sizeClasses[size]} 
        ${className}
        relative rounded-2xl shadow-lg hover:shadow-xl 
        transform hover:scale-105 transition-all duration-300 ease-out
        focus:outline-none focus:ring-4 focus:ring-orange-200
        group overflow-hidden
        ${isActive ? 'scale-105 shadow-xl' : ''}
      `}
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      }}
    >
      {/* Subtle shine effect */}
      <div 
        className="absolute inset-0 transition-opacity duration-300 opacity-20 group-hover:opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)'
        }}
      />
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <span 
          className={`${textSizes[size]} font-bold text-white drop-shadow-sm`}
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          #1
        </span>
      </div>

      {/* Pulse animation for notifications */}
      {isActive && (
        <div 
          className="absolute w-3 h-3 rounded-full -top-1 -right-1 animate-pulse"
          style={{ backgroundColor: colors.accent }}
        />
      )}
    </button>
  );
};

// Chat Widget Version (for embedding in websites)
export const ChatbotWidget: React.FC<{ onToggle: () => void; isOpen: boolean }> = ({ 
  onToggle, 
  isOpen 
}) => {
  return (
    <div className="fixed z-50 bottom-6 right-6 group">
      <ChatbotIcon 
        size="lg"
        onClick={onToggle}
        isActive={!isOpen}
        className={`
          ${isOpen ? 'rotate-45' : 'rotate-0'} 
          transition-transform duration-300
        `}
      />
      
      {/* Tooltip */}
      {!isOpen && (
        <div className="absolute right-0 px-3 py-2 mb-2 text-sm text-white transition-opacity duration-200 border rounded-lg shadow-lg opacity-0 bottom-full bg-slate-800 group-hover:opacity-100 whitespace-nowrap border-slate-600">
          Ask me anything about Cheil!
          <div className="absolute w-2 h-2 -mt-1 transform rotate-45 border-b border-r top-full right-4 bg-slate-800 border-slate-600" />
        </div>
      )}
    </div>
  );
}