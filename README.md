# 🧪 AI TestGen

An interactive, LLM-powered test generator CLI for Angular, React, Vue, and NestJS apps — powered by free local models like LLaMA 3 via [Ollama](https://ollama.com).

No fluff. Just real unit tests. ⚡️

---

## 🚀 What It Does

This CLI helps developers automatically generate unit tests for their frontend or backend code by:

- 🧠 Analyzing your code using `ts-morph`
- 🙋 Asking you questions about the component, service, or class (what it does, mocks needed, preferred test framework, etc.)
- 🛠 Generating a clean, valid `.spec.ts`, `.test.ts`, or custom-named file
- ✨ Outputting usable Jest, Jasmine, Vitest, or Mocha/Chai tests

---

## 📦 Getting Started

### 1. Install AI TestGen globally
```bash
npm install -g ai-testgen-cli
```

---

## ⚙️ Configuration

Before using the CLI, make sure you have an Ollama server or compatible model server running locally or remotely.

You can set the API URL by defining an environment variable:

```bash
export OLLAMA_API_URL=http://localhost:11434/api/generate
```

- If you don't set it, the CLI defaults to `http://localhost:11434/api/generate`.
- Ensure your server is accessible at the specified URL when generating tests.

📌 Download [Ollama](https://ollama.com) if you haven't already.

You can use any model you like, such as:
```bash
ollama run llama3
```
or
```bash
ollama run deepseek-coder
```

---

## 🧪 Running the CLI

After installing:

```bash
ai-testgen
```

You'll be asked:

- Which file you want to generate a test for
- What the component/service/class does
- Which framework (Angular, React, Vue, NestJS)
- Which testing library (Jest, Jasmine, Vitest, Mocha/Chai)
- What naming convention you prefer for the test file (`*.spec.ts`, `*.test.ts`, or custom)

The CLI will generate a complete test file automatically for you!

---

✅ Ready for V1!
