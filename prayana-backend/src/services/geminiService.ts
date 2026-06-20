import axios from 'axios';

export class GeminiService {
  private static getApiKey(): string {
    const key = process.env.GOOGLE_GEMINI_API_KEY;
    if (!key) {
      throw new Error('SYSTEM CRITICAL: GOOGLE_GEMINI_API_KEY is not defined in backend runtime context.');
    }
    return key;
  }

  /**
   * Dynamically discovers available models and resolves a supported target text model 
   */
  private static async discoverCompatibleModel(): Promise<string> {
    const apiKey = this.getApiKey();
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
      const response = await axios.get(endpoint);
      const models = response.data.models || [];
      
      // Look for modern models supporting standard text generation loops
      const viableModel = models.find((m: any) => 
        m.supportedGenerationMethods?.includes('generateContent') &&
        (m.name.includes('gemini-2.5') || m.name.includes('gemini-1.5-flash') || m.name.includes('gemini-pro'))
      );

      if (viableModel) {
        return viableModel.name; // Format: "models/gemini-1.5-flash"
      }
      return 'models/gemini-1.5-flash'; // Fallback pipeline default
    } catch (error) {
      console.warn('⚠️ Dynamic model resolution failed, falling back to gemini-1.5-flash production channel.');
      return 'models/gemini-1.5-flash';
    }
  }

  /**
   * Dispatches clean prompt configurations directly down to the resolved Gemini REST pipeline
   */
  public static async executeGeneration(systemInstruction: string, activePrompt: string): Promise<any> {
    const apiKey = this.getApiKey();
    const modelString = await this.discoverCompatibleModel();
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/${modelString}:generateContent?key=${apiKey}`;

    const executionPayload = {
      contents: [{ parts: [{ text: activePrompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.3 // Kept crisp to ensure strong compliance with JSON schemas
      }
    };

    try {
      const apiResponse = await axios.post(endpoint, executionPayload, {
        headers: { 'Content-Type': 'application/json' }
      });

      const rootOutputText = apiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rootOutputText) {
        throw new Error('AI Engine failed to return a readable structural text segment.');
      }

      // Return clean, structurally valid JSON object strings to the application controllers
      return JSON.parse(rootOutputText.trim());
    } catch (error: any) {
      console.error('❌ Gemini Direct Engine execution runtime failure:', error?.response?.data || error.message);
      throw new Error(`AI Framework Exception: ${error?.response?.data?.error?.message || error.message}`);
    }
  }
}