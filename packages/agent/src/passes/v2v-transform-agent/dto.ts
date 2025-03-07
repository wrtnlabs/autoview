import { IAutoViewAgentProvider } from "../../structures/agents/IAutoViewAgentProvider";

export interface Input {
  provider: IAutoViewAgentProvider;
  content: unknown;
  components: IComponent[];
  defs: Record<string, unknown>;
}

export interface Output {
  visualizations: IVisualizedComponent[];
}

/**
 * Represents a single visual component.
 *
 * It accepts an value that matches the {@link componentSchema} and displays it.
 *
 * It holds {@link valueValidator} to validate the value. The caller must ensure that the validator is correctly implemented against the {@link componentSchema}.
 */
export interface IComponent {
  name: string;
  description: string;
  componentSchema: Record<string, unknown>;
  /**
   * Validate the value of the component. It must throw an error of type {@link TypeGuardError} if the value is invalid.
   *
   * @param value - The value of the component.
   */
  valueValidator(value: unknown): void;
}

/**
 * Represents a visualized component.
 *
 * It holds {@link reasoning} to explain how the component is visualized.
 *
 * It holds {@link properties} to represent the properties of the component.
 */
export interface IVisualizedComponent {
  reasoning: string;
  properties: unknown;
}
