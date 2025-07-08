// src/components/history/ChatHistory.tsx
import React from 'react';
import { ChatSession } from '@/types/chat';
import { HistoryItem } from './HistoryItem';
import { EmptyHistory } from './EmptyHistory';

interface ChatHistoryProps {
  chatHistory: ChatSession[];
  onLoadSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string, e: React.MouseEvent) => void;
  onClose: () => void;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({
  chatHistory,
  onLoadSession,
  onDeleteSession,
  onClose
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Chat History</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {chatHistory.length === 0 ? (
        <EmptyHistory />
      ) : (
        <div className="space-y-3">
          {chatHistory.map((session) => (
            <HistoryItem
              key={session.id}
              session={session}
              onLoad={() => onLoadSession(session.id)}
              onDelete={(e) => onDeleteSession(session.id, e)}
            />
          ))}
        </div>
      )}
    </div>
  );
};