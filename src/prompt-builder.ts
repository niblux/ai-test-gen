// src/prompt-builder.ts

export function buildStructuredPrompt(
    code: string,
    context: {
      description: string;
      framework: string;
      mocks: string[];
      level: string;
    },
    structure: {
      componentName: string;
      inputs: string[];
      outputs: string[];
      methods: string[];
      injections: string[];
    }
  ): string {
    return `
  You are an expert test-writer for ${context.framework} applications.
  Generate a complete unit test file using Jest and TestBed (for Angular), or relevant libraries (for React/Vue).
  
  Component name: ${structure.componentName}
  Purpose: ${context.description}
  Inputs: ${structure.inputs.join(', ') || 'None'}
  Outputs: ${structure.outputs.join(', ') || 'None'}
  Public methods: ${structure.methods.join(', ') || 'None'}
  Injected dependencies: ${structure.injections.join(', ') || 'None'}
  User-specified mocks: ${context.mocks.join(', ') || 'None'}
  Desired coverage: ${context.level}
  
  Write ONLY valid TypeScript test code, starting from the first import.
  No explanation or comments outside the code. Do not return Markdown or wrap the code in backticks.
  
  Component source code:
  ${code}
  `;
  }
  