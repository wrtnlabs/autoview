import ts from "typescript";

import { AutoViewSchemaProgrammer } from "./AutoViewSchemaProgrammer";
import { IAutoViewProgrammerContext } from "./IAutoViewProgrammerContext";

export namespace AutoViewClassProgrammer {
  export const write = (
    ctx: IAutoViewProgrammerContext,
  ): ts.ClassDeclaration => {
    return ts.factory.createClassDeclaration(
      undefined,
      ts.factory.createIdentifier("TransformerService"),
      undefined,
      undefined,
      [writeTransform(ctx), writeRandom(ctx)],
    );
  };

  const writeTransform = (
    ctx: IAutoViewProgrammerContext,
  ): ts.MethodDeclaration =>
    ts.factory.createMethodDeclaration(
      [ts.factory.createToken(ts.SyntaxKind.PublicKeyword)],
      undefined,
      ts.factory.createIdentifier("transform"),
      undefined,
      undefined,
      [
        ts.factory.createParameterDeclaration(
          undefined,
          undefined,
          ts.factory.createIdentifier("$input"),
          undefined,
          AutoViewSchemaProgrammer.writeSchema(ctx, ctx.schema),
          undefined,
        ),
      ],
      ts.factory.createTypeReferenceNode(
        ts.factory.createIdentifier("IAutoViewComponentProps"),
        undefined,
      ),
      ts.factory.createBlock([], true),
    );

  const writeRandom = (
    ctx: IAutoViewProgrammerContext,
  ): ts.MethodDeclaration => {
    const type = AutoViewSchemaProgrammer.writeSchema(ctx, ctx.schema);
    return ts.factory.createMethodDeclaration(
      [ts.factory.createToken(ts.SyntaxKind.PublicKeyword)],
      undefined,
      ts.factory.createIdentifier("random"),
      undefined,
      undefined,
      [],
      type,
      ts.factory.createBlock(
        [
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
              [type],
              [],
            ),
          ),
        ],
        true,
      ),
    );
  };
}
