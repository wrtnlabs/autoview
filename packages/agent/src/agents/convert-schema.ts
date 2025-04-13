import {
  IChatGptSchema,
  IClaudeSchema,
  IGeminiSchema,
  ILlmSchema,
  ILlmSchemaV3,
  OpenApi,
} from "@samchon/openapi";
import { LlmSchemaComposer } from "@samchon/openapi/lib/composers/LlmSchemaComposer";

export interface ConvertedSchema {
  schema: OpenApi.IJsonSchema;
  components: OpenApi.IComponents;
}

export function convertSchema<Model extends ILlmSchema.Model>(
  model: Model,
  schema: ILlmSchema<Model>,
  $defs?: Record<string, ILlmSchema<Model>>,
): ConvertedSchema {
  switch (model) {
    case "chatgpt":
      return convertSchemaFromChatGptSchema(
        schema as IChatGptSchema,
        ($defs ?? {}) as unknown as Record<string, IChatGptSchema>,
      );
    case "claude":
    case "deepseek":
    case "llama":
    case "3.1":
      return convertSchemaFromClaudeSchema(
        schema as IClaudeSchema,
        ($defs ?? {}) as unknown as Record<string, IClaudeSchema>,
      );
    case "gemini":
      return convertSchemaFromGeminiSchema(schema as IGeminiSchema);
    case "3.0":
      return convertSchemaFromLlmSchemaV3(schema as ILlmSchemaV3);
    default:
      throw new Error(`the model ${model} is unsupported`);
  }
}

export function convertSchemaFromChatGptSchema(
  schema: IChatGptSchema,
  $defs: Record<string, IChatGptSchema>,
): ConvertedSchema {
  const components: Record<string, OpenApi.IJsonSchema> = {};
  const result = LlmSchemaComposer.invert("chatgpt")({
    schema,
    $defs,
    components,
  });

  return {
    schema: result,
    components,
  };
}

export function convertSchemaFromClaudeSchema(
  schema: IClaudeSchema,
  $defs: Record<string, IClaudeSchema>,
): ConvertedSchema {
  const components: Record<string, OpenApi.IJsonSchema> = {};
  const result = LlmSchemaComposer.invert("claude")({
    schema,
    $defs,
    components,
  });

  return {
    schema: result,
    components,
  };
}

export function convertSchemaFromGeminiSchema(
  schema: IGeminiSchema,
): ConvertedSchema {
  const result = LlmSchemaComposer.invert("gemini")({
    schema,
  });

  return {
    schema: result,
    components: {},
  };
}

export function convertSchemaFromLlmSchemaV3(
  schema: ILlmSchemaV3,
): ConvertedSchema {
  const result = LlmSchemaComposer.invert("3.0")({
    schema,
  });

  return {
    schema: result,
    components: {},
  };
}
