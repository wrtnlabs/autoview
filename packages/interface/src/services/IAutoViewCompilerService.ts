import { IAutoViewCompilerProps } from "./IAutoViewCompilerProps";
import { IAutoViewCompilerResult } from "./IAutoViewCompilerResult";

export interface IAutoViewCompilerService {
  initialize(props: IAutoViewCompilerProps): Promise<void>;
  generateBoilerplate(): string;
  generateBoilerplateForRawTsCode(): string;
  compile(script: string): Promise<IAutoViewCompilerResult>;
  compileRandom(): Promise<IAutoViewCompilerResult>;
}
