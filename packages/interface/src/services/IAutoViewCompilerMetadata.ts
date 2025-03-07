import { IChatGptSchema, OpenApi } from "@samchon/openapi";

export type IAutoViewCompilerMetadata =
  | IAutoViewCompilerMetadata.IOfChatGptParameters
  | IAutoViewCompilerMetadata.IOfChatGptSchema
  | IAutoViewCompilerMetadata.IOfJsonSchema;
export namespace IAutoViewCompilerMetadata {
  export interface IOfChatGptParameters {
    parameters: IChatGptSchema.IParameters;
  }

  export interface IOfChatGptSchema {
    $defs: Record<string, IChatGptSchema>;
    schema: IChatGptSchema;
  }

  export interface IOfJsonSchema {
    components: OpenApi.IComponents;
    schema: OpenApi.IJsonSchema;
  }
}
