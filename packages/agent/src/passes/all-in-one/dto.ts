import {
  IAutoViewCompilerMetadata,
  IAutoViewCompilerResult,
} from "@autoview/interface";

import { IAutoViewVendor } from "../../structures";

export interface Input {
  vendor: IAutoViewVendor;
  inputSchema: IAutoViewCompilerMetadata;
  componentSchema: IAutoViewCompilerMetadata;
  instruction?: string;
  transformFunctionName: string;
  onCompilerError?: (
    tsCode: string,
    diagnostics: IAutoViewCompilerResult.IDiagnostic[],
  ) => void | Promise<void>;
}

export interface Output {
  transformTsCode: string;
}
