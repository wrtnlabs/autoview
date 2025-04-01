import OpenAI from "openai";

/**
 * Vendor of the {@link AutoViewAgent}.
 *
 * It defines the LLM vendor and the model to be used.
 */
export interface IAutoViewVendor {
  /**
   * OpenAI API instance.
   *
   * Your project must install `openai` package and provide an own instance.
   *
   * @example
   *
   * ```typescript
   * import OpenAI from "openai";
   *
   * const vendor: IAutoViewVendor = {
   *   api: new OpenAI(...), // Provide your own OpenAI instance
   *   ...
   * };
   * ```
   */
  api: OpenAI;

  /**
   * Chat model to be used.
   */
  model: OpenAI.ChatModel;

  /**
   * Whether to enable thinking.
   *
   * Set this `true` if your model supports thinking, and you want to use thinking.
   */
  isThinkingEnabled?: boolean;

  /**
   * Options for the request.
   */
  options?: OpenAI.RequestOptions | undefined;
}
