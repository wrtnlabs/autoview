import type {
  IAutoViewCompilerMetadata,
  IAutoViewCompilerProps,
  IAutoViewCompilerResult,
} from "@autoview/interface";
import { OpenApi } from "@samchon/openapi";
import { LlmSchemaComposer } from "@samchon/openapi/lib/composers/LlmSchemaComposer";

import { TypeScriptCompiler } from "./compilers/TypeScriptCompiler";
import { AutoViewBoilerplateProgrammer } from "./programmers/AutoViewBoilerplateProgrammer";
import { AutoViewImportProgrammer } from "./programmers/AutoViewImportProgrammer";
import { IAutoViewProgrammerContext } from "./programmers/IAutoViewProgrammerContext";
import { ErrorUtil } from "./utils/ErrorUtil";
import { FilePrinter } from "./utils/FilePrinter";

export class AutoViewCompiler {
  private readonly inputComponents: OpenApi.IComponents;
  private readonly inputSchema: OpenApi.IJsonSchema;
  private readonly compilerOptions: IAutoViewCompilerProps.ICompilerOptions;

  public constructor(props: IAutoViewCompilerProps) {
    const { components, schema } = getJsonSchema(props.inputMetadata);
    this.inputComponents = components;
    this.inputSchema = schema;
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
      this.inputSchema,
      this.inputComponents,
      alias,
      subTypePrefix,
      true,
    );

    ctx.importer.external({
      type: "default",
      library: "react",
      name: "React",
    });

    return FilePrinter.write({ statements });
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

const getJsonSchema = (
  props: IAutoViewCompilerMetadata,
): IAutoViewCompilerMetadata.IOfJsonSchema => {
  if (isJsonSchema(props)) return props;
  const components: OpenApi.IComponents = {
    schemas: {},
  };
  const schema: OpenApi.IJsonSchema = isClaudeParameters(props)
    ? LlmSchemaComposer.invert("claude")({
        components,
        $defs: props.parameters.$defs,
        schema: props.parameters,
      })
    : LlmSchemaComposer.invert("claude")({
        components,
        $defs: props.$defs,
        schema: props.schema,
      });
  return {
    components,
    schema,
  };
};

const isJsonSchema = (
  props: IAutoViewCompilerMetadata,
): props is IAutoViewCompilerMetadata.IOfJsonSchema =>
  (props as IAutoViewCompilerMetadata.IOfJsonSchema).components !== undefined;

const isClaudeParameters = (
  props: IAutoViewCompilerMetadata,
): props is IAutoViewCompilerMetadata.IOfClaudeParameters =>
  (props as IAutoViewCompilerMetadata.IOfClaudeParameters).parameters !==
  undefined;
