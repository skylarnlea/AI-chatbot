// src/lib/vertexai.ts
import { VertexAI } from '@google-cloud/vertexai';

export async function generateChatResponse(message: string): Promise<string> {
  try {
    console.log('🚀 Initializing Vertex AI...');
    
    // Initialize Vertex AI with Application Default Credentials
    const vertex_ai = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT_ID!,
      location: process.env.GOOGLE_CLOUD_REGION || 'us-central1',
    });

    console.log('📡 Connecting to Gemini model...');
    // Try different model names - some regions have different availability
    const model = 'gemini-2.5-flash'; 
    const generativeModel = vertex_ai.preview.getGenerativeModel({
      model: model,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    console.log('💭 Sending message to Vertex AI:', message.substring(0, 100) + '...');
    
    // Send the message directly to Gemini
    const result = await generativeModel.generateContent(message);
    const response = await result.response;
    
    const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I could not generate a response.';
    
    console.log('✨ Received Vertex AI response:', responseText.substring(0, 100) + '...');
    
    return responseText;
    
  } catch (error) {
    console.error('❌ Vertex AI Error Details:', error);
    throw new Error(`Failed to generate response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}