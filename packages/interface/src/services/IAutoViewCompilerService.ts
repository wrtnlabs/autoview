import { IAutoViewCompilerProps } from "./IAutoViewCompilerProps";
import { IAutoViewCompilerResult } from "./IAutoViewCompilerResult";

export interface IAutoViewCompilerService {
  initialize(props: IAutoViewCompilerProps): Promise<void>;
  generateComponentDto(): string;
  generateBoilerplate(transformFunctionName: string): string;
  generateBoilerplateForRawTsCode(transformFunctionName: string): string;
  compile(
    script: string,
    transformFunctionName: string,
  ): Promise<IAutoViewCompilerResult>;
  compileRandom(): Promise<IAutoViewCompilerResult>;
}
