// src/components/ChatInterface.tsx (Refactored)
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatSession } from '@/types/chat';
import { colors } from '@/styles/colors';

// Import storage functions directly for now
import { 
  saveChatSession, 
  getChatSession, 
  deleteChatSession, 
  getRecentSessions 
} from '@/lib/chatStorage';

// Custom Hooks
import { useChat } from '@/hooks/useChat';
import { useNotification } from '@/hooks/useNotification';

// Components
import { ChatHeader } from './chat/ChatHeader';
import { ChatInput } from './chat/ChatInput';
import { MessageBubble } from './chat/MessageBubble';
import { LoadingMessage } from './chat/LoadingMessage';
import { WelcomeScreen } from './welcome/WelcomeScreen';
import { ChatHistory } from './history/ChatHistory';

// Utils
import { 
  isConversationEmpty, 
  generateSessionId, 
  generateChatTitle, 
  getFirstUserMessage 
} from '@/utils/chatHelpers';

export default function ChatInterface() {
  // Custom hooks
  const { messages, isLoading, sendMessage, setMessages, clearMessages } = useChat();
  const { showPolicyNotification } = useNotification();

  // Local state
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Computed values
  const showWelcome = isConversationEmpty(messages);

  // Load chat history on mount
  useEffect(() => {
    setChatHistory(getRecentSessions());
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save session when messages change
  useEffect(() => {
    if (messages.length > 0 && currentSessionId) {
      const firstUserMessage = getFirstUserMessage(messages);
      const session: ChatSession = {
        id: currentSessionId,
        title: generateChatTitle(firstUserMessage),
        messages,
        createdAt: new Date(messages[0]?.timestamp || new Date()),
        updatedAt: new Date(),
      };
      
      saveChatSession(session);
      setChatHistory(getRecentSessions());
    }
  }, [messages, currentSessionId]);

  // Event handlers
  const handleTopicClick = (topicName: string) => {
    setSelectedTopic(selectedTopic === topicName ? null : topicName);
  };

  const handleQuickAction = async (action: string) => {
    // Start new session if none exists
    if (!currentSessionId) {
      setCurrentSessionId(generateSessionId());
    }
    
    setSelectedTopic(null);
    await sendMessage(action);
  };

  const handleSendMessage = async (content: string) => {
    // Start new session if none exists
    if (!currentSessionId) {
      setCurrentSessionId(generateSessionId());
    }
    
    await sendMessage(content);
  };

  const handleNewChat = () => {
    setCurrentSessionId(generateSessionId());
    clearMessages();
    setSelectedTopic(null);
    setShowHistory(false);
  };

  const handleLoadSession = (sessionId: string) => {
    const session = getChatSession(sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);
      setSelectedTopic(null);
      setShowHistory(false);
    }
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChatSession(sessionId);
    setChatHistory(getRecentSessions());
    
    // If we're deleting the current session, start a new one
    if (sessionId === currentSessionId) {
      handleNewChat();
    }
  };

  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handlePolicyClick = (policyTitle: string) => {
    showPolicyNotification(policyTitle);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Chat Container */}
      <div 
        className="rounded-lg shadow-lg h-[600px] flex flex-col border border-gray-700"
        style={{ backgroundColor: colors.black }}
      >
        <ChatHeader 
          showWelcome={showWelcome}
          showHistory={showHistory}
          onToggleHistory={handleToggleHistory}
          onNewChat={handleNewChat}
        />

        {/* Messages Area */}
        <div 
          className="flex-1 overflow-y-auto p-6 space-y-4"
          style={{ backgroundColor: colors.grayDark }}
        >
          {showHistory ? (
            <ChatHistory
              chatHistory={chatHistory}
              onLoadSession={handleLoadSession}
              onDeleteSession={handleDeleteSession}
              onClose={() => setShowHistory(false)}
            />
          ) : showWelcome ? (
            <WelcomeScreen
              selectedTopic={selectedTopic}
              onTopicClick={handleTopicClick}
              onQuickAction={handleQuickAction}
            />
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onPolicyClick={handlePolicyClick}
                />
              ))}
              {isLoading && <LoadingMessage />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          disabled={showHistory}
        />
      </div>
    </div>
  );
};