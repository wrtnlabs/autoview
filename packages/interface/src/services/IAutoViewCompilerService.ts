import { IAutoViewCompilerProps } from "./IAutoViewCompilerProps";

export interface IAutoViewCompilerService {
  initialize(props: IAutoViewCompilerProps): Promise<void>;
  generateBoilerplateForReactComponent(
    alias: string,
    subTypePrefix: string,
  ): string;
}
