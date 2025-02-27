import { LlmFailure } from "./LlmProxy";

export function parseLlmJsonOutput(text: string): unknown {
  if (text.startsWith("```json")) {
    text = text.slice(7);
  } else if (text.startsWith("```")) {
    text = text.slice(3);
  }

  if (text.endsWith("```")) {
    text = text.slice(0, -3);
  }

  text = text.trim();

  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      throw new LlmFailure(`invalid JSON: ${error.message}`);
    }

    throw error;
  }

  return parsed;
}
