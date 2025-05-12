// src/prompts/prompt-loader.ts

import fs from "fs";
import path from "path";

function getPromptBasePath(): string {
  return path.resolve(__dirname, "./prompts");
}

export function loadPromptTemplate(
  framework: string,
  testLibrary: string
): string {
  const safeFramework = framework.toLowerCase();
  const safeTestLibrary = testLibrary.toLowerCase();

  const promptsPath = getPromptBasePath();
  const promptPath = path.join(
    promptsPath,
    `${safeFramework}-${safeTestLibrary}.prompt.txt`
  );

  console.log("📁 checking prompt path:", promptPath);
  console.log("📁 prompt folder contents:", fs.readdirSync(promptsPath));

  if (fs.existsSync(promptPath)) {
    return fs.readFileSync(promptPath, "utf-8");
  }

  console.warn(
    `⚠️ No custom prompt for ${framework} + ${testLibrary}. Using generic fallback.`
  );

  const genericPath = path.join(promptsPath, "generic.prompt.txt");

  if (fs.existsSync(genericPath)) {
    return fs.readFileSync(genericPath, "utf-8");
  }

  throw new Error("No available prompt template found.");
}

export function injectPromptPlaceholders(
  template: string,
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
    methods: { name: string; parameters: string[]; returnType: string }[];
    injections: string[];
  }
): string {
  return template
    .replace(/{{componentName}}/g, structure.componentName)
    .replace(/{{inputs}}/g, structure.inputs.join(", "))
    .replace(/{{outputs}}/g, structure.outputs.join(", "))
    .replace(/{{methods}}/g, structure.methods.map((m) => m.name).join(", "))
    .replace(/{{injections}}/g, structure.injections.join(", "))
    .replace(/{{mocks}}/g, context.mocks.join(", "))
    .replace(/{{description}}/g, context.description)
    .replace(/{{framework}}/g, context.framework)
    .replace(/{{level}}/g, context.level)
    .replace(/{{code}}/g, code);
}
