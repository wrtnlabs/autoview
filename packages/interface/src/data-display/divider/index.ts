import { IAutoViewComponentPropsBase } from "../../properties/IAutoViewComponentPropsBase";

/**
 * Props for the `AutoViewDivider` component.
 *
 * The `AutoViewDivider` component is used to create a visual boundary between different sections of content,
 * enhancing readability and guiding the user's visual flow.
 *
 * Common use cases:
 * - **Content Separation:** Groups related information or separates distinct sections.
 * - **Guiding Visual Flow:** Helps maintain a structured and logical layout.
 */
export interface IAutoViewDividerProps
  extends IAutoViewComponentPropsBase<"Divider"> {
  /**
   * Defines the orientation of the divider.
   * - `"horizontal"`: Creates a horizontal divider.
   * - `"vertical"`: Creates a vertical divider, useful for side-by-side layouts.
   * @default "horizontal"
   *
   * Example:
   * ```tsx
   * <AutoViewDivider orientation="vertical" />
   * ```
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Specifies the style of the divider.
   * - `"solid"`: A continuous solid line.
   * - `"dashed"`: A dashed line, providing a subtle separation.
   * - `"dotted"`: A dotted line, often used for lightweight section divisions.
   * @default "solid"
   *
   * Example:
   * ```tsx
   * <AutoViewDivider variant="dashed" />
   * ```
   */
  variant?: "solid" | "dashed" | "dotted";

  /**
   * Sets the color of the divider.
   * - Accepts any valid CSS color value (e.g., `"black"`, `"#ff5733"`, `"rgba(0,0,0,0.5)"`).
   * @default "#d3d3d3"
   *
   * Example:
   * ```tsx
   * <AutoViewDivider color="#d3d3d3" />
   * ```
   */
  color?: string;
}
