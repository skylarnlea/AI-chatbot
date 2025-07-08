// src/components/ChatInterface.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Message, ChatRequest, ChatResponse, ErrorResponse, ChatSession } from '@/types/chat';
import { colors } from '@/styles/colors';
import { 
  saveChatSession,  
  getChatSession, 
  deleteChatSession, 
  generateChatTitle, 
  generateSessionId,
  getRecentSessions 
} from '@/lib/chatStorage';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history on component mount
  useEffect(() => {
    setChatHistory(getRecentSessions());
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update welcome state based on messages
  useEffect(() => {
    setShowWelcome(messages.length === 0);
  }, [messages]);

  // Save current session when messages change
  useEffect(() => {
    if (messages.length > 0 && currentSessionId) {
      const firstUserMessage = messages.find(m => m.type === 'user')?.content || 'New Chat';
      const session: ChatSession = {
        id: currentSessionId,
        title: generateChatTitle(firstUserMessage),
        messages,
        createdAt: new Date(messages[0]?.timestamp || new Date()),
        updatedAt: new Date()
      };
      
      saveChatSession(session);
      setChatHistory(getRecentSessions());
    }
  }, [messages, currentSessionId]);

  const topicQuestions = {
    'Company Policies': [
      "What's our dress code policy?",
      "What are the remote work guidelines?",
      "Tell me about our code of conduct",
      "What's the vacation request process?",
      "What are our office hours?",
      "What's the expense reimbursement policy?"
    ],
    'HR Questions': [
      "How do I update my personal information?",
      "What benefits am I eligible for?",
      "How do I request time off?",
      "What's our performance review process?",
      "How do I report a workplace issue?",
      "What's our parental leave policy?"
    ],
    'IT Support': [
      "How do I reset my password?",
      "How do I connect to the company VPN?",
      "What software is available for download?",
      "How do I report a technical issue?",
      "How do I request new equipment?",
      "What's our data backup policy?"
    ],
    'Benefits': [
      "What health insurance options do we have?",
      "How does our 401k matching work?",
      "What's included in our dental coverage?",
      "Do we have a gym membership reimbursement?",
      "What professional development budget is available?",
      "What life insurance coverage do we provide?"
    ]
  };

  const topics = [
    { name: 'Company Policies' },
    { name: 'HR Questions' },
    { name: 'IT Support' },
    { name: 'Benefits' }
  ];

  const quickActions = [
    "What are our vacation days?",
    "How does remote work work?", 
    "What benefits do we have?",
    "How do I submit expenses?",
    "What's our sick leave policy?",
    "Tell me about the code of conduct"
  ];

  const generateMessageId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleTopicClick = (topicName: string) => {
    setSelectedTopic(selectedTopic === topicName ? null : topicName);
  };

  const handleQuickAction = (action: string) => {
    // Start new session if none exists
    if (!currentSessionId) {
      setCurrentSessionId(generateSessionId());
    }
    
    setInput(action);
    // Auto-send the quick action
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setIsLoading(false);
    setShowWelcome(true);
    setSelectedTopic(null);
    setCurrentSessionId(null);
    setShowHistory(false);
  };

  const handleStartNewSession = () => {
    const newSessionId = generateSessionId();
    setCurrentSessionId(newSessionId);
    setMessages([]);
    setInput('');
    setIsLoading(false);
    setShowWelcome(true);
    setSelectedTopic(null);
    setShowHistory(false);
  };

  const handleLoadChatSession = (sessionId: string) => {
    const session = getChatSession(sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);
      setShowWelcome(false);
      setSelectedTopic(null);
      setShowHistory(false);
    }
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent loading the session when deleting
    deleteChatSession(sessionId);
    setChatHistory(getRecentSessions());
    
    // If we're deleting the current session, start a new one
    if (sessionId === currentSessionId) {
      handleNewChat();
    }
  };

  const formatSessionDate = (date: Date): string => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // Less than a week
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const handlePolicyClick = (policyTitle: string) => {
    console.log(`Policy clicked: ${policyTitle}`);
    
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity`;
    notification.style.backgroundColor = colors.orange;
    notification.textContent = `Policy: ${policyTitle} (Feature coming soon)`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Start new session if none exists
    if (!currentSessionId) {
      setCurrentSessionId(generateSessionId());
    }

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
          sources: chatResponse.sources,
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Chat Container */}
      <div 
        className="rounded-lg shadow-lg h-[700px] flex flex-col border border-gray-700"
        style={{ backgroundColor: colors.black }}
      >
        {/* Chat Header */}
        <div 
          className="text-white p-4 rounded-t-lg border-b border-gray-600"
          style={{ backgroundColor: colors.grayDark }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: colors.orange }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
                <p className="text-gray-300 text-sm">Ready to help with your questions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: colors.orange }}
                ></div>
                <span className="text-sm text-gray-300">Online</span>
              </div>
              
              {/* Chat History Button */}
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm"
                style={{ backgroundColor: colors.grayMedium }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.grayMedium}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>History</span>
              </button>

              {!showWelcome && (
                <button
                  onClick={handleStartNewSession}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm"
                  style={{ backgroundColor: colors.grayMedium }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.grayMedium}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>New Chat</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          className="flex-1 overflow-y-auto p-6 space-y-4"
          style={{ backgroundColor: colors.grayDark }}
        >
          {showHistory ? (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Chat History</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {chatHistory.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>No chat history yet</p>
                  <p className="text-sm mt-2">Start a conversation to see it here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {chatHistory.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => handleLoadChatSession(session.id)}
                      className="p-4 rounded-lg border border-gray-600 cursor-pointer transition-all duration-200 hover:border-orange-500 group"
                      style={{ backgroundColor: colors.grayMedium }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.grayDark;
                        e.currentTarget.style.borderColor = colors.orange;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = colors.grayMedium;
                        e.currentTarget.style.borderColor = '#4b5563';
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium truncate">{session.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-400">
                              {session.messages.length} messages
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-400">
                              {formatSessionDate(session.updatedAt)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleDeleteSession(session.id, e)}
                          className="ml-2 p-1 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : showWelcome ? (
            <div className="text-center text-gray-400 mt-16">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: colors.grayMedium }}
              >
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ color: colors.orange }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Start a conversation</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Ask me anything about company policies, HR questions, IT support, or general workplace information.
              </p>
              
              {/* Topic Badges */}
              <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto mb-6">
                {topics.map((topic) => (
                  <button
                    key={topic.name}
                    onClick={() => handleTopicClick(topic.name)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 ${
                      selectedTopic === topic.name ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-gray-800' : ''
                    }`}
                    style={{ 
                      backgroundColor: colors.orange,
                      borderColor: colors.orange,
                      color: colors.white
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.orangeHover}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.orange}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
              
              {/* Topic-Specific Questions */}
              {selectedTopic && (
                <div className="max-w-2xl mx-auto mb-6">
                  <div 
                    className="rounded-lg p-4 border border-gray-600"
                    style={{ backgroundColor: colors.grayMedium }}
                  >
                    <h4 
                      className="text-sm font-medium mb-3 text-center flex items-center justify-center"
                      style={{ color: colors.orange }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Sample questions for {selectedTopic}:
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {topicQuestions[selectedTopic as keyof typeof topicQuestions]?.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickAction(question)}
                          className="text-left p-3 border border-gray-600 rounded-lg text-gray-300 hover:text-white text-sm transition-all duration-200 group"
                          style={{ backgroundColor: colors.grayDark }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.grayMedium;
                            e.currentTarget.style.borderColor = colors.orange;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = colors.grayDark;
                            e.currentTarget.style.borderColor = '#4b5563';
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span>{question}</span>
                            <svg 
                              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                              style={{ color: colors.orange }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedTopic(null)}
                      className="mt-3 w-full text-center text-xs text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      ← Back to all topics
                    </button>
                  </div>
                </div>
              )}
              
              {/* General Quick Actions */}
              {!selectedTopic && (
                <div className="max-w-2xl mx-auto">
                  <h4 className="text-gray-300 text-sm font-medium mb-3 text-center">Quick Questions:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action)}
                        className="text-left p-3 border border-gray-600 rounded-lg text-gray-300 hover:text-white text-sm transition-all duration-200 group"
                        style={{ backgroundColor: colors.grayMedium }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = colors.grayDark;
                          e.currentTarget.style.borderColor = colors.orange;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = colors.grayMedium;
                          e.currentTarget.style.borderColor = '#4b5563';
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{action}</span>
                          <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
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
                  
                  {/* Message Bubble */}
                  <div
                    className="px-4 py-3 rounded-lg border"
                    style={{
                      backgroundColor: message.type === 'user' ? colors.orange : colors.grayMedium,
                      borderColor: message.type === 'user' ? colors.orange : '#4b5563',
                      color: colors.white
                    }}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    
                    {/* Sources */}
                    {message.type === 'bot' && message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <p className="text-xs text-gray-400 mb-2">Sources:</p>
                        <div className="flex flex-wrap gap-1">
                          {message.sources.map((source, idx) => (
                            <button
                              key={idx}
                              onClick={() => handlePolicyClick(source.title)}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs text-white transition-colors cursor-pointer"
                              style={{ backgroundColor: colors.orange }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.orangeHover}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.orange}
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              {source.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-orange-100' : 'text-gray-400'}`}>
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
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border"
                  style={{ 
                    backgroundColor: colors.grayMedium,
                    color: colors.white,
                    borderColor: '#4b5563'
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div 
                  className="px-4 py-3 rounded-lg border"
                  style={{ 
                    backgroundColor: colors.grayMedium,
                    borderColor: '#4b5563',
                    color: colors.white
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div 
                      className="animate-spin rounded-full h-4 w-4 border-b-2"
                      style={{ borderColor: colors.orange }}
                    ></div>
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div 
          className="border-t p-4 rounded-b-lg"
          style={{ 
            backgroundColor: colors.grayMedium,
            borderColor: '#4b5563'
          }}
        >
          <form onSubmit={sendMessage} className="flex space-x-4">
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
              disabled={isLoading}
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
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
      </div>
    </div>
  );
}