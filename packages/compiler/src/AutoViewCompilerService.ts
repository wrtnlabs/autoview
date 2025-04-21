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

  public generateComponentDto(): string {
    if (this.compiler_ === null)
      throw new Error("You have not initialized yet.");
    return this.compiler_.generateComponentDto();
  }

  public generateBoilerplate(
    inputSchemaPrefix: string,
    transformFunctionName: string,
  ): string {
    if (this.compiler_ === null)
      throw new Error("You have not initialized yet.");
    return this.compiler_.generateBoilerplate(
      inputSchemaPrefix,
      transformFunctionName,
    );
  }

  public generateBoilerplateForRawTsCode(
    inputSchemaPrefix: string,
    transformFunctionName: string,
  ): string {
    if (this.compiler_ === null)
      throw new Error("You have not initialized yet.");
    return this.compiler_.generateBoilerplateForRawTsCode(
      inputSchemaPrefix,
      transformFunctionName,
    );
  }

  public async compile(
    script: string,
    inputSchemaPrefix: string,
    transformFunctionName: string,
  ): Promise<IAutoViewCompilerResult> {
    if (this.compiler_ === null)
      throw new Error("You have not initialized yet.");
    return this.compiler_.compile(
      script,
      inputSchemaPrefix,
      transformFunctionName,
    );
  }

  public async compileRandom(
    inputSchemaPrefix: string,
  ): Promise<IAutoViewCompilerResult> {
    if (this.compiler_ === null)
      throw new Error("You have not initialized yet.");
    return this.compiler_.compileRandom(inputSchemaPrefix);
  }
}
