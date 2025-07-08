// src/types/chat.ts
export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  sources?: PolicySource[]; // Optional sources for bot messages
}

export interface PolicySource {
  title: string;
  category: string;
}

export interface ChatRequest {
  message: string;
  timestamp: string; // ISO string format
}

export interface ChatResponse {
  response: string;
  timestamp: string;
  sources?: PolicySource[]; // Optional policy sources used
}

export interface ErrorResponse {
  error: string;
  details?: string;
};

export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
};