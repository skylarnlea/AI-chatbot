// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ChatRequest, ChatResponse, ErrorResponse, PolicySource } from '@/types/chat';
import { searchPolicies } from '@/lib/mockKnowledge';
import { generateChatResponse } from '@/lib/vertexai';

// Note: Removed artificial delay since Vertex AI provides natural response time

// Enhanced function that combines knowledge base with Vertex AI
async function generateEnhancedResponse(message: string): Promise<{ response: string; sources: PolicySource[] }> {
  
  // TEMPORARY: Force fallback for testing (remove this later)
  const FORCE_FALLBACK = false; // Set to true to test fallback responses
  
  if (FORCE_FALLBACK) {
    console.log('🔄 Using fallback mode for testing');
    return generateFallbackResponse(message);
  }

  try {
    console.log('🤖 Attempting to use Vertex AI for message:', message);
    
    // First, search for relevant policies in your knowledge base
    const relevantPolicies = searchPolicies(message, 3);
    console.log('📚 Found relevant policies:', relevantPolicies.length);
    
    let aiResponse: string;
    
    if (relevantPolicies.length > 0) {
      // If we have relevant policies, use them to enhance the AI prompt
      const policyContext = relevantPolicies.map(policy => 
        `${policy.title} (${policy.category}): ${policy.content}`
      ).join('\n\n');
      
      const enhancedPrompt = `You are a helpful company AI assistant. Based on the following company policies and information, please answer the user's question: "${message}"

Relevant Company Policies:
${policyContext}

Please provide a helpful, accurate response based on this information. If the policies don't fully answer the question, provide general guidance while noting that they should check with HR for specifics. Keep your response conversational and helpful.`;

      console.log('🎯 Using Vertex AI with policy context');
      aiResponse = await generateChatResponse(enhancedPrompt);
      console.log('✅ Vertex AI response generated successfully');
      
      // Create sources array
      const sources: PolicySource[] = relevantPolicies.map(policy => ({
        title: policy.title,
        category: policy.category
      }));
      
      return { response: aiResponse, sources };
      
    } else {
      // No relevant policies found, use general AI response with company context
  const generalPrompt = `You are a helpful company AI assistant. The user asked: "${message}"

Please provide a helpful response. If it's a general greeting, welcome them and explain what you can help with (company policies, benefits, HR procedures, etc.). If it's a specific question you can't answer from company policies, provide general guidance and suggest they contact HR (hr@company.com, (555) 123-4567) or IT support (it-support@company.com, (555) 123-TECH) as appropriate.

Keep your response friendly, professional, and helpful.`;

      console.log('🎯 Using Vertex AI with general context');
      aiResponse = await generateChatResponse(generalPrompt);
      console.log('✅ Vertex AI response generated successfully');
      
      return { response: aiResponse, sources: [] };
    }
    
  } catch (vertexError) {
    console.error('❌ Vertex AI Error:', vertexError);
    
    // TEMPORARY: Don't fallback, throw the error so we can see what's wrong
    throw new Error(`Vertex AI failed: ${vertexError instanceof Error ? vertexError.message : 'Unknown error'}`);
    
    // Fallback to your original knowledge-based response if Vertex AI fails
    // console.log('🔄 Falling back to knowledge-based response');
    // return generateFallbackResponse(message);
  }
}

// Your original function as a fallback (slightly renamed)
function generateFallbackResponse(message: string): { response: string; sources: PolicySource[] } {
  const lowerMessage = message.toLowerCase();
  
  // Search for relevant policies
  const relevantPolicies = searchPolicies(message, 2);
  
  if (relevantPolicies.length > 0) {
    // Use the most relevant policy to craft a response
    const topPolicy = relevantPolicies[0];
    
    // Create a response that includes the policy information
    let response = `Based on our ${topPolicy.title}, here's what I can tell you:\n\n`;
    response += topPolicy.content;
    
    if (relevantPolicies.length > 1) {
      response += `\n\nYou might also be interested in our ${relevantPolicies[1].title}. Would you like me to explain that as well?`;
    } else {
      response += `\n\nIs there anything specific about this policy you'd like me to clarify?`;
    }
    
    // Create sources array
    const sources: PolicySource[] = relevantPolicies.map(policy => ({
      title: policy.title,
      category: policy.category
    }));
    
    return { response, sources };
  }
  
  // Fallback responses for general queries (no sources)
  let response = "";
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    response = "Hello! I'm your company AI assistant. I can help you with information about our policies, benefits, HR procedures, and workplace guidelines. What would you like to know about?";
  } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    response = "I'm here to help! I can provide information about:\n\n• Employee benefits and insurance\n• Time off and vacation policies\n• Remote work arrangements\n• Expense reimbursement\n• Code of conduct and workplace policies\n• HR procedures and guidelines\n\nWhat specific topic would you like to know about?";
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('hr') || lowerMessage.includes('human resources')) {
  response = "For direct HR support, you can:\n\n• Email: hr@company.com\n• Phone: (555) 123-4567\n• Submit a ticket through the company Help Desk\n• Visit the HR office on the 3rd floor\n\nFor immediate policy questions, I can help you right here! What would you like to know?";
  } else if (lowerMessage.includes('it') || lowerMessage.includes('technical') || lowerMessage.includes('computer')) {
  response = "For IT support, please:\n\n• Submit a ticket through the company Help Desk for technical issues\n• Email: it-support@company.com\n• Call the IT helpline: (555) 123-TECH\n• For password resets, use the self-service portal\n\nI can also help with general IT policy questions. What do you need assistance with?";
  } else {
    response = "I'd be happy to help you with company policies and information! I have access to details about benefits, time off, remote work, expenses, and workplace guidelines. Could you be more specific about what you're looking for? For example, you could ask about:\n\n• \"What are our vacation days?\"\n• \"How does remote work policy work?\"\n• \"What benefits do we have?\"\n• \"How do I submit expenses?\"";
  }
  
  return { response, sources: [] };
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, timestamp } = body;
    
    // Log when the message was originally sent vs when we received it
    console.log(`Message sent at: ${timestamp}, received at: ${new Date().toISOString()}`);

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

    // Generate enhanced response using both knowledge base and Vertex AI
    const { response: aiResponse, sources } = await generateEnhancedResponse(message);

    const response: ChatResponse = {
      response: aiResponse,
      timestamp: new Date().toISOString(),
      sources: sources.length > 0 ? sources : undefined,
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