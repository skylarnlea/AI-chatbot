// src/components/chat/MessageBubble.tsx
import React from 'react';
import { Message } from '@/types/chat';
import { formatMessageTime } from '@/utils/dateFormatters';
import { messageHasSources } from '@/utils/chatHelpers';
import { PolicySourceBadge } from '@/components/chat/PolicySourceBadge';
import { colors } from '@/styles/colors';

interface MessageBubbleProps {
  message: Message;
  onPolicyClick: (policyTitle: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  onPolicyClick 
}) => {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-3 max-w-3xl ${
        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
      }`}>
        {/* Enhanced Avatar */}
            <div className="flex-shrink-0">
          {message.type === 'user' ? (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-accent to-accent-600 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-accent to-accent-400 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">#1</span>
            </div>
          )}
        </div>
        
        {/* Enhanced Message Content */}
        <div className="flex-1">
          <div className={`
            message-bubble shadow-lg hover:shadow-xl transition-all duration-300
            ${message.type === 'user' ? 'message-user' : 'message-bot'}
          `}>
            <div className="prose prose-sm max-w-none">
              <p className="text-sm leading-relaxed whitespace-pre-wrap m-0">
                {message.content}
              </p>
            </div>
            
            {/* Enhanced Sources */}
            {messageHasSources(message) && (
              <div className="mt-4 pt-3 border-t border-slate-600/50">
                <div className="flex items-center mb-2">
                  <svg className="w-3 h-3 mr-1" style={{ color: colors.primary }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <p className="text-xs font-medium text-slate-300">Sources:</p>
                </div>
                <div className="flex flex-wrap gap-2">
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
            
            {/* Timestamp */}
            <div className="flex justify-between items-center mt-3">
              <p className={`text-xs ${
                message.type === 'user' ? 'text-white/70' : 'text-slate-400'
              }`}>
                {formatMessageTime(message.timestamp)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
