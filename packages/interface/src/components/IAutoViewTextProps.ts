import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor, IAutoViewTypography } from "../properties/theme";
import { Arrayable } from "../utils";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

/**
 * Props for the `AutoViewTypography` component.
 *
 * The `AutoViewTypography` component is used to display text with different styles,
 * colors, and behaviors such as truncation and line clamping.
 */
export interface IAutoViewTextProps
  extends IAutoViewComponentPropsBase<"Text"> {
  /**
   * Defines the style of the typography.
   * - Determines the font size, weight, and spacing.
   * - Common values include 'h1', 'body1', 'subtitle1', etc.
   * @default "body1"
   */
  variant?: IAutoViewTextProps.IVariant;

  /**
   * Defines the text color.
   * - Accepts any valid CSS color value (e.g., "red", "#FF0000", "rgba(0,0,0,0.87)").
   * - Typically used to match theme or provide emphasis.
   * @default "inherit"
   */
  color?: IAutoViewTextProps.IColor;

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

  content: Arrayable<string | IAutoViewIconProps>;
}

/**
 * Namespace containing type definitions for `IAutoViewTypographyProps`.
 */
export namespace IAutoViewTextProps {
  /**
   * Defines the available typography variants.
   * - Matches common text styles used in UI design.
   */
  export type IVariant = IAutoViewTypography.IVariant;

  /**
   * Defines the type for the `color` property.
   * - Accepts any valid CSS color value.
   */
  export type IColor =
    | IAutoViewTypography.ITextColor
    | IAutoViewColor.IScale
    | `#${string}`;
}
