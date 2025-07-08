// src/components/chat/ChatInput.tsx
import React, { useState, useCallback } from 'react';
import { colors } from '@/styles/colors';
import { isValidMessage } from '@/utils/chatHelpers';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  disabled = false
}) => {
  const [input, setInput] = useState<string>('');

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isValidMessage(input) || isLoading || disabled) {
      return;
    }

    onSendMessage(input);
    setInput('');
  }, [input, isLoading, disabled, onSendMessage]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  }, []);

  const canSend = isValidMessage(input) && !isLoading && !disabled;

  return (
    <div 
      className="border-t p-4 rounded-b-lg"
      style={{ 
        backgroundColor: colors.grayMedium,
        borderColor: '#4b5563'
      }}
    >
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-gray-200 placeholder-gray-500"
          style={{ 
            backgroundColor: colors.grayDark,
            borderColor: '#4b5563'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = colors.orange}
          onBlur={(e) => e.currentTarget.style.borderColor = '#4b5563'}
          disabled={isLoading || disabled}
          maxLength={1000}
        />
        <button
          type="submit"
          disabled={!canSend}
          className="px-6 py-3 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ backgroundColor: colors.orange }}
          onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = colors.orangeHover)}
          onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = colors.orange)}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
      <p className="text-xs text-gray-400 mt-2">
        Press Enter to send • {input.length}/1000 characters
      </p>
    </div>
  );
};