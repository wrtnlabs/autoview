import { IAutoViewCompilerMetadata } from "@autoview/interface";

import { IAutoViewAgentVendor } from "../../structures";

export interface Input {
  vendor: IAutoViewAgentVendor;
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
