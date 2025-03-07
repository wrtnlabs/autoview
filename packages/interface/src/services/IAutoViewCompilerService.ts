import { IAutoViewCompilerProps } from "./IAutoViewCompilerProps";
import { IAutoViewCompilerResult } from "./IAutoViewCompilerResult";

export interface IAutoViewCompilerService {
  initialize(props: IAutoViewCompilerProps): Promise<void>;
  compile(script: string): Promise<IAutoViewCompilerResult>;
}
