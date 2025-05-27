import OpenAI from "openai";
import { Stream } from "openai/streaming";

import { ILlmBackoffStrategy } from "../core";

/**
 * The name of the type alias for the input type which derives from the input schema.
 *
 * This will be resulted in the generated code like:
 *
 * ```typescript
 * export type AutoViewInput = ...;
 * ```
 */
export const BOILERPLATE_ALIAS = "AutoViewInput";

/**
 * The prefix (namespace name) of the subtype names for the input type which derives from the components of the input schema.
 *
 * This will be resulted in the generated code like:
 *
 * ```typescript
 * export namespace AutoViewInputSubTypes {
 *   // ...
 * }
 * ```
 */
export const BOILERPLATE_SUBTYPE_PREFIX = "AutoViewInputSubTypes";

/**
 * A callback function that will be called before the LLM generates a response.
 *
 * This callback can return `PostGenerationCallback` to capture the completion callback.
 */
export type PreGenerationCallback = (
  sessionId: string,
  api: OpenAI,
  body: OpenAI.Chat.Completions.ChatCompletionCreateParams,
  options: OpenAI.RequestOptions | undefined,
  backoffStrategy: ILlmBackoffStrategy,
) =>
  | void
  | PostGenerationCallback
  | Promise<PostGenerationCallback | undefined | void>;

/**
 * A callback function that will be called after the LLM generates a response.
 */
export type PostGenerationCallback = (
  sessionId: string,
  completion: (
    | OpenAI.Chat.Completions.ChatCompletion
    | Stream<OpenAI.Chat.Completions.ChatCompletionChunk>
  ) & {
    _request_id?: string | null;
  },
) => void | Promise<void>;
