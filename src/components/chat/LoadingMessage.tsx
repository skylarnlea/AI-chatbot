// src/components/chat/LoadingMessage.tsx
import React from 'react';
import { colors } from '@/styles/colors';

export const LoadingMessage: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-3 max-w-2xl">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border"
          style={{ 
            backgroundColor: colors.grayMedium,
            color: colors.white,
            borderColor: '#4b5563'
          }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div 
          className="px-4 py-3 rounded-lg border"
          style={{ 
            backgroundColor: colors.grayMedium,
            borderColor: '#4b5563',
            color: colors.white
          }}
        >
          <div className="flex items-center space-x-2">
            <div 
              className="animate-spin rounded-full h-4 w-4 border-b-2"
              style={{ borderColor: colors.orange }}
            ></div>
            <span className="text-sm">Thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};