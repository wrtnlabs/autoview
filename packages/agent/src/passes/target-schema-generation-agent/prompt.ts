import { renderPrompt } from "../../core/Prompt";
import { IComponent } from "../common";

export interface PromptContext {
  input_schema: unknown;
  atomic_components: Omit<IComponent, "valueValidator">[];
}

const rawPrompt = `

`;

export function prompt(context: PromptContext): string {
  return renderPrompt(rawPrompt, context);
}
