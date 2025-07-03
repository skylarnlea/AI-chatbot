import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  vertexai: true,
  project: 'cheil-ai-chatbot',
  location: 'global'
});

const model = 'gemini-2.5-flash';

const generationConfig = {
  maxOutputTokens: 65535,
  temperature: 1,
  topP: 1,
  seed: 0,
  safetySettings: [
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'OFF' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'OFF' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'OFF' },
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'OFF' }
  ],
};

export async function generateContent(prompt: string): Promise<string> {
  const req = {
    model,
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ],
    config: generationConfig,
  };

  const streamingResp = await ai.models.generateContentStream(req);

  let fullResponse = '';

  for await (const chunk of streamingResp) {
    if (chunk.text) {
      fullResponse += chunk.text;
    }
  }

  return fullResponse;
};