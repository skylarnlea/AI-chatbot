// src/components/chat/ChatHeader.tsx
import React from 'react';
import { colors } from '@/styles/colors';

interface ChatHeaderProps {
  showWelcome: boolean;
  showHistory: boolean;
  onToggleHistory: () => void;
  onNewChat: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  showWelcome,
  showHistory,
  onToggleHistory,
  onNewChat
}) => {
  return (
    <div 
      className="text-white p-4 rounded-t-lg border-b border-gray-600"
      style={{ backgroundColor: colors.grayDark }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
            style={{ backgroundColor: colors.primary }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
            <p className="text-gray-300 text-sm">Ready to help with your questions</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: colors.primary }}
            ></div>
            <span className="text-sm text-gray-300">Online</span>
          </div>
          
          {/* History Button */}
          <button
            onClick={onToggleHistory}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm`}
              style={{
              backgroundColor: showHistory ? colors.primary : colors.grayMedium 
            }}
            onMouseEnter={(e) => {
              if (!showHistory) {
                e.currentTarget.style.backgroundColor = '#4b5563';
              }
            }}
            onMouseLeave={(e) => {
              if (!showHistory) {
                e.currentTarget.style.backgroundColor = colors.grayMedium;
              }
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>History</span>
          </button>

          {!showWelcome && (
            <button
              onClick={onNewChat}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm"
              style={{ backgroundColor: colors.grayMedium }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.grayMedium}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Chat</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};