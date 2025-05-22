import type {
  IAutoViewCompilerMetadata,
  IAutoViewCompilerProps,
  IAutoViewCompilerResult,
} from "@autoview/interface";

import { TypeScriptCompiler } from "./compilers/TypeScriptCompiler";
import { AutoViewBoilerplateProgrammer } from "./programmers/AutoViewBoilerplateProgrammer";
import { AutoViewImportProgrammer } from "./programmers/AutoViewImportProgrammer";
import { IAutoViewProgrammerContext } from "./programmers/IAutoViewProgrammerContext";
import { ErrorUtil } from "./utils/ErrorUtil";
import { FilePrinter } from "./utils/FilePrinter";

export class AutoViewCompiler {
  private readonly inputSchema: IAutoViewCompilerMetadata;
  private readonly compilerOptions: IAutoViewCompilerProps.ICompilerOptions;

  public constructor(props: IAutoViewCompilerProps) {
    this.inputSchema = props.inputMetadata;
    this.compilerOptions = {
      module: "esm",
    };
  }

  public generateBoilerplateForReactComponent(
    alias: string,
    subTypePrefix: string,
  ): string {
    const ctx = {
      importer: new AutoViewImportProgrammer(),
    } satisfies IAutoViewProgrammerContext;
    const statements = AutoViewBoilerplateProgrammer.write(
      ctx,
      this.inputSchema.schema,
      this.inputSchema.components,
      alias,
      subTypePrefix,
      true,
    );

    ctx.importer.external({
      type: "default",
      library: "react",
      name: "React",
    });
    ctx.importer.external({
      type: "default",
      library: "lucide-react",
      name: "LucideReact",
    });

    return FilePrinter.write({
      statements: [...ctx.importer.toStatements(() => ""), ...statements],
    });
  }

  public async compileReactComponent(
    boilerplate: string,
    componentTsCode: string,
  ): Promise<IAutoViewCompilerResult> {
    const source = `${boilerplate}\n\n${componentTsCode}`;

    try {
      return TypeScriptCompiler.build(
        source,
        this.compilerOptions.module,
        true,
      );
    } catch (error) {
      return {
        type: "exception",
        error: ErrorUtil.toJSON(error),
      };
    }
  }
}
