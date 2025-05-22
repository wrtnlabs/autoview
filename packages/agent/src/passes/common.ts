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
