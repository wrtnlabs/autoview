import { AutoViewDtoProgrammer } from "@autoview/compiler/src/programmers/AutoViewDtoProgrammer";
import { AutoViewImportProgrammer } from "@autoview/compiler/src/programmers/AutoViewImportProgrammer";
import { AutoViewSchemaProgrammer } from "@autoview/compiler/src/programmers/AutoViewSchemaProgrammer";
import { FilePrinter } from "@autoview/compiler/src/utils/FilePrinter";
import { OpenApi, OpenApiTypeChecker } from "@samchon/openapi";
import fs from "fs";
import OpenAI from "openai";
import ts from "typescript";

import { TestGlobal } from "../TestGlobal";

export namespace VercelZeroMdxGenerator {
  export const generate = async (props: {
    components: OpenApi.IComponents;
    schema: OpenApi.IJsonSchema;
  }): Promise<string | null> => {
    const ctx = {
      importer: new AutoViewImportProgrammer(),
    };
    const references: Set<OpenApi.IJsonSchema> = new Set();
    OpenApiTypeChecker.visit({
      components: props.components,
      schema: props.schema,
      closure: (schema: OpenApi.IJsonSchema): void => {
        if (OpenApiTypeChecker.isReference(schema)) references.add(schema);
      },
    });
    const statements: ts.Statement[] = Array.from(references)
      .map((ref) => AutoViewDtoProgrammer.write(ctx, props.components, ref))
      .flat();
    if (false === OpenApiTypeChecker.isReference(props.schema))
      statements.push(
        ts.factory.createTypeAliasDeclaration(
          undefined,
          "UserSchema",
          [],
          AutoViewSchemaProgrammer.writeSchema(ctx, props.schema),
        ),
      );
    const api = new OpenAI({
      apiKey: TestGlobal.env.CHATGPT_API_KEY,
    });
    const prompt: string = await fs.promises.readFile(
      `examples/v0/system-prompt.md`,
      "utf8",
    );
    const response = await api.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: prompt
            .replace("${{ typescript }}", FilePrinter.write({ statements }))
            .replace(
              "${{ schema }}",
              OpenApiTypeChecker.isReference(props.schema)
                ? props.schema.$ref.split("/").pop()!
                : "UserSchema",
            ),
        },
      ],
    });
    return response.choices[0]?.message.content ?? null;
  };
}
