import {
  IAutoViewCompilerProps,
  IAutoViewCompilerResult,
  IAutoViewCompilerService,
} from "@autoview/interface";

import { AutoViewCompiler } from "../AutoViewCompiler";

export class AutoViewCompilerService implements IAutoViewCompilerService {
  private compiler_: AutoViewCompiler | null = null;

  public async initialize(props: IAutoViewCompilerProps): Promise<void> {
    this.compiler_ = new AutoViewCompiler(props);
  }

  public generateBoilerplate(): string {
    if (this.compiler_ === null)
      throw new Error("You have not initialized yet.");
    return this.compiler_.generateBoilerplate();
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
