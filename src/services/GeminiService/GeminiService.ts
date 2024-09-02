import axios from 'axios';

export class GeminiService {
  private apiUrl = import.meta.env.VITE_GOOGLE_API_URL;
  private apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  async getResponse(prompt: string): Promise<string> {
    try {
      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 1.9,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return (
        response.data?.candidates[0].content?.parts?.[0]?.text ??
        'No response received'
      );
    } catch (error) {
      console.error('Erro ao chamar a API do Gemini:', error);
      throw error;
    }
  }
}
