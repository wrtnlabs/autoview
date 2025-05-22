import { OpenApi } from "@samchon/openapi";
import ts from "typescript";

import { AutoViewDtoProgrammer } from "./AutoViewDtoProgrammer";
import { AutoViewTransformerProgrammer } from "./AutoViewTransformerProgrammer";
import { IAutoViewProgrammerContext } from "./IAutoViewProgrammerContext";

export namespace AutoViewProgrammer {
  export const write = (
    ctx: IAutoViewProgrammerContext,
    inputComponents: OpenApi.IComponents,
    inputSchema: OpenApi.IJsonSchema,
    inputSchemaPrefix: string,
    componentComponents: OpenApi.IComponents,
    componentSchema: OpenApi.IJsonSchema,
    transformFunctionName: string,
  ): ts.Statement[] => {
    const statements: ts.Statement[] = [
      AutoViewDtoProgrammer.write(
        ctx,
        componentComponents,
        componentSchema,
        "IAutoView",
        false,
      ),
      AutoViewDtoProgrammer.write(
        ctx,
        inputComponents,
        inputSchema,
        inputSchemaPrefix,
        false,
      ),
      ...AutoViewTransformerProgrammer.write(
        ctx,
        inputSchema,
        transformFunctionName,
        inputSchemaPrefix,
      ),
    ];
    return [...ctx.importer.toStatements(() => ""), ...statements];
  };

  export const writeComponentOnly = (
    ctx: IAutoViewProgrammerContext,
    componentComponents: OpenApi.IComponents,
    componentSchema: OpenApi.IJsonSchema,
  ): ts.Statement[] => {
    const statements: ts.Statement[] = [
      AutoViewDtoProgrammer.write(
        ctx,
        componentComponents,
        componentSchema,
        "IAutoView",
        false,
      ),
    ];
    return [...ctx.importer.toStatements(() => ""), ...statements];
  };

  export const writeWithoutDto = (
    ctx: IAutoViewProgrammerContext,
    inputComponents: OpenApi.IComponents,
    inputSchema: OpenApi.IJsonSchema,
    inputSchemaPrefix: string,
    transformFunctionName: string,
  ): ts.Statement[] => {
    const statements: ts.Statement[] = [
      ts.factory.createImportDeclaration(
        undefined,
        ts.factory.createImportClause(
          true,
          undefined,
          ts.factory.createNamespaceImport(
            ts.factory.createIdentifier("IAutoView"),
          ),
        ),
        ts.factory.createStringLiteral("@autoview/interface"),
      ),
      AutoViewDtoProgrammer.write(
        ctx,
        inputComponents,
        inputSchema,
        inputSchemaPrefix,
        false,
      ),
      ...AutoViewTransformerProgrammer.write(
        ctx,
        inputSchema,
        transformFunctionName,
        inputSchemaPrefix,
      ),
    ];
    return [...ctx.importer.toStatements(() => ""), ...statements];
  };
}
