import { IAutoViewAgentProvider } from "./IAutoViewAgentProvider";

export interface IAutoViewAgentValueProps {
  provider: IAutoViewAgentProvider;
  inputs: IAutoViewAgentValueProps.IInput[];
  retry?: number;
}
export namespace IAutoViewAgentValueProps {
  export interface IInput {
    value: unknown;
  }
}
