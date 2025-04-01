import { IAutoViewCompilerMetadata } from "@autoview/interface";

import { IAutoViewVendor } from "../../structures";

export interface Input {
  vendor: IAutoViewVendor;
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
