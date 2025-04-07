import { OpenApi, OpenApiTypeChecker } from "@samchon/openapi";
import ts from "typescript";
import typia from "typia";
import { TypeFactory } from "typia/lib/factories/TypeFactory";
import { FormatCheatSheet } from "typia/lib/tags/internal/FormatCheatSheet";
import { Escaper } from "typia/lib/utils/Escaper";

import { FilePrinter } from "../utils/FilePrinter";
import { StringUtil } from "../utils/StringUtil";
import { AutoViewImportProgrammer } from "./AutoViewImportProgrammer";
import { IAutoViewProgrammerContext } from "./IAutoViewProgrammerContext";

export namespace AutoViewSchemaProgrammer {
  export const writeSchema = (
    ctx: IAutoViewProgrammerContext,
    schema: OpenApi.IJsonSchema,
  ): ts.TypeNode => {
    // CONSIDER ANY TYPE CASE
    const union: ts.TypeNode[] = [];
    if (OpenApiTypeChecker.isUnknown(schema)) return TypeFactory.keyword("any");

    // ITERATION
    const type: ts.TypeNode = (() => {
      // ATOMIC
      if (OpenApiTypeChecker.isConstant(schema))
        return writeConstant(ctx, schema);
      else if (OpenApiTypeChecker.isBoolean(schema))
        return writeBoolean(ctx, schema);
      else if (OpenApiTypeChecker.isInteger(schema))
        return writeInteger(ctx, schema);
      else if (OpenApiTypeChecker.isNumber(schema))
        return writeNumber(ctx, schema);
      else if (OpenApiTypeChecker.isString(schema))
        return writeString(ctx, schema);
      // INSTANCES
      else if (OpenApiTypeChecker.isArray(schema))
        return writeArray(ctx, schema);
      else if (OpenApiTypeChecker.isTuple(schema))
        return writeTuple(ctx, schema);
      else if (OpenApiTypeChecker.isObject(schema))
        return writeObject(ctx, schema);
      else if (OpenApiTypeChecker.isReference(schema))
        return writeReference(schema);
      // UNION
      else if (OpenApiTypeChecker.isOneOf(schema))
        return writeOneOf(ctx, schema);
      else if (OpenApiTypeChecker.isNull(schema)) return createNode("null");
      else return TypeFactory.keyword("any");
    })();
    union.push(type);

    // DETERMINE
    if (union.length === 0) return TypeFactory.keyword("any");
    else if (union.length === 1) return union[0]!;
    return ts.factory.createUnionTypeNode(union);
  };

  /* -----------------------------------------------------------
    ATOMICS
  ----------------------------------------------------------- */
  const writeConstant = (
    ctx: IAutoViewProgrammerContext,
    schema: OpenApi.IJsonSchema.IConstant,
  ): ts.TypeNode => {
    const intersection: ts.TypeNode[] = [
      ts.factory.createLiteralTypeNode(
        typeof schema.const === "boolean"
          ? schema.const === true
            ? ts.factory.createTrue()
            : ts.factory.createFalse()
          : typeof schema.const === "number"
            ? schema.const < 0
              ? ts.factory.createPrefixUnaryExpression(
                  ts.SyntaxKind.MinusToken,
                  ts.factory.createNumericLiteral(-schema.const),
                )
              : ts.factory.createNumericLiteral(schema.const)
            : ts.factory.createStringLiteral(schema.const),
      ),
    ];
    writePlugin({
      importer: ctx.importer,
      regular: typia.misc.literals<keyof OpenApi.IJsonSchema.IConstant>(),
      intersection,
      schema,
    });
    return intersection.length === 1
      ? intersection[0]!
      : ts.factory.createIntersectionTypeNode(intersection);
  };

  const writeBoolean = (
    ctx: IAutoViewProgrammerContext,
    schema: OpenApi.IJsonSchema.IBoolean,
  ): ts.TypeNode => {
    const intersection: ts.TypeNode[] = [TypeFactory.keyword("boolean")];
    writePlugin({
      importer: ctx.importer,
      regular: typia.misc.literals<keyof OpenApi.IJsonSchema.IBoolean>(),
      intersection,
      schema,
    });
    return intersection.length === 1
      ? intersection[0]!
      : ts.factory.createIntersectionTypeNode(intersection);
  };

  const writeInteger = (
    ctx: IAutoViewProgrammerContext,
    schema: OpenApi.IJsonSchema.IInteger,
  ): ts.TypeNode =>
    writeNumeric(() => [
      TypeFactory.keyword("number"),
      ctx.importer.tag("Type", schema.minimum === 0 ? "uint32" : "int32"),
    ])(ctx, {
      ...schema,
      minimum: schema.minimum === 0 ? undefined : schema.minimum,
    });

