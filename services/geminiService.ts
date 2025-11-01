
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { Source } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface SamarthResponse {
    text: string;
    sources: Source[];
}

export const askSamarth = async (question: string): Promise<SamarthResponse> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: question,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                tools: [{ googleSearch: {} }],
            },
        });

        const text = response.text;
        const sources: Source[] = [];

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

        if (groundingChunks) {
            for (const chunk of groundingChunks) {
                if (chunk.web) {
                    sources.push({
                        uri: chunk.web.uri,
                        title: chunk.web.title || 'Untitled Source',
                    });
                }
            }
        }
        
        // Deduplicate sources based on URI
        const uniqueSources = Array.from(new Map(sources.map(item => [item['uri'], item])).values());


        return { text, sources: uniqueSources };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to get response from AI: ${error.message}`);
        }
        throw new Error("An unknown error occurred while contacting the AI.");
    }
};
