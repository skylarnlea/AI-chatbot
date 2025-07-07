// src/components/ChatInterface.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Message, ChatRequest, ChatResponse, ErrorResponse } from '@/types/chat';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateMessageId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateMessageId(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const requestBody: ChatRequest = { 
        message: input.trim(),
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
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorData = data as ErrorResponse;
        throw new Error(errorData.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: generateMessageId(),
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Company AI Assistant
        </h1>
        <p className="text-lg text-gray-600">
          Ask questions about company policies, procedures, or get general help
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-lg shadow-sm h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-800 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold">AI Assistant</h2>
                <p className="text-gray-300 text-sm">Ready to help with your questions</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-300">Online</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-16">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Start a conversation</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Ask me anything about company policies, HR questions, IT support, or general workplace information.
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">Company Policies</span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">HR Questions</span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">IT Support</span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">Benefits</span>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
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
                  
                  {/* Message Bubble */}
                  <div
                    className={`px-4 py-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-gray-800 text-white'
                        : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-2xl">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-800"></div>
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
          <form onSubmit={sendMessage} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              disabled={isLoading}
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send • {input.length}/1000 characters
          </p>
        </div>
      </div>
    </div>
  );
};