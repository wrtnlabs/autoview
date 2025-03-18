import type {
  IAutoViewCompilerMetadata,
  IAutoViewCompilerProps,
  IAutoViewCompilerResult,
} from "@autoview/interface";
import { OpenApi } from "@samchon/openapi";
import { ChatGptSchemaComposer } from "@samchon/openapi/lib/composers/llm/ChatGptSchemaComposer";
import { is_node } from "tstl";
import ts from "typescript";

import { RollupBundler } from "./compilers/RollupBundler";
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
      module: (props.compilerOptions?.module ?? is_node()) ? "cjs" : "esm",
    };
  }

  public generateBoilerplate(): string {
    const ctx: IAutoViewProgrammerContext = {
      importer: new AutoViewImportProgrammer(),
    };
    const statements: ts.Statement[] = AutoViewProgrammer.write(
      ctx,
      this.inputComponents,
      this.inputSchema,
      this.componentComponents,
      this.componentSchema,
    );
    const source: string = FilePrinter.write({ statements });

    return source;
  }

  public async compile(script: string): Promise<IAutoViewCompilerResult> {
    const ctx: IAutoViewProgrammerContext = {
      importer: new AutoViewImportProgrammer(),
    };
    const statements: ts.Statement[] = AutoViewProgrammer.write(
      ctx,
      this.inputComponents,
      this.inputSchema,
      this.componentComponents,
      this.componentSchema,
    );
    const source: string = `${FilePrinter.write({ statements })}\n\n${script}`;

    try {
      const result: IAutoViewCompilerResult = TypeScriptCompiler.build(
        ctx,
        source,
        this.compilerOptions.module,
      );
      if (result.type === "success")
        result.javascript = await RollupBundler.build(result.javascript);
      return result;
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
      const result: IAutoViewCompilerResult = TypeScriptCompiler.build(
        ctx,
        source,
        this.compilerOptions.module,
      );
      if (result.type === "success")
        result.javascript = await RollupBundler.build(result.javascript);
      return result;
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
  const schema: OpenApi.IJsonSchema = isChatGptParameters(props)
    ? ChatGptSchemaComposer.invert({
        components,
        $defs: props.parameters.$defs,
        schema: props.parameters,
      })
    : ChatGptSchemaComposer.invert({
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

const isChatGptParameters = (
  props: IAutoViewCompilerMetadata,
): props is IAutoViewCompilerMetadata.IOfChatGptParameters =>
  (props as IAutoViewCompilerMetadata.IOfChatGptParameters).parameters !==
  undefined;
