import ts from "typescript";
import { StatementFactory } from "typia/lib/factories/StatementFactory";

import { IAutoViewProgrammerContext } from "./IAutoViewProgrammerContext";

export namespace AutoViewMainProgrammer {
  export const write = (
    ctx: IAutoViewProgrammerContext,
  ): ts.VariableStatement => {
    const arrow: ts.ArrowFunction = ts.factory.createArrowFunction(
      [ts.factory.createToken(ts.SyntaxKind.AsyncKeyword)],
      undefined,
      [],
      ts.factory.createTypeReferenceNode(
        ts.factory.createIdentifier("Promise"),
        [ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)],
      ),
      ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
      ts.factory.createBlock(
        [
          StatementFactory.constant({
            name: "worker",
            type: ts.factory.createTypeReferenceNode(
              ctx.importer.external({
                type: "instance",
                name: "WorkerServer",
                library: "tgrid",
              }),
              [
                ts.factory.createLiteralTypeNode(ts.factory.createNull()),
                ts.factory.createTypeReferenceNode(
                  ts.factory.createIdentifier("MyTransformerService"),
                  undefined,
                ),
                ts.factory.createLiteralTypeNode(ts.factory.createNull()),
              ],
            ),
            value: ts.factory.createNewExpression(
              ts.factory.createIdentifier("WorkerServer"),
              undefined,
              [],
            ),
          }),
          ts.factory.createExpressionStatement(
            ts.factory.createAwaitExpression(
              ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(
                  ts.factory.createIdentifier("worker"),
                  ts.factory.createIdentifier("open"),
                ),
                undefined,
                [
                  ts.factory.createNewExpression(
                    ts.factory.createIdentifier("MyTransformerService"),
                    undefined,
                    [],
                  ),
                ],
              ),
            ),
          ),
        ],
        true,
      ),
    );
    return StatementFactory.constant({
      name: "main",
      value: arrow,
    });
  };
}
