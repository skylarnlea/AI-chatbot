// src/components/chat/MessageBubble.tsx
import React from 'react';
import { Message } from '@/types/chat';
import { colors } from '@/styles/colors';
import { formatMessageTime } from '@/utils/dateFormatters';
import { messageHasSources } from '@/utils/chatHelpers';
import { PolicySourceBadge } from '@/components/chat/PolicySourceBadge';

interface MessageBubbleProps {
  message: Message;
  onPolicyClick: (policyTitle: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  onPolicyClick 
}) => {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-3 max-w-2xl ${
        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
      }`}>
        {/* Avatar */}
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ 
            backgroundColor: message.type === 'user' ? colors.orange : colors.grayMedium,
            color: colors.white,
            border: message.type === 'bot' ? '1px solid #4b5563' : 'none'
          }}
        >
          {message.type === 'user' ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          )}
        </div>
        
        {/* Message Content */}
        <div
          className="px-4 py-3 rounded-lg border"
          style={{
            backgroundColor: message.type === 'user' ? colors.orange : colors.grayMedium,
            borderColor: message.type === 'user' ? colors.orange : '#4b5563',
            color: colors.white
          }}
        >
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
          
          {/* Sources */}
          {messageHasSources(message) && (
            <div className="mt-3 pt-3 border-t border-gray-600">
              <p className="text-xs text-gray-400 mb-2">Sources:</p>
              <div className="flex flex-wrap gap-1">
                {message.sources!.map((source, idx) => (
                  <PolicySourceBadge
                    key={idx}
                    source={source}
                    onClick={() => onPolicyClick(source.title)}
                  />
                ))}
              </div>
            </div>
          )}
          
          <p className={`text-xs mt-2 ${
            message.type === 'user' ? 'text-orange-100' : 'text-gray-400'
          }`}>
            {formatMessageTime(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};