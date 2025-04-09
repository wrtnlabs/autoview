import { IClaudeSchema, OpenApi } from "@samchon/openapi";

export type IAutoViewCompilerMetadata =
  | IAutoViewCompilerMetadata.IOfClaudeParameters
  | IAutoViewCompilerMetadata.IOfClaudeSchema
  | IAutoViewCompilerMetadata.IOfJsonSchema;

export namespace IAutoViewCompilerMetadata {
  export interface IOfClaudeParameters {
    parameters: IClaudeSchema.IParameters;
  }

  export interface IOfClaudeSchema {
    $defs: Record<string, IClaudeSchema>;
    schema: IClaudeSchema;
  }

  export interface IOfJsonSchema {
    components: OpenApi.IComponents;
    schema: OpenApi.IJsonSchema;
  }
}
