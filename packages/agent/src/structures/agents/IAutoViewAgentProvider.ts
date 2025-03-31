import OpenAI from "openai";

export type IAutoViewAgentProvider = IAutoViewAgentProvider.IChatGpt;
export namespace IAutoViewAgentProvider {
  export interface IChatGpt {
    /**
     * Discriminator type.
     */
    type: "chatgpt";

    /**
     * OpenAI API instance.
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
    isThinkingEnabled: boolean;

    /**
     * Options for the request.
     */
    options?: OpenAI.RequestOptions | undefined;
  }
}
