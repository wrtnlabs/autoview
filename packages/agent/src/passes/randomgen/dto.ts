import { IAutoViewCompilerMetadata } from "@autoview/interface";

import { IAutoViewVendor } from "../../structures";

export interface Input {
  vendor: IAutoViewVendor;
  inputSchema: IAutoViewCompilerMetadata;
}

export interface Output {
  mockData: any;
}
