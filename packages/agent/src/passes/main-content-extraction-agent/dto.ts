import { IAutoViewAgentProvider } from "../../structures/agents/IAutoViewAgentProvider";

export namespace MainContentExtractionAgentDto {
  export interface Input {
    provider: IAutoViewAgentProvider;
    jsonResponse: string;
  }

  export interface Output {
    explanation: string;
    jsonPath: string;
    mainContent: unknown;
  }
}
