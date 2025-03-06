import ts from "typescript";

import { AutoViewClassProgrammer } from "./AutoViewClassProgrammer";
import { AutoViewDtoProgrammer } from "./AutoViewDtoProgrammer";
import { AutoViewMainProgrammer } from "./AutoViewMainProgrammer";
import { IAutoViewProgrammerContext } from "./IAutoViewProgrammerContext";

export namespace AutoViewProgrammer {
  export const write = (ctx: IAutoViewProgrammerContext): ts.Statement[] => {
    const statements: ts.Statement[] = [
      AutoViewClassProgrammer.write(ctx),
      AutoViewMainProgrammer.write(),
      ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
          ts.factory.createPropertyAccessExpression(
            ts.factory.createCallExpression(
              ts.factory.createIdentifier("main"),
              undefined,
              [],
            ),
            ts.factory.createIdentifier("catch"),
          ),
          undefined,
          [
            ts.factory.createPropertyAccessExpression(
              ts.factory.createIdentifier("console"),
              ts.factory.createIdentifier("error"),
            ),
          ],
        ),
      ),
      ...AutoViewDtoProgrammer.write(ctx),
    ];
    return [...ctx.importer.toStatements(() => ""), ...statements];
  };
}
