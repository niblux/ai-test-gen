#!/usr/bin/env node
import { input, select, confirm } from "@inquirer/prompts";
import fs from "fs";
import { analyzeComponent } from "./analyse-component";
import { injectPromptPlaceholders } from "./prompt-loader";
import { loadPromptTemplate } from "./prompt-loader";
import { generateTestFromComponent } from "./engines/ollama";
import { writeTestFile } from "./test-writer";
import { cleanModelOutput } from "./helpers/clean-output";
import { createSpinner } from "nanospinner";
async function runInteractiveCLI() {
  console.log("\n🧪 Welcome to AI TestGen (Interactive Mode)\n");

  const file = await input({
    message: "📄 Which file do you want to test?",
    validate: (input) =>
      fs.existsSync(input) || "File not found. Please enter a valid path.",
  });

  const description = await input({
    message: "🧠 What does this component or service do?",
  });

  const framework = await select({
    message: "💻 Which framework is this?",
    choices: [
      { name: "Angular", value: "angular" },
      { name: "NestJS", value: "nestjs" },
    ],
  });

  const testLibrary = await select({
    message: "🧪 Which testing library/framework are you using?",
    choices: [{ name: "Jest", value: "jest" }],
  });

  const mocks = await input({
    message:
      "🧩 List any services, stores, or libraries to mock (comma-separated)",
    default: "",
  });

  const fileNaming = await select({
    message: "📝 What test filename style do you prefer?",
    choices: [
      { name: "*.spec.ts (Angular/NestJS style)", value: "spec" },
      { name: "Custom suffix", value: "custom" },
    ],
  });

  let customSuffix = "";

  if (fileNaming === "custom") {
    customSuffix = await input({
      message: "Enter your custom test file suffix (without dot):",
    });
  }

  const level = await select({
    message: "🧪 Test depth?",
    choices: [
      { name: "Basic", value: "basic" },
      { name: "Comprehensive", value: "comprehensive" },
    ],
  });

  const fileContent = fs.readFileSync(file, "utf-8");

  const structure = analyzeComponent(file);

  const context = {
    file,
    description,
    framework,
    testLibrary,
    mocks: mocks
      .split(",")
      .map((m: any) => m.trim())
      .filter(Boolean),
    level,
    testFileSuffix: fileNaming === "custom" ? customSuffix : fileNaming,
  };

  const rawPrompt = loadPromptTemplate(context.framework, context.testLibrary);
  const prompt = injectPromptPlaceholders(
    rawPrompt,
    fileContent,
    context,
    structure
  );

  let spinner;
  try {
    spinner = createSpinner('🧠 Generating test with AI...').start();
    const testCode = await generateTestFromComponent(prompt);
    spinner.success({ text: '✅ Test generated!' });
    const cleanedOutput = cleanModelOutput(testCode);
    writeTestFile(file, cleanedOutput);
    console.log("✅ Test file generated successfully!");
  } catch (error) {
    if (spinner) spinner.error({ text: '❌ Failed to generate test.' });
    console.error("❌ Error details:", error);
  }
}

runInteractiveCLI();
