# 🧪 AI TestGen

An interactive, LLM-powered test generator CLI for Angular, React, and Vue apps — powered by free local models like LLaMA 3 via [Ollama](https://ollama.com).

No fluff. Just real unit tests. ⚡️

---

## 🚀 What It Does

This CLI helps developers automatically generate unit tests for their frontend components by:

- 🧠 Analyzing your code using `ts-morph`
- 🙋 Asking you questions about the component (what it does, mocks, etc.)
- 🛠 Generating a clean, valid `.spec.ts` file via a local LLM
- ✨ Outputting usable Jest tests for Angular (React/Vue support in progress)

---

## 📦 Getting Started

### 1. Clone this repo

```bash
git clone https://github.com/your-username/ai-testgen
cd ai-testgen
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run ollama model locally
```bash
ollama run llama3
```

📌 Download Ollama if you haven't already.

You can use any model you like, such as 
```bash
ollama run deepseek-coder
```
### 4. Start AI Test Gen
```bash
npx ts-node src/interactive-cli.ts
```
