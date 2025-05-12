export function cleanModelOutput(raw: string): string {
  return raw
    // Remove code fences like ``` and ```typescript
    .replace(/(^|\r?\n)\s*```(?:[a-z]+)?\s*/gi, '')
    // Remove "Here's your test:" type messages
    .replace(/Here[’']?s your test[s]?:?/gi, '')
    // Remove stray comments like "// test code"
    .replace(/^\s*\/\/.*(test|code)?\s*$/gim, '')
    // Remove markdown headings
    .replace(/^#+\s.*$/gm, '')
    // Collapse multiple blank lines into one
    .replace(/\n{2,}/g, '\n\n')
    // Trim leading/trailing whitespace
    .trim();
}