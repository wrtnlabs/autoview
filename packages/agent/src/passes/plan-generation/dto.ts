import { IAutoViewCompilerMetadata } from "@autoview/interface";

import { IAutoViewAgentProvider } from "../../structures";

export interface Input {
  provider: IAutoViewAgentProvider;
  inputSchema: IAutoViewCompilerMetadata;
  componentSchema: IAutoViewCompilerMetadata;
}

export interface Output {
  initial_analysis: string;
  data_exploration: string;
  ideas: string;
  reasoning: string;
  planning: string;
}
