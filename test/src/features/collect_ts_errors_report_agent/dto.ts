import { IAutoViewVendor } from "@autoview/agent";
import { IAutoViewCompilerResult } from "@autoview/interface";

export interface Input {
  vendor: IAutoViewVendor;
  generatedCode: string;
  diagnostics: IAutoViewCompilerResult.IDiagnostic[];
}

export interface Output {
  componentName: string;
  componentProperties: string[];
}
