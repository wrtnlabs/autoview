import { OpenApi } from "@samchon/openapi";
import ts from "typescript";

import { AutoViewDtoProgrammer } from "./AutoViewDtoProgrammer";
import { AutoViewSchemaProgrammer } from "./AutoViewSchemaProgrammer";
import { IAutoViewProgrammerContext } from "./IAutoViewProgrammerContext";

export namespace AutoViewBoilerplateProgrammer {
  export const write = (
    ctx: IAutoViewProgrammerContext,
    schema: OpenApi.IJsonSchema,
    schemaComponents: OpenApi.IComponents,
    identifier: string,
    subTypePrefix: string,
    shouldExport: boolean,
  ): ts.Statement[] => {
    return [
      AutoViewDtoProgrammer.write(
        ctx,
        schemaComponents,
        schema,
        subTypePrefix,
        shouldExport,
      ),
      ts.factory.createTypeAliasDeclaration(
        shouldExport
          ? [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)]
          : undefined,
        ts.factory.createIdentifier(identifier),
        undefined,
        AutoViewSchemaProgrammer.writeSchema(ctx, schema, `${subTypePrefix}.`),
      ),
    ];
  };
}
