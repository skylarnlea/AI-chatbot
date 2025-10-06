// src/components/chat/PolicySourceBadge.tsx
import React from 'react';
import { PolicySource } from '@/types/chat';
import { colors } from '@/styles/colors';

interface PolicySourceBadgeProps {
  source: PolicySource;
  onClick: () => void;
}

export const PolicySourceBadge: React.FC<PolicySourceBadgeProps> = ({ 
  source, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-2 py-1 rounded-full text-xs text-white transition-colors cursor-pointer"
  style={{ backgroundColor: colors.primary }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
    >
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {source.title}
    </button>
  );
};