import { IAutoViewAgentProvider } from "../../structures";
import { IComponentWithoutValueValidator } from "../common";

export interface Input {
  provider: IAutoViewAgentProvider;
  inputSchema: unknown;
  components: IComponentWithoutValueValidator[];
  defs: Record<string, unknown>;
}

export interface Output {
  visualizationPlanning: string;
  component: string;
}
