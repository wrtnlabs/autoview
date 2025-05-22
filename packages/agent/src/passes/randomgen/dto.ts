import { IAutoViewCompilerMetadata } from "@autoview/interface";

import { IAutoViewVendor } from "../../structures";

export interface Input {
  /**
   * The vendor of the AutoView.
   */
  vendor: IAutoViewVendor;

  /**
   * The input schema that the generated mock data will match with.
   */
  inputSchema: IAutoViewCompilerMetadata;
}

export interface Output {
  /**
   * The generated mock data.
   */
  mockData: unknown;
}
