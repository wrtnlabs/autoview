import {
  IAutoViewCompilerMetadata,
  IAutoViewCompilerResult,
} from "@autoview/interface";

import { IAutoViewVendor } from "../../structures";

export interface Input {
  vendor: IAutoViewVendor;
  inputSchema: IAutoViewCompilerMetadata;
  onCompilerError?: (
    tsCode: string,
    diagnostics: IAutoViewCompilerResult.IDiagnostic[],
  ) => void | Promise<void>;
}

export interface Output {
  generatedTsCode: string;
  entireTsCode: string;
  jsCode: string;
}
