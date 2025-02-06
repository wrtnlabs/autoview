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
     * Options for the request.
     */
    options?: OpenAI.RequestOptions | undefined;
  }
}
