// src/interactive-cli.ts

import inquirer from 'inquirer';
import fs from 'fs';
import { analyzeComponent } from './analyse-component';
import { buildStructuredPrompt } from './prompt-builder';
import { generateTestFromComponent } from './engines/ollama';
import { writeTestFile } from './test-writer';
import { cleanModelOutput } from './clean-output';

async function runInteractiveCLI() {
  console.log('\n🧪 Welcome to AI TestGen (Interactive Mode)\n');

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'file',
      message: '📄 Which file do you want to test?',
      validate: input => fs.existsSync(input) || 'File not found. Please enter a valid path.'
    },
    {
      type: 'input',
      name: 'description',
      message: '🧠 What does this component do?'
    },
    {
      type: 'list',
      name: 'framework',
      message: '💻 Which framework is this?',
      choices: ['Angular', 'React', 'Vue']
    },
    {
      type: 'input',
      name: 'mocks',
      message: '🧩 List any services, stores, or libraries to mock (comma-separated)',
      default: ''
    },
    {
      type: 'list',
      name: 'level',
      message: '🧪 Test depth?',
      choices: ['Basic', 'Comprehensive']
    }
  ]);

  const fileContent = fs.readFileSync(answers.file, 'utf-8');
  const structure = analyzeComponent(answers.file);
  const context = {
    ...answers,
    mocks: answers.mocks.split(',').map((m: any) => m.trim()).filter(Boolean)
  };

  const prompt = buildStructuredPrompt(fileContent, context, structure);

  try {
    const testCode = await generateTestFromComponent(prompt);
    const cleanedOutput = cleanModelOutput(testCode);
    writeTestFile(answers.file, cleanedOutput);
    console.log('✅ Test file generated successfully!');
  } catch (error) {
    console.error('❌ Failed to generate test:', error);
  }
}

runInteractiveCLI();
