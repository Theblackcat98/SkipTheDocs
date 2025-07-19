import { GoogleGenAI } from "@google/genai";

// The API key is expected to be set as an environment variable.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

export const askAboutConfig = async (configContent: string, question: string): Promise<string> => {
  if (!ai) {
    return "Error: AI Service is not configured because the API_KEY is missing.";
  }

  const model = "gemini-2.5-flash";
  const systemInstruction = `You are an expert on development tool configurations. Your task is to answer questions about the provided configuration file. Be concise, clear, and helpful. Format your answers for readability in a plain text component.`;
  
  const prompt = `
Context: I am looking at a configuration file and have a question about it.

Here is the full content of the configuration file:
---
${configContent}
---

Here is my question: "${question}"

Please provide a helpful answer based on the file content.
`;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            systemInstruction,
            temperature: 0.5,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Sorry, I encountered an error trying to get an answer: ${error.message}`;
    }
    return "Sorry, I encountered an unknown error while trying to get an answer. Please check the console for details.";
  }
};
