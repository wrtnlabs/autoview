import { OpenApi } from "@samchon/openapi";
import ts from "typescript";

import { AutoViewSchemaProgrammer } from "./AutoViewSchemaProgrammer";
import { IAutoViewProgrammerContext } from "./IAutoViewProgrammerContext";

export namespace AutoViewTransformerProgrammer {
  export const write = (
    ctx: IAutoViewProgrammerContext,
    inputSchema: OpenApi.IJsonSchema,
  ): ts.Statement[] => {
    return [
      ts.factory.createTypeAliasDeclaration(
        undefined,
        ts.factory.createIdentifier("IAutoViewTransformerInputType"),
        undefined,
        AutoViewSchemaProgrammer.writeSchema(ctx, inputSchema),
      ),
      ts.factory.createFunctionDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        undefined,
        ts.factory.createIdentifier("transform"),
        undefined,
        [
          ts.factory.createParameterDeclaration(
            undefined,
            undefined,
            ts.factory.createIdentifier("$input"),
            undefined,
            ts.factory.createTypeReferenceNode(
              ts.factory.createIdentifier("unknown"),
              undefined,
            ),
          ),
        ],
        ts.factory.createTypeReferenceNode(
          ts.factory.createIdentifier("IAutoViewComponentProps"),
        ),
        ts.factory.createBlock(
          [
            // typia.assertGuard<IAutoViewTransformerInputType>($input);
            ts.factory.createExpressionStatement(
              ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(
                  ts.factory.createIdentifier(
                    ctx.importer.external({
                      type: "default",
                      library: "typia",
                      name: "typia",
                    }),
                  ),
                  ts.factory.createIdentifier("assertGuard"),
                ),
                [
                  ts.factory.createTypeReferenceNode(
                    ts.factory.createIdentifier(
                      "IAutoViewTransformerInputType",
                    ),
                    undefined,
                  ),
                ],
                [ts.factory.createIdentifier("$input")],
              ),
            ),
            // return visualizeData($input);
            ts.factory.createReturnStatement(
              ts.factory.createCallExpression(
                ts.factory.createIdentifier("visualizeData"),
                undefined,
                [ts.factory.createIdentifier("$input")],
              ),
            ),
          ],
          true,
        ),
      ),
    ];
  };
}
