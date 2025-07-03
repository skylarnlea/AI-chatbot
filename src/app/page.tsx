'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader, BookOpen, User, Bot, Copy, ThumbsUp, ThumbsDown, RotateCcw, Check, Sparkles } from 'lucide-react'

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
      text: "Hey there! 👋 I'm your AI-powered workplace companion. Ready to dive into company policies, benefits, and everything in between? Let's make work life easier! ✨", 
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
      return "Oops! Something went wrong on my end. 😅 Let's try that again!"
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
    await new Promise(resolve => setTimeout(resolve, 800))
    
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
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
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
    "💼 How much PTO do I get?",
    "🏠 Can I work remotely?",
    "🎁 What benefits are included?",
    "💰 Expense reimbursement process?"
  ]

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-white/10 p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-cyan-400 to-purple-500 p-3 rounded-2xl shadow-lg">
            <BookOpen size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Workplace Assistant
            </h1>
            <p className="text-slate-300 text-sm font-medium">Your smart companion for all things work 🚀</p>
          </div>
          <div className="ml-auto">
            <Sparkles className="text-yellow-400 animate-pulse" size={24} />
          </div>
        </div>
      </div>

      {/* Sample Questions */}
      <div className="relative z-10 p-4 bg-black/10 backdrop-blur-sm border-b border-white/5">
        <p className="text-sm text-slate-300 mb-3 font-medium">✨ Quick starters:</p>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setCurrentMessage(question)}
              className="text-xs bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-purple-600/50 hover:to-pink-600/50 text-white px-4 py-2 rounded-full border border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 backdrop-blur-sm"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-8">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-xs lg:max-w-md space-x-4 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-br from-cyan-400 to-blue-500' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                {message.sender === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
              </div>
              
              {/* Message Content */}
              <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`px-5 py-4 rounded-3xl shadow-xl backdrop-blur-sm border ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-cyan-400/30 rounded-tr-lg'
                      : 'bg-black/40 text-slate-100 border-white/20 rounded-tl-lg'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed font-medium">{message.text}</p>
                </div>
                
                {/* Message Actions & Timestamp */}
                <div className={`flex items-center space-x-3 mt-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <span className="text-xs text-slate-400 font-medium">
                    {formatTime(message.timestamp)}
                  </span>
                  
                  {message.sender === 'bot' && (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => copyMessage(message.id, message.text)}
                        className="p-2 text-slate-400 hover:text-cyan-400 transition-colors rounded-full hover:bg-white/10"
                        title="Copy message"
                      >
                        {copiedMessageId === message.id ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                      <button
                        onClick={() => {/* Add thumbs up logic */}}
                        className="p-2 text-slate-400 hover:text-green-400 transition-colors rounded-full hover:bg-white/10"
                        title="Good response"
                      >
                        <ThumbsUp size={16} />
                      </button>
                      <button
                        onClick={() => {/* Add thumbs down logic */}}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-full hover:bg-white/10"
                        title="Poor response"
                      >
                        <ThumbsDown size={16} />
                      </button>
                      <button
                        onClick={regenerateResponse}
                        disabled={isLoading}
                        className="p-2 text-slate-400 hover:text-purple-400 transition-colors disabled:opacity-50 rounded-full hover:bg-white/10"
                        title="Regenerate response"
                      >
                        <RotateCcw size={16} />
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
            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Bot size={18} className="text-white" />
              </div>
              <div className="bg-black/40 border border-white/20 px-5 py-4 rounded-3xl rounded-tl-lg shadow-xl backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-slate-300 font-medium">AI is cooking up something good...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative z-10 p-6 bg-black/20 backdrop-blur-xl border-t border-white/10">
        <div className="flex space-x-4">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Drop your question here... 💬"
            disabled={isLoading}
            className={`flex-1 border border-white/20 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 placeholder-slate-400 font-medium ${
              isLoading ? 'bg-black/20 cursor-not-allowed text-slate-500' : 'bg-black/40 text-white shadow-lg backdrop-blur-sm'
            }`}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || currentMessage.trim() === ''}
            className={`p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 ${
              isLoading || currentMessage.trim() === ''
                ? 'bg-slate-700 cursor-not-allowed text-slate-500' 
                : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg hover:shadow-cyan-500/30 transform hover:scale-105'
            }`}
          >
            {isLoading ? <Loader size={22} className="animate-spin" /> : <Send size={22} />}
          </button>
        </div>
      </div>
    </div>
  )
}