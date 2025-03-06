import { IAutoViewAgentProvider } from "../../structures/agents/IAutoViewAgentProvider";
import { IComponent } from "../common";

export namespace V2vTransformAgentDto {
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
}
