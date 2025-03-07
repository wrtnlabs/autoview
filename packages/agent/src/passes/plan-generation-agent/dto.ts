import { IAutoViewAgentProvider } from "../../structures";
import { IComponent } from "../common";

export namespace PlanGenerationAgentDto {
  export interface Input {
    provider: IAutoViewAgentProvider;
    inputSchema: unknown;
    components: IComponent[];
    defs: Record<string, unknown>;
  }

  export interface Output {
    reasoning: string;
    plan: string;
  }
}
