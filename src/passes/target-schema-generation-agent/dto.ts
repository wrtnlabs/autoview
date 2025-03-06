import { IAutoViewAgentProvider } from "../../structures/agents/IAutoViewAgentProvider";
import { IComponent } from "../common";

export namespace TargetSchemaGenerationAgentDto {
  export interface Input {
    provider: IAutoViewAgentProvider;
    inputSchema: unknown;
    components: IComponent[];
    defs: Record<string, unknown>;
  }

  export interface Output {
    reasoning: string;
  }
}
