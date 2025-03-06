import { IChatGptSchema, OpenApi } from "@samchon/openapi";

export type IAutoViewCompilerProps =
  | IAutoViewCompilerProps.IOfChatGptParameters
  | IAutoViewCompilerProps.IOfChatGptSchema
  | IAutoViewCompilerProps.IOfJsonSchema;
export namespace IAutoViewCompilerProps {
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
