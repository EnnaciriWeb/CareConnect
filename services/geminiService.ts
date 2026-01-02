import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API key is available
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const generateAIResponse = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, but the AI service is currently unavailable. Please configure the API Key.";
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are CareConnect Assistant, a helpful AI for a medical appointment booking app. Answer health-related questions briefly and help users navigate the app. Do not provide medical diagnosis, always advise seeing a doctor.",
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster chat response
      },
    });

    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the server right now.";
  }
};