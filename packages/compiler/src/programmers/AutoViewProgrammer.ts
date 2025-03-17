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
  ): ts.Statement[] => {
    const statements: ts.Statement[] = [
      ...AutoViewDtoProgrammer.write(ctx, inputComponents, inputSchema),
      ...AutoViewDtoProgrammer.write(ctx, componentComponents, componentSchema),
      ...AutoViewTransformerProgrammer.write(ctx, inputSchema),
    ];
    return [...ctx.importer.toStatements(() => ""), ...statements];
  };
}
