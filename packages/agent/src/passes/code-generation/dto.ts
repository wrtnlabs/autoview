import { IAutoViewAgentProvider } from "../../structures";

export interface Input {
  provider: IAutoViewAgentProvider;
  inputSchema: unknown;
  rootComponentSchema: unknown;
  componentPlan: string;
}

export interface Output {
  analysis: string;
  tsFunction: string;
  jsFunction: string;
}
