'use client'

import { useState } from 'react'
import { Send, Loader, BookOpen } from 'lucide-react'

// Define types for our messages
interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function ChatPage() {
  // State to store all chat messages
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your AI assistant for company policies. I can help you with questions about vacation time, benefits, remote work, expenses, and more. What would you like to know?", sender: 'bot' }
  ])
  
  // State to store the current message being typed
  const [currentMessage, setCurrentMessage] = useState('')
  
  // State to track if AI is responding
  const [isLoading, setIsLoading] = useState(false)

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
      return "I'm sorry, I'm having trouble responding right now. Please try again."
    }
  }

  // Function to handle sending a message
  const sendMessage = async () => {
    if (currentMessage.trim() === '' || isLoading) return // Don't send empty messages or while loading
    
    const userMessageText = currentMessage
    
    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now(),
      text: userMessageText,
      sender: 'user'
    }
    
    setMessages(prevMessages => [...prevMessages, userMessage])
    setCurrentMessage('') // Clear input immediately
    setIsLoading(true) // Show loading state
    
    // Get AI response
    const aiResponseText = await getAIResponse(userMessageText)
    
    // Add AI response to chat
    const botResponse: Message = {
      id: Date.now() + 1,
      text: aiResponseText,
      sender: 'bot'
    }
    
    setMessages(prevMessages => [...prevMessages, botResponse])
    setIsLoading(false) // Hide loading state
  }

  // Handle Enter key press to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage()
    }
  }

  // Sample questions for users to try
  const sampleQuestions = [
    "How much vacation time do I get?",
    "What's the remote work policy?",
    "What benefits do we offer?",
    "How do I submit expense reports?"
  ]

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <BookOpen size={24} />
          <div>
            <h1 className="text-xl font-semibold">Employee Handbook Chatbot</h1>
            <p className="text-blue-100 text-sm">Ask me about company policies and procedures</p>
          </div>
        </div>
      </div>

      {/* Sample Questions */}
      <div className="p-4 bg-blue-50 border-b">
        <p className="text-sm text-gray-600 mb-2">Try asking about:</p>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setCurrentMessage(question)}
              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2">
                <Loader size={16} className="animate-spin" />
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about vacation, benefits, remote work, expenses..."
            disabled={isLoading}
            className={`flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isLoading ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  )
}