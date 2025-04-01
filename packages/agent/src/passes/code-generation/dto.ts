import { IAutoViewCompilerMetadata } from "@autoview/interface";

import { IAutoViewAgentVendor } from "../../structures";

export interface Input {
  vendor: IAutoViewAgentVendor;
  inputSchema: IAutoViewCompilerMetadata;
  componentSchema: IAutoViewCompilerMetadata;
  initialAnalysis: string;
  dataExploration: string;
  ideas: string;
  reasoning: string;
  planning: string;
  transformFunctionName: string;
}

export interface Output {
  analysis: string;
  transformTsCode: string;
}
