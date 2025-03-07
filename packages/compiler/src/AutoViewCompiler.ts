import {
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
import { IAutoViewProgrammerContext } from "./programmers/IAutoViewProgrammerContext";
import { ErrorUtil } from "./utils/ErrorUtil";
import { FilePrinter } from "./utils/FilePrinter";

export class AutoViewCompiler {
  private readonly components: OpenApi.IComponents;
  private readonly schema: OpenApi.IJsonSchema;
  private readonly compilerOptions: IAutoViewCompilerProps.ICompilerOptions;

  public constructor(props: IAutoViewCompilerProps) {
    const { components, schema } = getJsonSchema(props.metadata);
    this.components = components;
    this.schema = schema;
    this.compilerOptions = {
      module: (props.compilerOptions?.module ?? is_node()) ? "cjs" : "esm",
    };
  }

  public async compile(script: string): Promise<IAutoViewCompilerResult> {
    const ctx: IAutoViewProgrammerContext = {
      components: this.components,
      schema: this.schema,
      importer: new AutoViewImportProgrammer(),
      body: script,
    };
    try {
      const statements: ts.Statement[] = AutoViewProgrammer.write(ctx);
      const result: IAutoViewCompilerResult = TypeScriptCompiler.build(
        ctx,
        FilePrinter.write({ statements }),
        this.compilerOptions.module,
      );
      if (result.type === "success" && is_node() === false)
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
