// src/clean-output.ts

export function cleanModelOutput(raw: string): string {
    return raw
      .replace(/(^|\n)\s*```(?:typescript)?/g, '') // remove ``` and ```typescript
      .replace(/Here[’']?s your test[s]?:?/gi, '') // remove “Here’s your test” messages
      .replace(/^\/\/.*(test|code)/i, '') // remove stray comments
      .trim();
  }
  