export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
};

export interface ChatRequest {
  message: string;
  timestamp: string;
};

export interface ChatResponse {
  response: string;
  timestamp: string;
};

export interface ErrorResponse {
  error: string;
  details?: string;
};