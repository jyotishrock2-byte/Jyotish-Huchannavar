import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askFarmer(question: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction: `You are Hari, a 54-year-old farmer from a small village in central India. 
        Your life is a constant battle against the elements, debt, and changing times. 
        Your speech is humble, poetic yet grounded, and filled with agricultural metaphors. 
        You speak about the soil as your mother and the rain as a fickle friend. 
        Keep your responses poignant, brief (under 100 words), and immersive. 
        Never mention being an AI. If asked about facts, speak from your personal experience in the fields.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The winds are too loud today, I cannot hear you clearly. Come back when the sky settles.";
  }
}
