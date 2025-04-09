import {
  IChatGptSchema,
  IClaudeSchema,
  IGeminiSchema,
  ILlamaSchema,
  ILlmSchema,
  ILlmSchemaV3,
  ILlmSchemaV3_1,
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
      return convertSchemaFromClaudeSchema(
        schema as IClaudeSchema,
        ($defs ?? {}) as unknown as Record<string, IClaudeSchema>,
      );
    case "gemini":
      return convertSchemaFromGeminiSchema(schema as IGeminiSchema);
    case "llama":
      return convertSchemaFromLlamaSchema(
        schema as ILlamaSchema,
        ($defs ?? {}) as unknown as Record<string, ILlamaSchema>,
      );
    case "3.0":
      return convertSchemaFromLlmSchemaV3(schema as ILlmSchemaV3);
    case "3.1":
      return convertSchemaFromLlmSchemaV3_1(
        schema as ILlmSchemaV3_1,
        ($defs ?? {}) as unknown as Record<string, ILlmSchemaV3_1>,
      );
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

export function convertSchemaFromLlamaSchema(
  schema: ILlamaSchema,
  $defs: Record<string, ILlamaSchema>,
): ConvertedSchema {
  const components: Record<string, OpenApi.IJsonSchema> = {};
  const result = LlmSchemaComposer.invert("llama")({
    schema,
    $defs,
    components,
  });

  return {
    schema: result,
    components,
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

export function convertSchemaFromLlmSchemaV3_1(
  schema: ILlmSchemaV3_1,
  $defs: Record<string, ILlmSchemaV3_1>,
): ConvertedSchema {
  const components: Record<string, OpenApi.IJsonSchema> = {};
  const result = LlmSchemaComposer.invert("3.1")({
    schema,
    $defs,
    components,
  });

  return {
    schema: result,
    components,
  };
}
