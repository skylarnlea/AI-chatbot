// src/lib/chatStorage.ts
import { ChatSession, Message, PolicySource } from '@/types/chat';

const STORAGE_KEY = 'chat_history';
const MAX_SESSIONS = 50; // Limit to prevent storage bloat

// Generate a chat title from the first user message
export const generateChatTitle = (firstMessage: string): string => {
  const maxLength = 40;
  if (firstMessage.length <= maxLength) {
    return firstMessage;
  }
  return firstMessage.substring(0, maxLength - 3) + '...';
};

// Generate session ID
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Save chat session to localStorage
export const saveChatSession = (session: ChatSession): void => {
  try {
    const existingSessions = getChatHistory();
    
    // Check if session already exists (update it)
    const existingIndex = existingSessions.findIndex((s: ChatSession) => s.id === session.id);
    
    if (existingIndex >= 0) {
      existingSessions[existingIndex] = {
        ...session,
        updatedAt: new Date()
      };
    } else {
      // Add new session at the beginning
      existingSessions.unshift({
        ...session,
        updatedAt: new Date()
      });
    }
    
    // Keep only the most recent sessions
    const trimmedSessions = existingSessions.slice(0, MAX_SESSIONS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedSessions, (key: string, value: unknown) => {
      // Convert Date objects to ISO strings for storage
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    }));
  } catch (error) {
    console.error('Failed to save chat session:', error);
  }
};

// Types for stored data (with string dates)
interface StoredMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: string; // ISO string
  sources?: PolicySource[];
}

interface StoredChatSession {
  id: string;
  title: string;
  messages: StoredMessage[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

// Load chat history from localStorage
export const getChatHistory = (): ChatSession[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const sessions: StoredChatSession[] = JSON.parse(stored);
    
    // Convert ISO strings back to Date objects with proper typing
    return sessions.map((session: StoredChatSession): ChatSession => ({
      id: session.id,
      title: session.title,
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
      messages: session.messages.map((message: StoredMessage): Message => ({
        id: message.id,
        type: message.type,
        content: message.content,
        timestamp: new Date(message.timestamp),
        sources: message.sources
      }))
    }));
  } catch (error) {
    console.error('Failed to load chat history:', error);
    return [];
  }
};

// Load specific chat session
export const getChatSession = (sessionId: string): ChatSession | null => {
  const sessions = getChatHistory();
  return sessions.find((s: ChatSession) => s.id === sessionId) || null;
};

// Delete a chat session
export const deleteChatSession = (sessionId: string): void => {
  try {
    const sessions = getChatHistory();
    const filteredSessions = sessions.filter((s: ChatSession) => s.id !== sessionId);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSessions, (key: string, value: unknown) => {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    }));
  } catch (error) {
    console.error('Failed to delete chat session:', error);
  }
};

// Clear all chat history
export const clearChatHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear chat history:', error);
  }
};

// Get recent sessions (last 10)
export const getRecentSessions = (): ChatSession[] => {
  const sessions = getChatHistory();
  return sessions.slice(0, 10);
};