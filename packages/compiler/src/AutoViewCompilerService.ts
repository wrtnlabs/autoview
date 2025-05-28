import type {
  IAutoViewCompilerProps,
  IAutoViewCompilerResult,
  IAutoViewCompilerService,
} from "@autoview/interface";

import { AutoViewCompiler } from "./AutoViewCompiler";

export class AutoViewCompilerService implements IAutoViewCompilerService {
  private compiler_: AutoViewCompiler | null = null;

  public constructor() {}

  public async initialize(props: IAutoViewCompilerProps): Promise<void> {
    this.compiler_ = new AutoViewCompiler(props);
  }

  public generateBoilerplateForReactComponent(
    alias: string,
    subTypePrefix: string,
  ): string {
    if (this.compiler_ === null)
      throw new Error("You have not initialized yet.");
    return this.compiler_.generateBoilerplateForReactComponent(
      alias,
      subTypePrefix,
    );
  }

  public compileReactComponent(
    boilerplate: string,
    componentTsCode: string,
  ): Promise<IAutoViewCompilerResult> {
    if (this.compiler_ === null)
      throw new Error("You have not initialized yet.");
    return this.compiler_.compileReactComponent(boilerplate, componentTsCode);
  }
}
