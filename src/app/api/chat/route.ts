import { NextRequest, NextResponse } from 'next/server'
import { searchPolicies, PolicyDocument } from '../../../../lib/mockKnowledge'

// Mock AI responses for testing without OpenAI
const mockAIResponses = [
  "Great question! Based on our company policies, here's what I found...",
  "I'd be happy to help with that! According to our handbook...",
  "That's an important topic! Let me break this down for you...",
  "Perfect timing for this question! Here's what our policy says...",
  "Absolutely! I can help clarify that for you..."
]

function generateMockResponse(userMessage: string, relevantPolicies: PolicyDocument[]): string {
  const randomIntro = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)]
  
  if (relevantPolicies.length > 0) {
    const firstPolicy = relevantPolicies[0]
    return `${randomIntro}\n\n**${firstPolicy.title}**\n${firstPolicy.content}\n\nIs there anything specific about this policy you'd like me to clarify? 😊`
  } else {
    return `${randomIntro}\n\nI couldn't find specific information about "${userMessage}" in our current policies. For detailed company-specific information, I'd recommend reaching out to HR directly. \n\nIs there anything else I can help you with? 🤔`
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    // Validate that we have a message
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Search for relevant policies from our mock knowledge base
    console.log('Searching for relevant policies...')
    const relevantPolicies = searchPolicies(message, 2)

    // Generate mock AI response
    const aiResponse = generateMockResponse(message, relevantPolicies)

    // Add a small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    return NextResponse.json({ 
      response: aiResponse,
      policiesFound: relevantPolicies.length,
      relevantPolicies: relevantPolicies.map(p => p.title),
      mode: 'mock' // So you know it's using mock responses
    })

  } catch (error) {
    console.error('Mock API error:', error)
    
    return NextResponse.json(
      { error: 'Something went wrong with the mock API' },
      { status: 500 }
    )
  }
};