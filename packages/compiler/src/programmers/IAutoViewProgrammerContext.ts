import { OpenApi } from "@samchon/openapi";

import { AutoViewImportProgrammer } from "./AutoViewImportProgrammer";

export interface IAutoViewProgrammerContext {
  importer: AutoViewImportProgrammer;
  components: OpenApi.IComponents;
  schema: OpenApi.IJsonSchema;
  body: string;
}
