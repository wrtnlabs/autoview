export type IAutoViewChatMessage =
  | IAutoViewChatDeveloperMessage
  | IAutoViewChatUserMessage
  | IAutoViewChatAssistantMessage
  | IAutoViewChatToolMessage;

export interface IAutoViewChatMessageBase<T extends string> {
  id: string;
  role: T;
  timestamp: Date;
}

export interface IAutoViewChatDeveloperMessage
  extends IAutoViewChatMessageBase<"developer"> {
  contents: IAutoViewChatMessageTextContent[];
}

export interface IAutoViewChatUserMessage
  extends IAutoViewChatMessageBase<"user"> {
  contents: IAutoViewChatMessageContent[];
}

export interface IAutoViewChatAssistantMessage
  extends IAutoViewChatMessageBase<"assistant"> {
  contents: (
    | IAutoViewChatMessageTextContent
    | IAutoViewChatMessageToolCallContent
  )[];
}

export interface IAutoViewChatToolMessage
  extends IAutoViewChatMessageBase<"tool"> {
  tool_call_id: string;
  tool_name: string;
  contents: IAutoViewChatMessageTextContent[];
}

export type IAutoViewChatMessageContent =
  | IAutoViewChatMessageTextContent
  | IAutoViewChatMessageImageContent;

export interface IAutoViewChatMessageContentBase<T extends string> {
  type: T;
}

export interface IAutoViewChatMessageTextContent
  extends IAutoViewChatMessageContentBase<"text"> {
  text: string;
}

export interface IAutoViewChatMessageImageContent
  extends IAutoViewChatMessageContentBase<"image"> {
  image_url: string;
}

export interface IAutoViewChatMessageToolCallContent
  extends IAutoViewChatMessageContentBase<"tool"> {
  id: string;
  tool_name: string;
  /**
   * The arguments of the tool call.
   *
   * The arguments are serialized as JSON string. Note that the arguments can be
   * a mangled or invalid JSON string.
   */
  arguments: string;
}
