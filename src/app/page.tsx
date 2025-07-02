'use client'

import { useState } from 'react'

// Define types for our messages
interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}
import { Send } from 'lucide-react'

export default function ChatPage() {
  // State to store all chat messages
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ])
  
  // State to store the current message being typed
  const [currentMessage, setCurrentMessage] = useState('')

  // Function to handle sending a message
  const sendMessage = () => {
    if (currentMessage.trim() === '') return // Don't send empty messages
    
    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now(), // Simple ID using timestamp
      text: currentMessage,
      sender: 'user'
    }
    
    setMessages(prevMessages => [...prevMessages, userMessage])
    
    // Clear the input field
    setCurrentMessage('')
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: `You said: "${currentMessage}". This is a mock response - we'll add real AI later!`,
        sender: 'bot'
      }
      setMessages(prevMessages => [...prevMessages, botResponse])
    }, 1000)
  }

  // Handle Enter key press to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-semibold">Employee Handbook Chatbot</h1>
        <p className="text-blue-100 text-sm">Ask me anything about company policies</p>
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
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}