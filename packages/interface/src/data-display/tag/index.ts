import { ReactNode } from "react";

import { IAutoViewComponentPropsBase } from "../../properties/IAutoViewComponentPropsBase";

/**
 * Props for the `AutoViewTag` component.
 *
 * The `AutoViewTag` component visually highlights categories or represents statuses using short text.
 * It is mainly used for tagging content with keywords or labels, helping users recognize grouped information easily.
 *
 * Common use cases:
 * - **Tag Management:** Displays keywords or categories related to content.
 * - **Status Representation:** Indicates different statuses such as "New", "Popular", or "Limited".
 */
export interface IAutoViewTagProps extends IAutoViewComponentPropsBase<"Tag"> {
  /**
   * The text label displayed inside the tag.
   * - Represents the category, keyword, or status.
   * - Should be short and concise.
   */
  label: string;

  /**
   * A React element rendered at the **start (left side)** of the tag.
   * - Can be an `ImageAvatar`, `LetterAvatar`, or an `Icon` to provide additional context.
   * - Example: A user avatar in a social media post tag.
   */
  startElement?: ReactNode;

  /**
   * A React element rendered at the **end (right side)** of the tag.
   * - Can be an `Icon` to indicate additional meaning or actions.
   * - Example: A small info or checkmark icon representing status.
   */
  endElement?: ReactNode;
}

/**
 * Namespace for additional tag-related properties.
 */
export namespace IAutoViewTag {
  /**
   * Defines the color of the tag.
   * - Typically used to match the status or category.
   * - Can accept any valid CSS color string (e.g., `"#FF0000"`, `"blue"`, `"rgba(255, 0, 0, 1)"`).
   */
  export type IColors = string;

  /**
   * Represents predefined status types for the tag.
   * - Used to indicate different message types or categories.
   *
   * Available statuses:
   * - `"error"`: Represents an error or critical status.
   * - `"info"`: Provides general informational context.
   * - `"success"`: Indicates a successful or positive status.
   * - `"warning"`: Warns about potential issues or special cases.
   */
  export type IStatus = "error" | "info" | "success" | "warning";

  /**
   * Interface for extended tag configurations.
   */
  export interface IExtended {
    /**
     * The color of the tag.
     * - Accepts any valid CSS color string.
     */
    color?: IColors;

    /**
     * The status type of the tag.
     * - Determines the contextual meaning of the tag.
     */
    status?: IStatus;

    /**
     * The size of the tag.
     * - Can be specified as a string (`"small"`, `"medium"`, `"large"`) or a numerical pixel value (`12`, `16`, `24`).
     */
    size?: string | number;

    /**
     * Defines the visual style of the tag.
     * - `"filled"`: A solid background color (default).
     * - `"outlined"`: A border-only style with transparent background.
     * - Default: `"filled"`
     *
     * Example:
     * ```tsx
     * <AutoViewTag variant="outlined" />
     * ```
     */
    variant?: "filled" | "outlined";
  }
}
