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
    componentComponents: OpenApi.IComponents,
    componentSchema: OpenApi.IJsonSchema,
    transformFunctionName: string,
  ): ts.Statement[] => {
    const statements: ts.Statement[] = [
      ts.factory.createModuleDeclaration(
        undefined,
        ts.factory.createIdentifier("IAutoView"),
        ts.factory.createModuleBlock(
          AutoViewDtoProgrammer.write(
            ctx,
            componentComponents,
            componentSchema,
            true,
          ),
        ),
        ts.NodeFlags.Namespace,
      ),
      ...AutoViewDtoProgrammer.write(ctx, inputComponents, inputSchema),
      ...AutoViewTransformerProgrammer.write(
        ctx,
        inputSchema,
        transformFunctionName,
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
      ts.factory.createModuleDeclaration(
        undefined,
        ts.factory.createIdentifier("IAutoView"),
        ts.factory.createModuleBlock(
          AutoViewDtoProgrammer.write(
            ctx,
            componentComponents,
            componentSchema,
            true,
          ),
        ),
        ts.NodeFlags.Namespace,
      ),
    ];
    return [...ctx.importer.toStatements(() => ""), ...statements];
  };

  export const writeWithoutDto = (
    ctx: IAutoViewProgrammerContext,
    inputComponents: OpenApi.IComponents,
    inputSchema: OpenApi.IJsonSchema,
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
      ...AutoViewDtoProgrammer.write(ctx, inputComponents, inputSchema),
      ...AutoViewTransformerProgrammer.write(
        ctx,
        inputSchema,
        transformFunctionName,
      ),
    ];
    return [...ctx.importer.toStatements(() => ""), ...statements];
  };
}
