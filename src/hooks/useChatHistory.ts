// src/hooks/useChatHistory.ts
import { useState, useCallback, useEffect } from 'react';
import { ChatSession, Message } from '@/types/chat';
import {
  saveChatSession,
  getChatSession,
  deleteChatSession,
  getRecentSessions,
} from '@/lib/chatStorage';
import { generateChatTitle, getFirstUserMessage } from '@/utils/chatHelpers';

interface UseChatHistoryReturn {
  chatHistory: ChatSession[];
  currentSessionId: string | null;
  loadSession: (sessionId: string) => ChatSession | null;
  deleteSession: (sessionId: string) => void;
  saveCurrentSession: (messages: Message[], sessionId: string) => void;
  createNewSession: () => string;
  refreshHistory: () => void;
}

export const useChatHistory = (): UseChatHistoryReturn => {
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Load history on mount
  useEffect(() => {
    setChatHistory(getRecentSessions());
  }, []);

  const refreshHistory = useCallback(() => {
    setChatHistory(getRecentSessions());
  }, []);

  const loadSession = useCallback((sessionId: string): ChatSession | null => {
    const session = getChatSession(sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      return session;
    }
    return null;
  }, []);

  const deleteSession = useCallback((sessionId: string) => {
    deleteChatSession(sessionId);
    refreshHistory();
    
    // If we're deleting the current session, clear it
    if (sessionId === currentSessionId) {
      setCurrentSessionId(null);
    }
  }, [currentSessionId, refreshHistory]);

  const saveCurrentSession = useCallback((messages: Message[], sessionId: string) => {
    if (messages.length === 0) return;

    const firstUserMessage = getFirstUserMessage(messages);
    const session: ChatSession = {
      id: sessionId,
      title: generateChatTitle(firstUserMessage),
      messages,
      createdAt: new Date(messages[0]?.timestamp || new Date()),
      updatedAt: new Date(),
    };

    saveChatSession(session);
    refreshHistory();
  }, [refreshHistory]);

  const createNewSession = useCallback((): string => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setCurrentSessionId(newSessionId);
    return newSessionId;
  }, []);

  return {
    chatHistory,
    currentSessionId,
    loadSession,
    deleteSession,
    saveCurrentSession,
    createNewSession,
    refreshHistory,
  };
};