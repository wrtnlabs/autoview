import type {
  IAutoViewCompilerMetadata,
  IAutoViewCompilerProps,
  IAutoViewCompilerResult,
} from "@autoview/interface";
import { OpenApi } from "@samchon/openapi";
import { LlmSchemaComposer } from "@samchon/openapi/lib/composers/LlmSchemaComposer";
import ts from "typescript";

import { TypeScriptCompiler } from "./compilers/TypeScriptCompiler";
import { AutoViewImportProgrammer } from "./programmers/AutoViewImportProgrammer";
import { AutoViewProgrammer } from "./programmers/AutoViewProgrammer";
import { AutoViewRandomProgrammer } from "./programmers/AutoViewRandomProgrammer";
import { IAutoViewProgrammerContext } from "./programmers/IAutoViewProgrammerContext";
import { ErrorUtil } from "./utils/ErrorUtil";
import { FilePrinter } from "./utils/FilePrinter";

export class AutoViewCompiler {
  private readonly inputComponents: OpenApi.IComponents;
  private readonly inputSchema: OpenApi.IJsonSchema;
  private readonly componentComponents: OpenApi.IComponents;
  private readonly componentSchema: OpenApi.IJsonSchema;
  private readonly compilerOptions: IAutoViewCompilerProps.ICompilerOptions;

  public constructor(props: IAutoViewCompilerProps) {
    const { components, schema } = getJsonSchema(props.inputMetadata);
    const { components: componentComponents, schema: componentSchema } =
      getJsonSchema(props.componentMetadata);
    this.inputComponents = components;
    this.inputSchema = schema;
    this.componentComponents = componentComponents;
    this.componentSchema = componentSchema;
    this.compilerOptions = {
      module: "esm",
    };
  }

  public generateComponentDto(): string {
    const ctx: IAutoViewProgrammerContext = {
      importer: new AutoViewImportProgrammer(),
    };
    const statements: ts.Statement[] = AutoViewProgrammer.writeComponentOnly(
      ctx,
      this.componentComponents,
      this.componentSchema,
    );
    const source: string = FilePrinter.write({ statements });

    return source;
  }

  public generateBoilerplate(transformFunctionName: string): string {
    const ctx: IAutoViewProgrammerContext = {
      importer: new AutoViewImportProgrammer(),
    };
    const statements: ts.Statement[] = AutoViewProgrammer.write(
      ctx,
      this.inputComponents,
      this.inputSchema,
      this.componentComponents,
      this.componentSchema,
      transformFunctionName,
    );
    const source: string = FilePrinter.write({ statements });

    return source;
  }

  public generateBoilerplateForRawTsCode(
    transformFunctionName: string,
  ): string {
    const ctx: IAutoViewProgrammerContext = {
      importer: new AutoViewImportProgrammer(),
    };
    const statements: ts.Statement[] = AutoViewProgrammer.writeWithoutDto(
      ctx,
      this.inputComponents,
      this.inputSchema,
      transformFunctionName,
    );
    const source: string = FilePrinter.write({ statements });

    return source;
  }

  public async compile(
    script: string,
    transformFunctionName: string,
  ): Promise<IAutoViewCompilerResult> {
    const ctx: IAutoViewProgrammerContext = {
      importer: new AutoViewImportProgrammer(),
    };
    const statements: ts.Statement[] = AutoViewProgrammer.write(
      ctx,
      this.inputComponents,
      this.inputSchema,
      this.componentComponents,
      this.componentSchema,
      transformFunctionName,
    );
    const source: string = `${FilePrinter.write({ statements })}\n\n${script}`;

    try {
      return TypeScriptCompiler.build(ctx, source, this.compilerOptions.module);
    } catch (error) {
      return {
        type: "error",
        error: ErrorUtil.toJSON(error),
      };
    }
  }

  public async compileRandom(): Promise<IAutoViewCompilerResult> {
    const ctx: IAutoViewProgrammerContext = {
      importer: new AutoViewImportProgrammer(),
    };
    const statements: ts.Statement[] = AutoViewRandomProgrammer.write(
      ctx,
      this.inputComponents,
      this.inputSchema,
    );
    const source: string = FilePrinter.write({ statements });

    try {
      return TypeScriptCompiler.build(ctx, source, this.compilerOptions.module);
    } catch (error) {
      return {
        type: "error",
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
    : LlmSchemaComposer.invert("chatgpt")({
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
