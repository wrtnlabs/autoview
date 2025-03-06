import ts from "typescript";

import { AutoViewClassProgrammer } from "./AutoViewClassProgrammer";
import { AutoViewDtoProgrammer } from "./AutoViewDtoProgrammer";
import { AutoViewMainProgrammer } from "./AutoViewMainProgrammer";
import { IAutoViewProgrammerContext } from "./IAutoViewProgrammerContext";

export namespace AutoViewProgrammer {
  export const write = (ctx: IAutoViewProgrammerContext): ts.Statement[] => {
    const statements: ts.Statement[] = [
      AutoViewClassProgrammer.write(ctx),
      AutoViewMainProgrammer.write(ctx),
      ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
          ts.factory.createIdentifier("main"),
          undefined,
          [],
        ),
      ),
      ...AutoViewDtoProgrammer.write(ctx),
    ];
    return [...ctx.importer.toStatements(() => ""), ...statements];
  };
}
