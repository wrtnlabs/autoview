import { OpenApi } from "@samchon/openapi";

export type IAutoViewCompilerMetadata = IAutoViewCompilerMetadata.IOfJsonSchema;

export namespace IAutoViewCompilerMetadata {
  export interface IOfJsonSchema {
    components: OpenApi.IComponents;
    schema: OpenApi.IJsonSchema;
  }
}
