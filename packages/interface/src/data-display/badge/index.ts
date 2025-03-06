import { IAutoViewComponentProps } from "../../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../properties/IAutoViewComponentPropsBase";

/**
 * Props for the `AutoViewBadge` component.
 *
 * The `AutoViewBadge` component is used to display numerical values or a status indicator (dot)
 * as an overlay on another UI element. It provides supplementary information, such as unread
 * notifications or online statuses.
 */
export interface IAutoViewBadgeProps
  extends IAutoViewComponentPropsBase<"Badge"> {
  /**
   * The numeric value displayed inside the badge.
   * - Used for notifications, item counts, or other numerical indicators.
   * - If `showZero` is `false`, the badge is hidden when `count` is `0`.
   * @default 0
   */
  count: number;

  /**
   * The child element that the badge is attached to.
   * - The badge is overlaid on this element.
   * - Typically an icon, button, or avatar.
   */
  children: IAutoViewComponentProps;

  /**
   * The maximum number displayed inside the badge.
   * - If `count` exceeds `maxCount`, it is displayed as `${maxCount}+`.
   * - Prevents large numbers from overflowing the badge UI.
   * @default 99
   *
   * Example:
   * - If `count = 120` and `maxCount = 99`, the displayed value will be `"99+"`.
   */
  maxCount?: number;

  /**
   * Whether to show the badge when `count` is `0`.
   * - If `true`, the badge is displayed even when `count` is `0`.
   * - If `false`, the badge is hidden when `count` is `0`.
   * @default false
   */
  showZero?: boolean;

  /**
   * Enables the dot indicator mode.
   * - If `true`, the badge is displayed as a small dot instead of a number.
   * - Typically used for status indicators (e.g., online/offline).
   * @default false
   */
  dot?: boolean;

  /**
   * Adjusts the position of the badge relative to its parent element.
   * - `vertical`: Controls vertical positioning (`"top"` or `"bottom"`).
   * @default "top"
   * - `horizontal`: Controls horizontal positioning (`"left"` or `"right"`).
   * @default "right"
   *
   * Example:
   * ```ts
   * offset: { vertical: "bottom", horizontal: "left" }
   * ```
   * This places the badge at the bottom-left corner of the parent element.
   */
  offset?: {
    vertical?: "top" | "bottom";
    horizontal?: "left" | "right";
  };
}

export namespace IAutoViewBadge {
  export type IColors = string;
  export type IStatus = "error" | "info" | "success" | "warning";

  export interface IExtended {
    color: IColors;
    status: IStatus;
    size: string | number;
  }
}
