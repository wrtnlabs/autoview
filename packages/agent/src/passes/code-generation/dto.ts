import { IAutoViewAgentProvider } from "../../structures";

export interface Input {
  provider: IAutoViewAgentProvider;
  inputSchema: unknown;
  componentSchema: unknown;
  initialAnalysis: string;
  dataExploration: string;
  ideas: string;
  reasoning: string;
  planning: string;
}

export interface Output {
  analysis: string;
  transformTsCode: string;
}
