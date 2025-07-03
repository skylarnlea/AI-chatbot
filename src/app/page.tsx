'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader, BookOpen, User, Bot, Copy, ThumbsUp, ThumbsDown, RotateCcw, Check } from 'lucide-react'

// Define types for our messages
interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  isTyping?: boolean
}

export default function ChatPage() {
  // State to store all chat messages
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! I'm your AI workplace assistant. I can help you navigate company policies, benefits, and procedures. What would you like to know?", 
      sender: 'bot',
      timestamp: new Date()
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
      return data.response
      
    } catch (error) {
      console.error('Error calling AI:', error)
      return "I'm having trouble responding right now. Please try again."
    }
  }

  // Function to handle sending a message
  const sendMessage = async () => {
    if (currentMessage.trim() === '' || isLoading) return
    
    const userMessageText = currentMessage
    
    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now(),
      text: userMessageText,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prevMessages => [...prevMessages, userMessage])
    setCurrentMessage('')
    setIsLoading(true)
    setBotIsTyping(true)
    
    // Simulate realistic typing delay
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // Get AI response
    const aiResponseText = await getAIResponse(userMessageText)
    
    setBotIsTyping(false)
    
    // Add AI response to chat
    const botResponse: Message = {
      id: Date.now() + 1,
      text: aiResponseText,
      sender: 'bot',
      timestamp: new Date()
    }
    
    setMessages(prevMessages => [...prevMessages, botResponse])
    setIsLoading(false)
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

  // Regenerate last bot response
  const regenerateResponse = async () => {
    const lastUserMessage = messages.filter(m => m.sender === 'user').slice(-1)[0]
    if (!lastUserMessage || isLoading) return
    
    // Remove last bot message
    setMessages(prev => prev.filter(m => !(m.sender === 'bot' && m.id === Math.max(...prev.filter(msg => msg.sender === 'bot').map(msg => msg.id)))))
    
    setIsLoading(true)
    setBotIsTyping(true)
    
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const aiResponseText = await getAIResponse(lastUserMessage.text)
    
    setBotIsTyping(false)
    
    const botResponse: Message = {
      id: Date.now(),
      text: aiResponseText,
      sender: 'bot',
      timestamp: new Date()
    }
    
    setMessages(prevMessages => [...prevMessages, botResponse])
    setIsLoading(false)
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
    <div className="flex flex-col h-screen max-w-4xl mx-auto" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Header */}
      <div className="border-b p-4" style={{ backgroundColor: '#2d2d2d', borderColor: '#3a3a3a' }}>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: '#8b5cf6' }}>
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-medium" style={{ color: '#f3f4f6' }}>Employee Handbook Assistant</h1>
            <p className="text-sm" style={{ color: '#9ca3af' }}>AI-powered workplace guidance</p>
          </div>
        </div>
      </div>

      {/* Sample Questions */}
      <div className="border-b p-4" style={{ backgroundColor: '#2d2d2d', borderColor: '#3a3a3a' }}>
        <p className="text-sm mb-2" style={{ color: '#9ca3af' }}>Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((question, index) => {
            const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#6b7280'] // green, blue, purple, light gray
            const bgColor = colors[index % colors.length]
            return (
              <button
                key={index}
                onClick={() => setCurrentMessage(question)}
                className="text-xs px-3 py-1.5 rounded-md transition-colors text-white"
                style={{ 
                  backgroundColor: bgColor,
                  opacity: 0.8
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.8'
                }}
              >
                {question}
              </button>
            )
          })}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: '#1a1a1a' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-2xl space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Avatar */}
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: message.sender === 'user' ? '#d97706' : '#3b82f6'
                }}
              >
                {message.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
              </div>
              
              {/* Message Content */}
              <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className="px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: message.sender === 'user' ? '#d97706' : '#2d2d2d',
                    color: message.sender === 'user' ? '#ffffff' : '#f3f4f6',
                    border: message.sender === 'bot' ? '1px solid #3a3a3a' : 'none'
                  }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                </div>
                
                {/* Message Actions & Timestamp */}
                <div className={`flex items-center space-x-2 mt-1 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <span className="text-xs" style={{ color: '#6b7280' }}>
                    {formatTime(message.timestamp)}
                  </span>
                  
                  {message.sender === 'bot' && (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => copyMessage(message.id, message.text)}
                        className="p-1 rounded transition-colors"
                        style={{ color: '#6b7280' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#6b7280' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280' }}
                        title="Copy message"
                      >
                        {copiedMessageId === message.id ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
                      </button>
                      <button
                        onClick={() => {/* Add thumbs up logic */}}
                        className="p-1 rounded transition-colors"
                        style={{ color: '#6b7280' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#10b981' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280' }}
                        title="Good response"
                      >
                        <ThumbsUp size={14} />
                      </button>
                      <button
                        onClick={() => {/* Add thumbs down logic */}}
                        className="p-1 rounded transition-colors"
                        style={{ color: '#6b7280' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280' }}
                        title="Poor response"
                      >
                        <ThumbsDown size={14} />
                      </button>
                      <button
                        onClick={regenerateResponse}
                        disabled={isLoading}
                        className="p-1 rounded transition-colors disabled:opacity-50"
                        style={{ color: '#6b7280' }}
                        onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.color = '#8b5cf6' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280' }}
                        title="Regenerate response"
                      >
                        <RotateCcw size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Bot Typing Indicator */}
        {botIsTyping && (
          <div className="flex justify-start">
            <div className="flex space-x-3">
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#3b82f6' }}
              >
                <Bot size={16} className="text-white" />
              </div>
              <div 
                className="px-4 py-3 rounded-lg border"
                style={{ 
                  backgroundColor: '#2d2d2d',
                  borderColor: '#3a3a3a'
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#10b981' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#3b82f6', animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#8b5cf6', animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm" style={{ color: '#9ca3af' }}>Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4" style={{ backgroundColor: '#2d2d2d', borderColor: '#3a3a3a' }}>
        <div className="flex space-x-3">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about policies, benefits, or procedures..."
            disabled={isLoading}
            className={`flex-1 rounded-lg px-4 py-3 transition-colors focus:outline-none focus:ring-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{
              backgroundColor: '#374151',
              color: '#f3f4f6',
              border: '1px solid #4b5563'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#8b5cf6'
              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.2)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#4b5563'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || currentMessage.trim() === ''}
            className="px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: isLoading || currentMessage.trim() === '' ? '#4b5563' : '#10b981',
              color: '#ffffff'
            }}
            onMouseEnter={(e) => {
              if (!isLoading && currentMessage.trim() !== '') {
                e.currentTarget.style.backgroundColor = '#059669'
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && currentMessage.trim() !== '') {
                e.currentTarget.style.backgroundColor = '#10b981'
              }
            }}
          >
            {isLoading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  )
}