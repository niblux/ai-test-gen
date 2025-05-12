// src/test-writer.ts

import fs from "fs";
import path from "path";

export function writeTestFile(componentPath: string, testCode: string, suffix: string = "spec") {
  const dirname = path.dirname(componentPath);
  const baseName = path.basename(componentPath).replace(".ts", `.${suffix}.ts`);
  const outputPath = path.join(dirname, baseName);

  fs.writeFileSync(outputPath, testCode.trim());

  console.log(`🧪 Test file written to: ${outputPath}`);
}
