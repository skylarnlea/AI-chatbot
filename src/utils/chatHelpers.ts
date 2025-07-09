import { Message } from '@/types/chat';

// Generate unique message ID
export const generateMessageId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Generate unique session ID
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Generate chat title from first message
export const generateChatTitle = (firstMessage: string): string => {
  const maxLength = 40;
  if (firstMessage.length <= maxLength) {
    return firstMessage;
  }
  return firstMessage.substring(0, maxLength - 3) + '...';
};

// Get first user message from conversation
export const getFirstUserMessage = (messages: Message[]): string => {
  const firstUserMessage = messages.find(m => m.type === 'user');
  return firstUserMessage?.content || 'New Chat';
};

// Check if conversation is empty
export const isConversationEmpty = (messages: Message[]): boolean => {
  return messages.length === 0;
};

// Get conversation message count
export const getMessageCount = (messages: Message[]): number => {
  return messages.length;
};

// Get conversation duration
export const getConversationDuration = (messages: Message[]): number => {
  if (messages.length < 2) return 0;
  
  const firstMessage = messages[0];
  const lastMessage = messages[messages.length - 1];
  
  return lastMessage.timestamp.getTime() - firstMessage.timestamp.getTime();
};

// Check if message has sources
export const messageHasSources = (message: Message): boolean => {
  return message.type === 'bot' && !!message.sources && message.sources.length > 0;
};

// Validate message content
export const isValidMessage = (content: string): boolean => {
  return content.trim().length > 0 && content.length <= 1000;
};

// Create error message
export const createErrorMessage = (error: string): Message => {
  return {
    id: generateMessageId(),
    type: 'bot',
    content: error,
    timestamp: new Date(),
  };
};

// Create user message
export const createUserMessage = (content: string): Message => {
  return {
    id: generateMessageId(),
    type: 'user',
    content: content.trim(),
    timestamp: new Date(),
  };
};