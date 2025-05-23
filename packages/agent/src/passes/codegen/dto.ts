import {
  IAutoViewCompilerMetadata,
  IAutoViewCompilerResult,
} from "@autoview/interface";

import { IAutoViewVendor } from "../../structures";
import { PreGenerationCallback } from "../common";

export interface Input {
  /**
   * The ID of the session.
   */
  sessionId: string;

  /**
   * The vendor of the AutoView.
   */
  vendor: IAutoViewVendor;

  /**
   * The input schema that the generated code will use.
   */
  inputSchema: IAutoViewCompilerMetadata;

  /**
   * An optional callback function that will be called before the LLM generates a response.
   *
   * This is useful if you want to track LLM activities.
   *
   * To capture the completion callback, return `PostGenerationCallback` from this callback.
   */
  onPreLlmGeneration?: PreGenerationCallback;

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
