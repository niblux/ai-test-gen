// src/cli.ts

import fs from 'fs';
import path from 'path';
import { generateTestFromComponent } from './engines/ollama';
import { writeTestFile } from './test-writer';

// Get args from CLI
const args = process.argv.slice(2);
const command = args[0];
const filePath = args[1];

if (!command || !filePath) {
  console.error('Usage: npx ts-node src/cli.ts generate <path/to/component.ts>');
  process.exit(1);
}

if (command !== 'generate') {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}

// Read the component file
const componentCode = fs.readFileSync(filePath, 'utf-8');

// Generate the test via Ollama
generateTestFromComponent(componentCode)
  .then((testCode) => {
    writeTestFile(filePath, testCode);
    console.log('✅ Test file generated successfully!');
  })
  .catch((err) => {
    console.error('❌ Failed to generate test:', err);
  });
