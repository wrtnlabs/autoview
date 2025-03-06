import { IAutoViewComponentPropsBase } from "../../properties/IAutoViewComponentPropsBase";

/**
 * Props for the `AutoViewIcon` component.
 *
 * The `AutoViewIcon` component is used to render icons in the UI.
 * It supports specifying the icon name (`name`) and its size (`size`).
 */
export interface IAutoViewIconProps
  extends IAutoViewComponentPropsBase<"Icon"> {
  /**
   * The name of the icon to be displayed.
   * - Defines which icon should be rendered.
   * - Must be one of the predefined icon names.
   *
   * Example:
   * ```ts
   * name: "search"
   * ```
   */
  name: IAutoViewIconProps.IType;

  /**
   * The size of the icon.
   * - Accepts predefined size values.
   * - Measured in pixels.
   * @default 16
   *
   * Example:
   * ```ts
   * size: 24
   * ```
   */
  size?: IAutoViewIconProps.ISize;
}

/**
 * Namespace containing type definitions for `IAutoViewIconProps`.
 */
export namespace IAutoViewIconProps {
  /**
   * Defines the available icon types.
   * - These represent different UI actions and symbols.
   */
  export type IType =
    | "arrow-down" // Downward arrow
    | "arrow-left" // Leftward arrow
    | "arrow-right" // Rightward arrow
    | "arrow-up" // Upward arrow
    | "check" // Check
    | "circle-check" // Check icon with a circle
    | "circle-close" // Close icon with a circle
    | "close" // Simple close icon
    | "home" // Home icon
    | "menu" // Menu (hamburger) icon
    | "search"; // Search (magnifying glass) icon

  /**
   * Defines the available icon sizes in pixels.
   * - These values ensure consistency across UI elements.
   */
  export type ISize = 12 | 16 | 20 | 24 | 32 | 40;
}
