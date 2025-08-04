// AIModel.js
import { GoogleGenAI } from "@google/genai";

// It's best to pass the API key! Adjust as needed for your env.
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY 
});

// Export a function that takes a prompt and returns the AI's output.
export async function generateAISummary(promptText) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // or "gemini-2.5-pro"
    contents: [{ role: "user", parts: [{ text: promptText }] }],
    // ^ REQUIRED: contents must be an array of message objects!
  });

  // response.text is a string
  return response.text;
}




  
  
  