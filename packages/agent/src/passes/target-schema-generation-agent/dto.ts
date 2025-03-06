import { IAutoViewAgentProvider } from "../../structures";

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
