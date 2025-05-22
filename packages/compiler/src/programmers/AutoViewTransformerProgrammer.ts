import { OpenApi } from "@samchon/openapi";
import ts from "typescript";

import { AutoViewSchemaProgrammer } from "./AutoViewSchemaProgrammer";
import { IAutoViewProgrammerContext } from "./IAutoViewProgrammerContext";

export namespace AutoViewTransformerProgrammer {
  export const write = (
    ctx: IAutoViewProgrammerContext,
    inputSchema: OpenApi.IJsonSchema,
    transformFunctionName: string,
    dtoPrefix: string,
  ): ts.Statement[] => {
    return [
      ts.factory.createTypeAliasDeclaration(
        undefined,
        ts.factory.createIdentifier("IAutoViewTransformerInputType"),
        undefined,
        AutoViewSchemaProgrammer.writeSchema(ctx, inputSchema, `${dtoPrefix}.`),
      ),
      ts.factory.createFunctionDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        undefined,
        ts.factory.createIdentifier(transformFunctionName),
        undefined,
        [
          ts.factory.createParameterDeclaration(
            undefined,
            undefined,
            ts.factory.createIdentifier("$input"),
            undefined,
            ts.factory.createTypeReferenceNode(
              ts.factory.createIdentifier("IAutoViewTransformerInputType"),
              undefined,
            ),
          ),
        ],
        ts.factory.createTypeReferenceNode(
          ts.factory.createQualifiedName(
            ts.factory.createIdentifier("IAutoView"),
            ts.factory.createIdentifier("IAutoViewComponentProps"),
          ),
        ),
        ts.factory.createBlock(
          [
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
