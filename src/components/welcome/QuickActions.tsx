// src/components/welcome/QuickActions.tsx
import React from 'react';
import { colors } from '@/styles/colors';

interface QuickActionsProps {
  onQuickAction: (action: string) => void;
}

const quickActions = [
  "What are our vacation days?",
  "How does remote work work?", 
  "What benefits do we have?",
  "How do I submit expenses?",
  "What's our sick leave policy?",
  "Tell me about the code of conduct"
];

export const QuickActions: React.FC<QuickActionsProps> = ({ onQuickAction }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <h4 className="text-gray-300 text-sm font-medium mb-3 text-center">Quick Questions:</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => onQuickAction(action)}
            className="text-left p-3 border border-gray-600 rounded-lg text-gray-300 hover:text-white text-sm transition-all duration-200 group"
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
              <span>{action}</span>
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};