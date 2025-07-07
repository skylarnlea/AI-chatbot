'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader, BookOpen, User, Bot, Copy, ThumbsUp, ThumbsDown, RotateCcw, Check, FileText, Clock, Tag } from 'lucide-react'

// Define types for our messages
interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  isTyping?: boolean
  policies?: string[]
  isAnimating?: boolean
}

export default function ChatPage() {
  // State to store all chat messages
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! I'm your AI workplace assistant. I can help you navigate company policies, benefits, and procedures. What would you like to know?", 
      sender: 'bot',
      timestamp: new Date(),
      policies: ['Welcome Guide']
    }
  ])
  
  // State to store the current message being typed
  const [currentMessage, setCurrentMessage] = useState('')
  
  // State to track if AI is responding
  const [isLoading, setIsLoading] = useState(false)
  
  // State to track if bot is "typing"
  const [botIsTyping, setBotIsTyping] = useState(false)
  
  // State for copy feedback
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null)

    // State for message reactions
  const [likedMessages, setLikedMessages] = useState<Set<number>>(new Set())
  const [dislikedMessages, setDislikedMessages] = useState<Set<number>>(new Set())
  
  // State for expanded messages
  const [expandedMessages, setExpandedMessages] = useState<Set<number>>(new Set())
  
  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, botIsTyping])

  // Function to call our API route
  const getAIResponse = async (userMessage: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      return {
        response: data.response,
        policies: data.relevantPolicies || []
      }
      
    } catch (error) {
      console.error('Error calling AI:', error)
      return {
        response: "I'm having trouble responding right now. Please try again.",
        policies: []
      }
    }
  }

  // Function to handle sending a message
  const sendMessage = async () => {
    if (currentMessage.trim() === '' || isLoading) return
    
    const userMessageText = currentMessage
    
    // Add user message to the chat with animation
    const userMessage: Message = {
      id: Date.now(),
      text: userMessageText,
      sender: 'user',
      timestamp: new Date(),
      isAnimating: true
    }
    
    setMessages(prevMessages => [...prevMessages, userMessage])
    setCurrentMessage('')
    setIsLoading(true)
    setBotIsTyping(true)
    
    // Remove animation state after animation completes
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, isAnimating: false } : msg
      ))
    }, 500)
    
    // Simulate realistic typing delay
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    // Get AI response
    const { response: aiResponseText, policies } = await getAIResponse(userMessageText)
    
    setBotIsTyping(false)
    
    // Add AI response to chat with animation
    const botResponse: Message = {
      id: Date.now() + 1,
      text: aiResponseText,
      sender: 'bot',
      timestamp: new Date(),
      policies,
      isAnimating: true
    }
    
    setMessages(prevMessages => [...prevMessages, botResponse])
    setIsLoading(false)
    
    // Remove animation state after animation completes
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === botResponse.id ? { ...msg, isAnimating: false } : msg
      ))
    }, 500)
  }

  // Handle Enter key press to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage()
    }
  }

  // Copy message to clipboard
  const copyMessage = async (messageId: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (error) {
      console.error('Failed to copy message:', error)
    }
  }

  // Handle thumbs up
  const handleThumbsUp = async (messageId: number) => {
    setLikedMessages(prev => {
      const newSet = new Set(prev)
      newSet.add(messageId)
      return newSet
    })
    // Remove from disliked if it was there
    setDislikedMessages(prev => {
      const newSet = new Set(prev)
      newSet.delete(messageId)
      return newSet
    })
    
    // Optional: Send feedback to analytics API
    console.log('User liked message:', messageId)
  }

  const handleThumbsDown = async (messageId: number) => {
    setDislikedMessages(prev => {
      const newSet = new Set(prev)
      newSet.add(messageId)
      return newSet
    })
    // Remove from liked if it was there
    setLikedMessages(prev => {
      const newSet = new Set(prev)
      newSet.delete(messageId)
      return newSet
    })
    
    // Optional: Show feedback modal or send to API
    console.log('User disliked message:', messageId)
  }

  // Enhanced regenerate response
  const regenerateResponse = async () => {
    const lastUserMessage = messages.filter(m => m.sender === 'user').slice(-1)[0]
    if (!lastUserMessage || isLoading) return
    
    // Remove last bot message
    setMessages(prev => {
      const botMessages = prev.filter(m => m.sender === 'bot')
      if (botMessages.length === 0) return prev
      
      const lastBotMessageId = Math.max(...botMessages.map(m => m.id))
      return prev.filter(m => m.id !== lastBotMessageId)
    })
    
    setIsLoading(true)
    setBotIsTyping(true)
    
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    // Get new AI response
    const { response: aiResponseText, policies } = await getAIResponse(lastUserMessage.text)
    
    setBotIsTyping(false)
    
    // Add new AI response
    const newBotResponse: Message = {
      id: Date.now(),
      text: aiResponseText,
      sender: 'bot',
      timestamp: new Date(),
      policies,
      isAnimating: true
    }
    
    setMessages(prevMessages => [...prevMessages, newBotResponse])
    setIsLoading(false)
    
    // Remove animation state
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newBotResponse.id ? { ...msg, isAnimating: false } : msg
      ))
    }, 500)
  }


  // Toggle message expansion
  const toggleExpanded = (messageId: number) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
      }
      return newSet
    })
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Sample questions for users to try
  const sampleQuestions = [
    "How much vacation time do I get?",
    "What's the remote work policy?",
    "What benefits do we offer?",
    "How do I submit expenses?"
  ]

  return (
    <div className="flex h-screen max-w-6xl mx-auto" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-6" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl shadow-lg" style={{ backgroundColor: '#ff6b35' }}>
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold" style={{ color: '#ffffff' }}>Employee Handbook Assistant</h1>
              <p className="text-sm" style={{ color: '#a0a0a0' }}>Connected experiences that matter</p>
            </div>
          </div>
        </div>

        {/* Sample Questions */}
        <div className="border-b p-4" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
          <p className="text-sm mb-3 font-medium" style={{ color: '#a0a0a0' }}>Quick starters:</p>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((question, index) => {
              const colors = ['#6b7280']
              const bgColor = colors[index % colors.length]
              return (
                <button
                  key={index}
                  onClick={() => setCurrentMessage(question)}
                  className="text-xs px-4 py-2 rounded-lg transition-all duration-200 text-white transform hover:scale-105 hover:shadow-lg"
                  style={{ 
                    backgroundColor: bgColor,
                    opacity: 0.9
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.9'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  {question}
                </button>
              )
            })}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ backgroundColor: '#0a0a0a' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex transition-all duration-500 ease-out ${
                message.isAnimating 
                  ? message.sender === 'user' 
                    ? 'translate-x-4 opacity-0' 
                    : '-translate-x-4 opacity-0'
                  : 'translate-x-0 opacity-100'
              } ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-2xl ${message.sender === 'user' ? 'ml-12' : 'mr-12'}`}>
                {/* Message Card */}
                <div
                  className={`rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl ${
                    message.sender === 'user' 
                      ? 'hover:shadow-orange-500/20' 
                      : 'hover:shadow-blue-500/20'
                  }`}
                  style={{
                    backgroundColor: message.sender === 'user' ? '#ff6b35' : '#1a1a1a',
                    borderColor: message.sender === 'user' ? '#ff6b35' : '#2a2a2a'
                  }}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between p-4 pb-2">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                        style={{ 
                          backgroundColor: message.sender === 'user' ? '#e55a2b' : '#2563eb'
                        }}
                      >
                        {message.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: message.sender === 'user' ? '#ffffff' : '#ffffff' }}>
                          {message.sender === 'user' ? 'You' : 'AI Assistant'}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Clock size={12} style={{ color: message.sender === 'user' ? '#ffb8a1' : '#a0a0a0' }} />
                          <span className="text-xs" style={{ color: message.sender === 'user' ? '#ffb8a1' : '#a0a0a0' }}>
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Policy Tags */}
                    {message.policies && message.policies.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <Tag size={14} style={{ color: '#ff6b35' }} />
                        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#ff6b35', color: '#ffffff' }}>
                          {message.policies.length} policy{message.policies.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="px-4 pb-4">
                    <div className={`${message.text.length > 300 && !expandedMessages.has(message.id) ? 'relative' : ''}`}>
                      <p 
                        className={`text-sm leading-relaxed whitespace-pre-wrap ${
                          message.text.length > 300 && !expandedMessages.has(message.id) ? 'line-clamp-4' : ''
                        }`}
                        style={{ color: message.sender === 'user' ? '#ffffff' : '#e0e0e0' }}
                      >
                        {message.text.length > 300 && !expandedMessages.has(message.id) 
                          ? message.text.substring(0, 300) + '...'
                          : message.text
                        }
                      </p>
                      
                      {message.text.length > 300 && (
                        <button
                          onClick={() => toggleExpanded(message.id)}
                          className="mt-2 text-xs font-medium transition-colors"
                          style={{ color: message.sender === 'user' ? '#ffb8a1' : '#2563eb' }}
                        >
                          {expandedMessages.has(message.id) ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </div>

                    {/* Policy References */}
                    {message.policies && message.policies.length > 0 && expandedMessages.has(message.id) && (
                      <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#2a2a2a' }}>
                        <div className="flex items-center space-x-2 mb-2">
                          <FileText size={14} style={{ color: '#ff6b35' }} />
                          <span className="text-xs font-medium" style={{ color: '#ff6b35' }}>
                            Referenced Policies
                          </span>
                        </div>
                        <div className="space-y-1">
                          {message.policies.map((policy, index) => (
                            <div key={index} className="text-xs" style={{ color: '#c0c0c0' }}>
                              • {policy}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  {message.sender === 'bot' && (
                    <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: '#2a2a2a' }}>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyMessage(message.id, message.text)}
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: '#6b7280', backgroundColor: 'transparent' }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2a2a2a' }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                          title="Copy message"
                        >
                          {copiedMessageId === message.id ? <Check size={16} style={{ color: '#ff6b35' }} /> : <Copy size={16} />}
                        </button>
                        <button
                          onClick={() => handleThumbsUp(message.id)}
                          className="p-2 rounded-lg transition-colors"
                          style={{ 
                            color: likedMessages.has(message.id) ? '#ff6b35' : '#6b7280', 
                            backgroundColor: 'transparent' 
                          }}
                          onMouseEnter={(e) => { 
                            if (!likedMessages.has(message.id)) {
                              e.currentTarget.style.color = '#ff6b35'
                            }
                            e.currentTarget.style.backgroundColor = '#2a2a2a'
                          }}
                          onMouseLeave={(e) => { 
                            e.currentTarget.style.color = likedMessages.has(message.id) ? '#ff6b35' : '#6b7280'
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }}
                          title="Good response"
                        >
                          <ThumbsUp size={16} />
                        </button>
                        <button
                          onClick={() => handleThumbsDown(message.id)}
                          className="p-2 rounded-lg transition-colors"
                          style={{ 
                            color: dislikedMessages.has(message.id) ? '#ef4444' : '#6b7280', 
                            backgroundColor: 'transparent' 
                          }}
                          onMouseEnter={(e) => { 
                            if (!dislikedMessages.has(message.id)) {
                              e.currentTarget.style.color = '#ef4444'
                            }
                            e.currentTarget.style.backgroundColor = '#2a2a2a'
                          }}
                          onMouseLeave={(e) => { 
                            e.currentTarget.style.color = dislikedMessages.has(message.id) ? '#ef4444' : '#6b7280'
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }}
                          title="Poor response"
                        >
                          <ThumbsDown size={16} />
                        </button>
                      </div>
                      
                      <button
                        onClick={regenerateResponse}
                        disabled={isLoading}
                        className="p-2 rounded-lg transition-colors disabled:opacity-50"
                        style={{ color: '#6b7280', backgroundColor: 'transparent' }}
                        onMouseEnter={(e) => { 
                          if (!isLoading) {
                            e.currentTarget.style.color = '#2563eb'
                            e.currentTarget.style.backgroundColor = '#2a2a2a'
                          }
                        }}
                        onMouseLeave={(e) => { 
                          e.currentTarget.style.color = '#6b7280'
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                        title="Regenerate response"
                      >
                        <RotateCcw size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Bot Typing Card */}
          {botIsTyping && (
            <div className="flex justify-start">
              <div className="max-w-2xl mr-12">
                <div
                  className="rounded-2xl shadow-lg border p-4"
                  style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: '#2563eb' }}>
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#ff6b35' }}></div>
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#2563eb', animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#7c3aed', animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm" style={{ color: '#a0a0a0' }}>Creating connected experiences...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-6" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
          <div className="flex space-x-4">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about policies, benefits, or procedures..."
              disabled={isLoading}
              className={`flex-1 rounded-xl px-6 py-4 transition-all duration-200 focus:outline-none focus:ring-2 shadow-lg ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{
                backgroundColor: '#2a2a2a',
                color: '#ffffff',
                border: '1px solid #3a3a3a'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#ff6b35'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#3a3a3a'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || currentMessage.trim() === ''}
              className="px-6 py-4 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                backgroundColor: isLoading || currentMessage.trim() === '' ? '#3a3a3a' : '#ff6b35',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => {
                if (!isLoading && currentMessage.trim() !== '') {
                  e.currentTarget.style.backgroundColor = '#e55a2b'
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && currentMessage.trim() !== '') {
                  e.currentTarget.style.backgroundColor = '#ff6b35'
                }
              }}
            >
              {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}