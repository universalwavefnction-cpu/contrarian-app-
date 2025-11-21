import { GoogleGenAI, Type } from "@google/genai";
import { Protocol, Category, Difficulty } from '../types';

const apiKey = process.env.API_KEY || ''; 
// Note: In a real app, we would handle missing API keys more gracefully in the UI.
// For now, we assume the environment provides it.

const ai = new GoogleGenAI({ apiKey });

export const generateCustomProtocol = async (goal: string, timeCommitment: string): Promise<Protocol | null> => {
  try {
    const modelId = 'gemini-2.5-flash'; 
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Create a structured self-improvement protocol for a user with the following goal: "${goal}" and time commitment: "${timeCommitment}".
      
      The protocol should be scientific, actionable, and fit into one of these categories: Biohacking, Wellness, Coding, Business, Philosophy, Science, Fitness.
      
      Return JSON data structure matching the Protocol interface.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING, enum: Object.values(Category) },
            difficulty: { type: Type.STRING, enum: Object.values(Difficulty) },
            durationDays: { type: Type.NUMBER },
            steps: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "description", "category", "difficulty", "durationDays", "steps", "tags"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;

    const data = JSON.parse(text);
    
    // Hydrate with default values for fields AI doesn't generate
    return {
      ...data,
      id: `gen-${Date.now()}`,
      participantCount: 0,
      successRate: 0,
      author: 'Contrarian AI',
      verified: false,
    } as Protocol;

  } catch (error) {
    console.error("Error generating protocol:", error);
    return null;
  }
};