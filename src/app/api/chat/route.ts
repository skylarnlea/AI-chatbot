import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'
import { searchPolicies } from '../../../lib/mockKnowledge'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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

    // Build the system prompt with context
    let systemPrompt = `You are a helpful AI assistant for an employee handbook chatbot. 
                       You help employees understand company policies, procedures, and guidelines.
                       Be friendly, professional, and concise in your responses.
                       Always provide accurate information based on the company policies provided.`

    if (relevantPolicies.length > 0) {
      const policyContext = relevantPolicies
        .map(policy => `${policy.title}:\n${policy.content}`)
        .join('\n\n---\n\n')
        
      systemPrompt += `\n\nHere are the relevant company policies that apply to the user's question:\n\n${policyContext}\n\nPlease base your response on these specific policies. If the question asks for information not covered in these policies, let the user know and suggest they contact HR for more details.`
    } else {
      systemPrompt += `\n\nNo specific company policies were found for this question. Please provide general guidance about typical workplace policies and suggest the user contact HR for company-specific information.`
    }

    // Call OpenAI API with context
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.3, // Lower temperature for more consistent responses
    })

    // Extract the AI response
    const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."

    return NextResponse.json({ 
      response: aiResponse,
      policiesFound: relevantPolicies.length, // For debugging
      relevantPolicies: relevantPolicies.map(p => p.title) // Show which policies were used
    })

  } catch (error) {
    console.error('OpenAI API error:', error)
    
    // Handle different types of errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to get AI response: ' + error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}