  const writeNumber = (
    ctx: IAutoViewProgrammerContext,
    schema: OpenApi.IJsonSchema.INumber,
  ): ts.TypeNode =>
    writeNumeric(() => [TypeFactory.keyword("number")])(ctx, schema);

  const writeNumeric =
    (factory: () => ts.TypeNode[]) =>
    (
      ctx: IAutoViewProgrammerContext,
      schema: OpenApi.IJsonSchema.IInteger | OpenApi.IJsonSchema.INumber,
    ): ts.TypeNode => {
      const intersection: ts.TypeNode[] = factory();
      if (schema.default !== undefined)
        intersection.push(ctx.importer.tag("Default", schema.default));
      if (schema.minimum !== undefined)
        intersection.push(ctx.importer.tag("Minimum", schema.minimum));
      if (schema.maximum !== undefined)
        intersection.push(ctx.importer.tag("Maximum", schema.maximum));
      if (typeof schema.exclusiveMinimum === "number")
        intersection.push(
          ctx.importer.tag("ExclusiveMinimum", schema.exclusiveMinimum),
        );
      if (typeof schema.exclusiveMaximum === "number")
        intersection.push(
          ctx.importer.tag("ExclusiveMaximum", schema.exclusiveMaximum),
        );
      if (schema.multipleOf !== undefined)
        intersection.push(ctx.importer.tag("MultipleOf", schema.multipleOf));
      writePlugin({
        importer: ctx.importer,
        regular: typia.misc.literals<keyof OpenApi.IJsonSchema.INumber>(),
        intersection,
        schema,
      });
      return intersection.length === 1
        ? intersection[0]!
        : ts.factory.createIntersectionTypeNode(intersection);
    };

  const writeString = (
    ctx: IAutoViewProgrammerContext,
    schema: OpenApi.IJsonSchema.IString,
  ): ts.TypeNode => {
    if (schema.format === "binary")
      return ts.factory.createTypeReferenceNode("File");

    const intersection: ts.TypeNode[] = [TypeFactory.keyword("string")];
    if (schema.default !== undefined)
      intersection.push(ctx.importer.tag("Default", schema.default));
    if (schema.minLength !== undefined)
      intersection.push(ctx.importer.tag("MinLength", schema.minLength));
    if (schema.maxLength !== undefined)
      intersection.push(ctx.importer.tag("MaxLength", schema.maxLength));
    if (schema.pattern !== undefined)
      intersection.push(ctx.importer.tag("Pattern", schema.pattern));
    if (
      schema.format !== undefined &&
      (FormatCheatSheet as Record<string, string>)[schema.format] !== undefined
    )
      intersection.push(ctx.importer.tag("Format", schema.format));
    if (schema.contentMediaType !== undefined)
      intersection.push(
        ctx.importer.tag("ContentMediaType", schema.contentMediaType),
      );
    writePlugin({
      importer: ctx.importer,
      regular: typia.misc.literals<keyof OpenApi.IJsonSchema.IString>(),
      intersection,
      schema,
    });
    return intersection.length === 1
      ? intersection[0]!
      : ts.factory.createIntersectionTypeNode(intersection);
  };

  /* -----------------------------------------------------------
    INSTANCES
  ----------------------------------------------------------- */
  const writeArray = (
    ctx: IAutoViewProgrammerContext,
    schema: OpenApi.IJsonSchema.IArray,
  ): ts.TypeNode => {
    const intersection: ts.TypeNode[] = [
      ts.factory.createArrayTypeNode(writeSchema(ctx, schema.items)),
    ];
    if (schema.minItems !== undefined)
      intersection.push(ctx.importer.tag("MinItems", schema.minItems));
    if (schema.maxItems !== undefined)
      intersection.push(ctx.importer.tag("MaxItems", schema.maxItems));
    if (schema.uniqueItems === true)
      intersection.push(ctx.importer.tag("UniqueItems"));
    writePlugin({
      importer: ctx.importer,
      regular: typia.misc.literals<keyof OpenApi.IJsonSchema.IArray>(),
      intersection,
      schema,
    });
    return intersection.length === 1
      ? intersection[0]!
      : ts.factory.createIntersectionTypeNode(intersection);
  };

