import { IAutoViewAgentProvider } from "../../structures";

export interface Input {
  provider: IAutoViewAgentProvider;
  inputSchema: unknown;
  componentSchema: unknown;
}

export interface Output {
  initial_analysis: string;
  data_exploration: string;
  ideas: string;
  reasoning: string;
  planning: string;
}
