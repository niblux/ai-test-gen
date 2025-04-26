// src/ollama.ts

import fs from 'fs';
import path from 'path';
const PROMPT_TEMPLATE_PATH = path.join(__dirname, '../prompts/angular-test.prompt.txt');

// Load and build the final prompt
function buildPrompt(componentCode: string): string {
  const promptTemplate = fs.readFileSync(PROMPT_TEMPLATE_PATH, 'utf-8');
  return promptTemplate.replace('{{COMPONENT_CODE}}', componentCode);
}

export async function generateTestFromComponent(componentCode: string): Promise<string> {
  const prompt = buildPrompt(componentCode);

  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    //   model: 'codellama', // or mistral, deepseek-coder, etc.
      // model: 'deepseek-coder', // or mistral, deepseek-coder, etc.
      model: 'llama3', // or mistral, deepseek-coder, etc.
      prompt: prompt,
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
  }

  const data: any = await response.json(); // todo define type, once we know what the api returns.
  return data.response as string;
}
