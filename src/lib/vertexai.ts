// src/lib/vertexai.ts
import { VertexAI } from '@google-cloud/vertexai';

export async function generateChatResponse(message: string): Promise<string> {
  try {
    // Initialize Vertex AI with Application Default Credentials
    const vertex_ai = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT_ID!,
      location: process.env.GOOGLE_CLOUD_REGION || 'us-central1',
    });

    const model = 'gemini-1.5-flash'; // Fast and cost-effective
    const generativeModel = vertex_ai.preview.getGenerativeModel({
      model: model,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    // Send the message directly to Gemini
    const result = await generativeModel.generateContent(message);
    const response = await result.response;
    
    return response.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I could not generate a response.';
    
  } catch (error) {
    console.error('Vertex AI Error:', error);
    throw new Error(`Failed to generate response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};