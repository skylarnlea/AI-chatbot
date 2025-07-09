// src/hooks/useChat.ts
import { useState, useCallback } from 'react';
import { Message, ChatRequest, ChatResponse, ErrorResponse } from '@/types/chat';
import { 
  generateMessageId, 
  createUserMessage, 
  createErrorMessage,
  isValidMessage 
} from '@/utils/chatHelpers';

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  setMessages: (messages: Message[]) => void;
}

export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = useCallback(async (content: string): Promise<void> => {
    // Validate message
    if (!isValidMessage(content) || isLoading) {
      return;
    }

    // Create user message
    const userMessage = createUserMessage(content);
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const requestBody: ChatRequest = {
        message: content.trim(),
        timestamp: new Date().toISOString()
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data: ChatResponse | ErrorResponse = await response.json();

      if (response.ok) {
        const chatResponse = data as ChatResponse;
        const botMessage: Message = {
          id: generateMessageId(),
          type: 'bot',
          content: chatResponse.response,
          timestamp: new Date(chatResponse.timestamp),
          sources: chatResponse.sources,
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorData = data as ErrorResponse;
        throw new Error(errorData.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = createErrorMessage(
        'Sorry, I encountered an error. Please try again later.'
      );
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    setMessages,
  };
};