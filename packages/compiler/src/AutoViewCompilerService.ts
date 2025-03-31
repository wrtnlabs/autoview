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

  public generateBoilerplate(): string {
    if (this.compiler_ === null)
      throw new Error("You have not initialized yet.");
    return this.compiler_.generateBoilerplate();
  }

  public generateBoilerplateForRawTsCode(): string {
    if (this.compiler_ === null)
      throw new Error("You have not initialized yet.");
    return this.compiler_.generateBoilerplateForRawTsCode();
  }

  public async compile(script: string): Promise<IAutoViewCompilerResult> {
    if (this.compiler_ === null)
      throw new Error("You have not initialized yet.");
    return this.compiler_.compile(script);
  }

  public async compileRandom(): Promise<IAutoViewCompilerResult> {
    if (this.compiler_ === null)
      throw new Error("You have not initialized yet.");
    return this.compiler_.compileRandom();
  }
}