  const writeTuple = (
    ctx: IAutoViewProgrammerContext,
    schema: OpenApi.IJsonSchema.ITuple,
  ): ts.TypeNode => {
    const tuple: ts.TypeNode = ts.factory.createTupleTypeNode([
      ...schema.prefixItems.map((pi) => writeSchema(ctx, pi)),
      ...(typeof schema.additionalItems === "object" &&
      schema.additionalItems !== null
        ? [
            ts.factory.createRestTypeNode(
              writeSchema(ctx, schema.additionalItems),
            ),
          ]
        : schema.additionalItems === true
          ? [
              ts.factory.createRestTypeNode(
                ts.factory.createArrayTypeNode(
                  ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                ),
              ),
            ]
          : []),
    ]);
    const intersection: ts.TypeNode[] = [tuple];
    writePlugin({
      importer: ctx.importer,
      regular: typia.misc.literals<keyof OpenApi.IJsonSchema.ITuple>(),
      intersection,
      schema,
    });
    return intersection.length === 1
      ? intersection[0]!
      : ts.factory.createIntersectionTypeNode(intersection);
  };

  const writeObject = (
    ctx: IAutoViewProgrammerContext,
    schema: OpenApi.IJsonSchema.IObject,
  ): ts.TypeNode => {
    const regular = () =>
      ts.factory.createTypeLiteralNode(
        Object.entries(schema.properties ?? []).map(([key, value]) =>
          writeRegularProperty(ctx, {
            required: schema.required ?? [],
            key,
            value,
          }),
        ),
      );
    const dynamic = () =>
      ts.factory.createTypeLiteralNode([
        writeDynamicProperty(
          ctx,
          schema.additionalProperties as OpenApi.IJsonSchema,
        ),
      ]);
    return !!schema.properties?.length &&
      typeof schema.additionalProperties === "object"
      ? ts.factory.createIntersectionTypeNode([regular(), dynamic()])
      : typeof schema.additionalProperties === "object"
        ? dynamic()
        : regular();
  };

  const writeRegularProperty = (
    ctx: IAutoViewProgrammerContext,
    props: {
      required: string[];
      key: string;
      value: OpenApi.IJsonSchema;
    },
  ) =>
    FilePrinter.description(
      ts.factory.createPropertySignature(
        undefined,
        Escaper.variable(props.key)
          ? ts.factory.createIdentifier(props.key)
          : ts.factory.createStringLiteral(props.key),
        props.required.includes(props.key)
          ? undefined
          : ts.factory.createToken(ts.SyntaxKind.QuestionToken),
        writeSchema(ctx, props.value),
      ),
      writeComment(props.value),
    );

  const writeDynamicProperty = (
    ctx: IAutoViewProgrammerContext,
    value: OpenApi.IJsonSchema,
  ) =>
    FilePrinter.description(
      ts.factory.createIndexSignature(
        undefined,
        [
          ts.factory.createParameterDeclaration(
            undefined,
            undefined,
            ts.factory.createIdentifier("key"),
            undefined,
            TypeFactory.keyword("string"),
          ),
        ],
        writeSchema(ctx, value),
      ),
      writeComment(value),
    );

  const writeReference = (
    schema: OpenApi.IJsonSchema.IReference,
  ): ts.TypeReferenceNode | ts.KeywordTypeNode => {
    if (schema.$ref.startsWith("#/components/schemas") === false)
      return TypeFactory.keyword("any");
    const name: string = schema.$ref
      .split("/")
      .slice(3)
      .filter((str) => str.length !== 0)
      .map(StringUtil.escapeNonVariable)
      .join("");
    if (name === "") return TypeFactory.keyword("any");
    return ts.factory.createTypeReferenceNode(name);
  };

  /* -----------------------------------------------------------
    UNIONS
  ----------------------------------------------------------- */
  const writeOneOf = (
    ctx: IAutoViewProgrammerContext,
    schema: OpenApi.IJsonSchema.IOneOf,
  ): ts.UnionTypeNode =>
    ts.factory.createUnionTypeNode(
      schema.oneOf.map((elem) => writeSchema(ctx, elem)),
    );
}

const createNode = (text: string) => ts.factory.createTypeReferenceNode(text);

// const writeComment = (schema: OpenApi.IJsonSchema): string =>
//   [
//     ...(schema.description?.length ? [schema.description] : []),
//     ...(schema.description?.length &&
//     (schema.title !== undefined || schema.deprecated === true)
//       ? [""]
//       : []),
//     ...(schema.title !== undefined ? [`@title ${schema.title}`] : []),
//     ...(schema.deprecated === true ? [`@deprecated`] : []),
//   ]
//     .join("\n")
//     .split("*/")
//     .join("*\\/");

const writePlugin = (props: {
  importer: AutoViewImportProgrammer;
  regular: string[];
  intersection: ts.TypeNode[];
  schema: any;
}) => {
  const extra: any = {};
  for (const [key, value] of Object.entries(props.schema))
    if (value !== undefined && false === props.regular.includes(key))
      extra[key] = value;
  if (Object.keys(extra).length !== 0)
    props.intersection.push(props.importer.tag("JsonSchemaPlugin", extra));
};

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
