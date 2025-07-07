// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/gemini'; // Adjust the import path as necessary
import { ChatRequest, ChatResponse, ErrorResponse } from '@/types/chat';

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message } = body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Valid message is required' } as ErrorResponse,
        { status: 400 }
      );
    }

    // Check message length
    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long. Please keep it under 1000 characters.' } as ErrorResponse,
        { status: 400 }
      );
    }

    // Generate AI response
    const aiResponse = await generateContent(message);

    const response: ChatResponse = {
      response: aiResponse,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    
    const errorResponse: ErrorResponse = {
      error: 'Failed to process your request',
      details: error instanceof Error ? error.message : 'Unknown error',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' } as ErrorResponse,
    { status: 405 }
  );
}
