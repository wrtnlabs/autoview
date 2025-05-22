import { OpenApi } from "@samchon/openapi";
import { OpenApiTypeChecker } from "@samchon/openapi";
import ts from "typescript";

import { FilePrinter } from "../utils/FilePrinter";
import { MapUtil } from "../utils/MapUtil";
import { StringUtil } from "../utils/StringUtil";
import { AutoViewSchemaProgrammer } from "./AutoViewSchemaProgrammer";
import { IAutoViewProgrammerContext } from "./IAutoViewProgrammerContext";

export namespace AutoViewDtoProgrammer {
  export const write = (
    ctx: IAutoViewProgrammerContext,
    components: OpenApi.IComponents,
    schema: OpenApi.IJsonSchema,
    dtoPrefix: string,
    shouldExport: boolean,
  ): ts.ModuleDeclaration => {
    const references: Map<string, OpenApi.IJsonSchema> = new Map();
    OpenApiTypeChecker.visit({
      closure: (schema) => {
        if (OpenApiTypeChecker.isReference(schema)) {
          const key: string = schema.$ref.split("/").pop() ?? "";
          const value: OpenApi.IJsonSchema = components.schemas?.[key] ?? {};
          references.set(key, value);
        }
      },
      components,
      schema,
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

    const statements = writeModulo(ctx, components, schema, dict, dtoPrefix);

    return ts.factory.createModuleDeclaration(
      shouldExport
        ? [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)]
        : undefined,
      ts.factory.createIdentifier(dtoPrefix),
      ts.factory.createModuleBlock(statements),
      ts.NodeFlags.Namespace,
    );
  };

  const writeModulo = (
    ctx: IAutoViewProgrammerContext,
    components: OpenApi.IComponents,
    schema: OpenApi.IJsonSchema,
    dict: Map<string, IModulo>,
    dtoPrefix: string,
  ): ts.Statement[] => {
    const statements: ts.Statement[] = [];
    for (const [key, value] of dict) {
      if (value.schema) {
        if (OpenApiTypeChecker.isObject(value.schema)) {
          const members = AutoViewSchemaProgrammer.writeSchemaForInterface(
            ctx,
            value.schema,
            `${dtoPrefix}.`,
          );

          statements.push(
            FilePrinter.description(
              ts.factory.createInterfaceDeclaration(
                [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
                ts.factory.createIdentifier(StringUtil.escapeNonVariable(key)),
                undefined,
                undefined,
                members,
              ),
              writeComment(value.schema),
            ),
          );
        } else
          statements.push(
            FilePrinter.description(
              ts.factory.createTypeAliasDeclaration(
                [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
                ts.factory.createIdentifier(StringUtil.escapeNonVariable(key)),
                undefined,
                AutoViewSchemaProgrammer.writeSchema(
                  ctx,
                  value.schema,
                  `${dtoPrefix}.`,
                ),
              ),
              writeComment(value.schema),
            ),
          );
      }

      if (value.children.size)
        statements.push(
          ts.factory.createModuleDeclaration(
            [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
            ts.factory.createIdentifier(StringUtil.escapeNonVariable(key)),
            ts.factory.createModuleBlock(
              writeModulo(ctx, components, schema, value.children, dtoPrefix),
            ),
            ts.NodeFlags.Namespace,
          ),
        );
    }
    return statements;
  };
}

const writeComment = (schema: OpenApi.IJsonSchema): string =>
  [
    ...(schema.description?.length ? [schema.description] : []),
    ...(schema.description?.length &&
    (schema.title !== undefined || schema.deprecated === true)
      ? [""]
      : []),
    ...(schema.title !== undefined ? [`@title ${schema.title}`] : []),
    ...(schema.deprecated === true ? [`@deprecated`] : []),
  ]
    .join("\n")
    .split("*/")
    .join("*\\/");

interface IModulo {
  name: string;
  schema: OpenApi.IJsonSchema | null;
  children: Map<string, IModulo>;
}
