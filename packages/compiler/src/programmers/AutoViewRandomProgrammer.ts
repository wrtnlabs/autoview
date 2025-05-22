import { OpenApi } from "@samchon/openapi";
import ts from "typescript";

import { AutoViewDtoProgrammer } from "./AutoViewDtoProgrammer";
import { AutoViewSchemaProgrammer } from "./AutoViewSchemaProgrammer";
import { IAutoViewProgrammerContext } from "./IAutoViewProgrammerContext";

export namespace AutoViewRandomProgrammer {
  export const write = (
    ctx: IAutoViewProgrammerContext,
    inputComponents: OpenApi.IComponents,
    inputSchema: OpenApi.IJsonSchema,
    inputSchemaPrefix: string,
  ): ts.Statement[] => {
    const statements = [
      AutoViewDtoProgrammer.write(
        ctx,
        inputComponents,
        inputSchema,
        inputSchemaPrefix,
        false,
      ),
      ts.factory.createTypeAliasDeclaration(
        undefined,
        ts.factory.createIdentifier("IAutoViewTransformerInputType"),
        undefined,
        AutoViewSchemaProgrammer.writeSchema(
          ctx,
          inputSchema,
          inputSchemaPrefix,
        ),
      ),
      ts.factory.createFunctionDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        undefined,
        ts.factory.createIdentifier("generateRandom"),
        undefined,
        [],
        ts.factory.createTypeReferenceNode(
          ts.factory.createIdentifier("IAutoViewTransformerInputType"),
        ),
        ts.factory.createBlock([
          // return typia.random<IAutoViewTransformerInputType>();
          ts.factory.createReturnStatement(
            ts.factory.createCallExpression(
              ts.factory.createPropertyAccessExpression(
                ts.factory.createIdentifier(
                  ctx.importer.external({
                    type: "default",
                    library: "typia",
                    name: "typia",
                  }),
                ),
                ts.factory.createIdentifier("random"),
              ),
              [
                ts.factory.createTypeReferenceNode(
                  ts.factory.createIdentifier("IAutoViewTransformerInputType"),
                ),
              ],
              [],
            ),
          ),
        ]),
      ),
    ];

    return [...ctx.importer.toStatements(() => ""), ...statements];
  };
}
