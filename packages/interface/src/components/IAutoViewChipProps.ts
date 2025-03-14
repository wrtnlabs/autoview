import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewIconProps } from "./IAutoViewIconProps";
import { IAutoViewImageAvatarProps } from "./IAutoViewImageAvatarProps";
import { IAutoViewLetterAvatarProps } from "./IAutoViewLetterAvatarProps";

/**
 * Props for the `AutoViewChip` component.
 *
 * The `AutoViewChip` component is an interactive UI element used for input, selection,
 * and filtering. It helps users display and manage information concisely.
 *
 * Common use cases:
 * - **Filter Selection:** Allows users to toggle various filter options.
 * - **Tag Management:** Helps users add or remove categories or tags.
 * - **Selection Display and Removal:** Shows selected items and enables removal.
 */
export interface IAutoViewChipProps
  extends IAutoViewComponentPropsBase<"Chip"> {
  /**
   * The text label displayed inside the chip.
   * - Represents the selected option, tag, or category.
   */
  label: string;

  /**
   * An element rendered at the **start (left side)** of the chip.
   * - Can be an `ImageAvatar`, `LetterAvatar`, or an `Icon` to provide additional context.
   * - Example: A profile picture in a user selection chip.
   */
  startElement?:
    | IAutoViewImageAvatarProps
    | IAutoViewLetterAvatarProps
    | IAutoViewIconProps;

  /**
   * An element rendered at the **end (right side)** of the chip.
   * - Can be an `Icon` representing an action (e.g., dropdown arrow or status indicator).
   * - Example: A small "check" icon indicating selection.
   */
  endElement?:
    | IAutoViewImageAvatarProps
    | IAutoViewLetterAvatarProps
    | IAutoViewIconProps;
}

export namespace IAutoViewChip {
  export type IColors = string;
  export type IStatus = "error" | "info" | "success" | "warning";

  export interface IExtended {
    color: IColors;
    status: IStatus;
    size: string | number;
  }
}
