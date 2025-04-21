import { IAutoViewCompilerProps } from "./IAutoViewCompilerProps";
import { IAutoViewCompilerResult } from "./IAutoViewCompilerResult";

export interface IAutoViewCompilerService {
  initialize(props: IAutoViewCompilerProps): Promise<void>;
  generateComponentDto(): string;
  generateBoilerplate(
    inputSchemaPrefix: string,
    transformFunctionName: string,
  ): string;
  generateBoilerplateForRawTsCode(
    inputSchemaPrefix: string,
    transformFunctionName: string,
  ): string;
  compile(
    script: string,
    inputSchemaPrefix: string,
    transformFunctionName: string,
  ): Promise<IAutoViewCompilerResult>;
  compileRandom(inputSchemaPrefix: string): Promise<IAutoViewCompilerResult>;
}
