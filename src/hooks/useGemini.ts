import { GeminiService } from '@/services/GeminiService/GeminiService';
import { useState, useMemo } from 'react';

export const useGemini = () => {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const geminiService = useMemo(() => new GeminiService(), []);

  const fetchResponse = async (prompt: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await geminiService.getResponse(prompt);
      setResponse(result);
    } catch (err) {
      setError('Erro ao obter resposta do Gemini.');
      setResponse('');
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    loading,
    error,
    fetchResponse,
  };
};
