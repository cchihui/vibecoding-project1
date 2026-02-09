
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private static instance: GeminiService;
  private ai: GoogleGenAI;

  private constructor() {
    // Initializing GoogleGenAI using the mandatory pattern from guidelines
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  /**
   * Helps potential clients refine their inquiry or gives them immediate professional feedback.
   */
  public async analyzeInquiry(message: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am a freelance software developer. A potential client sent me this inquiry: "${message}". 
        Please provide a short, professional, and encouraging 2-sentence response as if you were my AI assistant, 
        acknowledging their specific request and saying I'll get back to them soon with ideas.`,
        config: {
          temperature: 0.7,
        },
      });
      // Accessing response.text directly as a property per guidelines
      return response.text || "Thank you for reaching out! I've received your message and will review it shortly.";
    } catch (error) {
      console.error('Gemini error:', error);
      return "Thank you for your message! I will get back to you as soon as possible.";
    }
  }
}
