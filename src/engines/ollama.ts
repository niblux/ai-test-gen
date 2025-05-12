// src/engines/ollama.ts

interface OllamaResponse {
  response: string;
}

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';

export async function generateTestFromComponent(prompt: string): Promise<string> {
  if (!prompt.trim()) {
    throw new Error('Prompt is empty. Cannot send request to Ollama.');
  }

  try {
    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3', // or another model
        prompt: prompt,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as OllamaResponse;
    return data.response;
  } catch (firstError) {
    console.warn('First Ollama request failed, retrying once...');

    const retryResponse = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3',
        prompt: prompt,
        stream: false
      })
    });

    if (!retryResponse.ok) {
      throw new Error(`Retry failed: ${retryResponse.status} ${retryResponse.statusText}`);
    }

    const retryData = (await retryResponse.json()) as OllamaResponse;
    return retryData.response;
  }
}
