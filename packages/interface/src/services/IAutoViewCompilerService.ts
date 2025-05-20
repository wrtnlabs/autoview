import { IAutoViewCompilerProps } from "./IAutoViewCompilerProps";
import { IAutoViewCompilerResult } from "./IAutoViewCompilerResult";

export interface IAutoViewCompilerService {
  initialize(props: IAutoViewCompilerProps): Promise<void>;
  generateBoilerplateForReactComponent(
    alias: string,
    subTypePrefix: string,
  ): string;
  compileReactComponent(
    boilerplate: string,
    componentTsCode: string,
  ): Promise<IAutoViewCompilerResult>;
}
