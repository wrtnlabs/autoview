/**
 * The name of the type alias for the input type which derives from the input schema.
 *
 * This will be resulted in the generated code like:
 *
 * ```typescript
 * export type AutoViewInput = ...;
 * ```
 *
 * PROMPT: This type name is bound to the prompt, so it should not be changed without proper prompt update.
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
 *
 * PROMPT: This prefix is bound to the prompt, so it should not be changed without proper prompt update.
 */
export const BOILERPLATE_SUBTYPE_PREFIX = "AutoViewInputSubTypes";
