import ts from "typescript";
import { StatementFactory } from "typia/lib/factories/StatementFactory";

export namespace AutoViewMainProgrammer {
  export const write = (): ts.VariableStatement => {
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
          ts.factory.createVariableStatement(
            undefined,
            ts.factory.createVariableDeclarationList(
              [
                ts.factory.createVariableDeclaration(
                  ts.factory.createIdentifier("worker"),
                  undefined,
                  ts.factory.createTypeReferenceNode(
                    ts.factory.createIdentifier("WorkerServer"),
                    [
                      ts.factory.createLiteralTypeNode(ts.factory.createNull()),
                      ts.factory.createTypeReferenceNode(
                        ts.factory.createIdentifier("MyTransformerService"),
                        undefined,
                      ),
                      ts.factory.createLiteralTypeNode(ts.factory.createNull()),
                    ],
                  ),
                  ts.factory.createNewExpression(
                    ts.factory.createIdentifier("WorkerServer"),
                    undefined,
                    [],
                  ),
                ),
              ],
              ts.NodeFlags.Const |
                ts.NodeFlags.Constant |
                ts.NodeFlags.AwaitContext |
                ts.NodeFlags.Constant |
                ts.NodeFlags.ContextFlags |
                ts.NodeFlags.TypeExcludesFlags,
            ),
          ),
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
