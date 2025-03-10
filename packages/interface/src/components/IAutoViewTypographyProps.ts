import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";

/**
 * Props for the `AutoViewTypography` component.
 *
 * The `AutoViewTypography` component is used to display text with different styles,
 * colors, and behaviors such as truncation and line clamping.
 */
export interface IAutoViewTypographyProps
  extends IAutoViewComponentPropsBase<"Typography"> {
  /**
   * Defines the style of the typography.
   * - Determines the font size, weight, and spacing.
   * - Common values include 'h1', 'body1', 'subtitle1', etc.
   * @default "body1"
   */
  variant?: IAutoViewTypographyProps.IVariant;

  /**
   * Defines the text color.
   * - Accepts any valid CSS color value (e.g., "red", "#FF0000", "rgba(0,0,0,0.87)").
   * - Typically used to match theme or provide emphasis.
   * @default "inherit"
   */
  color?: IAutoViewTypographyProps.IColor;

  /**
   * Enables text truncation with an ellipsis ("...").
   * - If `true`, the text will be cut off with an ellipsis if it overflows its container.
   * - Useful for single-line text elements where space is limited.
   * @default false
   */
  ellipsis?: boolean;

  /**
   * Limits the number of lines the text can span.
   * - If a number is provided, the text will be truncated after that many lines.
   * - If `null`, no line clamping is applied.
   * - Typically used when dealing with long text content in constrained spaces.
   * @default null
   */
  lineClamp?: number | null;
}

/**
 * Namespace containing type definitions for `IAutoViewTypographyProps`.
 */
export namespace IAutoViewTypographyProps {
  /**
   * Defines the available typography variants.
   * - Matches common text styles used in UI design.
   */
  export type IVariant =
    | "body1" // Default body text
    | "body2" // Smaller body text
    | "button" // Button text style
    | "caption" // Small caption text
    | "h1" // Heading 1
    | "h2" // Heading 2
    | "h3" // Heading 3
    | "h4" // Heading 4
    | "h5" // Heading 5
    | "h6" // Heading 6
    | "inherit" // Inherits styles from parent
    | "overline" // Overline text (typically uppercase, small)
    | "subtitle1" // Subtitle style 1
    | "subtitle2"; // Subtitle style 2

  /**
   * Defines the type for the `color` property.
   * - Accepts any valid CSS color value.
   */
  export type IColor = string;
}
