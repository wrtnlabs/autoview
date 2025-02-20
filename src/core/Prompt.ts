/**
 * Renders a prompt with a context.
 *
 * It captures variables in the format of `{{variable}}` and replaces them with
 * the corresponding value in the context.
 *
 * All variables are case-sensitive.
 *
 * @param prompt - The prompt to render.
 * @param context - The context to render the prompt with.
 * @returns The rendered prompt.
 */
export function renderPrompt(prompt: string, context: any): string {
  prompt = prompt.trim();

  if (typeof context !== "object" || context === null) {
    return prompt;
  }

  return prompt
    .replace(/\{\{\s*([a-zA-Z0-9-_]+)\s*\}\}/g, (match, p1: string) => {
      if (p1 in context) {
        return String(context[p1]);
      }

      return match;
    })
    .replace(/\\{/g, "{")
    .replace(/\\}/g, "}");
}
