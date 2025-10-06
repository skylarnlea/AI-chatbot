// src/components/history/HistoryItem.tsx
import React from 'react';
import { ChatSession } from '@/types/chat';
import { colors } from '@/styles/colors';
import { formatSessionDate } from '@/utils/dateFormatters';

interface HistoryItemProps {
  session: ChatSession;
  onLoad: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  session,
  onLoad,
  onDelete
}) => {
  return (
    <div
      onClick={onLoad}
  className="p-4 rounded-lg border border-gray-600 cursor-pointer transition-all duration-200 group"
      style={{ backgroundColor: colors.grayMedium }}
      onMouseEnter={(e) => {
  e.currentTarget.style.backgroundColor = colors.grayDark;
  e.currentTarget.style.borderColor = colors.primary;
      }}
      onMouseLeave={(e) => {
  e.currentTarget.style.backgroundColor = colors.grayMedium;
  e.currentTarget.style.borderColor = '#4b5563';
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate">{session.title}</h4>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs text-gray-400">
              {session.messages.length} messages
            </span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-400">
              {formatSessionDate(session.updatedAt)}
            </span>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="ml-2 p-1 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};