import { IAutoViewCompilerMetadata } from "@autoview/interface";

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
   * The input schema that the generated mock data will match with.
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
}

export interface Output {
  /**
   * The generated mock data.
   */
  mockData: unknown;
}
