import { OpenApi } from "@samchon/openapi";
import { OpenApiTypeChecker } from "@samchon/openapi";
import ts from "typescript";

import { MapUtil } from "../utils/MapUtil";
import { AutoViewSchemaProgrammer } from "./AutoViewSchemaProgrammer";
import { IAutoViewProgrammerContext } from "./IAutoViewProgrammerContext";

export namespace AutoViewDtoProgrammer {
  export const write = (ctx: IAutoViewProgrammerContext): ts.Statement[] => {
    const references: Map<string, OpenApi.IJsonSchema> = new Map();
    OpenApiTypeChecker.visit({
      closure: (schema) => {
        if (OpenApiTypeChecker.isReference(schema)) {
          const key: string = schema.$ref.split("/").pop() ?? "";
          const value: OpenApi.IJsonSchema =
            ctx.components.schemas?.[key] ?? {};
          references.set(key, value);
        }
      },
      components: ctx.components,
      schema: ctx.schema,
    });

    const dict: Map<string, IModulo> = new Map();
    for (const [key, value] of references) {
      let location: Map<string, IModulo> = dict;
      key.split(".").forEach((name, i, array) => {
        const modulo: IModulo = MapUtil.take(location)(name)(() => ({
          name,
          schema: null,
          children: new Map(),
        }));
        if (i === array.length - 1) modulo.schema = value;
        location = modulo.children;
      });
    }
    return writeModulo(ctx, dict, true);
  };

  const writeModulo = (
    ctx: IAutoViewProgrammerContext,
    dict: Map<string, IModulo>,
    root: boolean,
  ): ts.Statement[] => {
    const statements: ts.Statement[] = [];
    for (const [key, value] of dict) {
      if (value.schema)
        statements.push(
          ts.factory.createTypeAliasDeclaration(
            root
              ? [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)]
              : undefined,
            key,
            undefined,
            AutoViewSchemaProgrammer.writeSchema(ctx, value.schema),
          ),
        );
      if (value.children.size)
        statements.push(
          ts.factory.createModuleDeclaration(
            undefined,
            ts.factory.createIdentifier("Something"),
            ts.factory.createModuleBlock(
              writeModulo(ctx, value.children, false),
            ),
            ts.NodeFlags.Namespace,
          ),
        );
    }
    return statements;
  };
}

interface IModulo {
  name: string;
  schema: OpenApi.IJsonSchema | null;
  children: Map<string, IModulo>;
}
