// src/components/history/EmptyHistory.tsx
import React from 'react';

export const EmptyHistory: React.FC = () => {
  return (
    <div className="text-center text-gray-400 py-12">
      <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p>No chat history yet</p>
      <p className="text-sm mt-2">Start a conversation to see it here</p>
    </div>
  );
};