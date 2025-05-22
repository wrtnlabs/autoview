import {
  IAutoViewCompilerMetadata,
  IAutoViewCompilerResult,
} from "@autoview/interface";

import { IAutoViewVendor } from "../../structures";

export interface Input {
  /**
   * The vendor of the AutoView.
   */
  vendor: IAutoViewVendor;

  /**
   * The input schema that the generated code will use.
   */
  inputSchema: IAutoViewCompilerMetadata;

  /*
   * An optional callback function for handling the compiler error.
   */
  onCompilerError?: (
    tsCode: string,
    diagnostics: IAutoViewCompilerResult.IDiagnostic[],
  ) => void | Promise<void>;
}

export interface Output {
  /**
   * The generated TypeScript code. This field does not include the boilerplate code, including imports and input type definitions.
   */
  generatedTsCode: string;

  /**
   * The entire TypeScript code. This field includes the boilerplate code, including imports and input type definitions.
   */
  entireTsCode: string;

  /**
   * The transpiled JavaScript code.
   */
  jsCode: string;
}
