// src/analyze-component.ts

import { Project } from "ts-morph";

export function analyzeComponent(filePath: string): any {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);
  const classDecl = sourceFile.getClasses()[0];

  if (!classDecl) {
    throw new Error("No class declaration found in the file.");
  }

  const className = classDecl.getName();

  const inputs = classDecl
    .getProperties()
    .filter((p) => p.getDecorator("Input"))
    .map((p) => p.getName());

  const outputs = classDecl
    .getProperties()
    .filter((p) => p.getDecorator("Output"))
    .map((p) => p.getName());

  const methods = classDecl
    .getMethods()
    .filter((m) => m.getScope() !== "private" && m.getScope() !== "protected")
    .map((m) => ({
      name: m.getName(),
      parameters: m.getParameters().map((p) => p.getName()),
      returnType: m.getReturnType().getText(),
    }));

  const constructorDecl = classDecl.getConstructors()[0];
  const injections = constructorDecl
    ? constructorDecl.getParameters().map((p) => p.getType().getText())
    : [];

  return {
    componentName: className,
    inputs,
    outputs,
    methods,
    injections,
  };
}
