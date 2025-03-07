import { IAutoViewComponentPropsBase } from "../../properties/IAutoViewComponentPropsBase";

/**
 * Props for the `AutoViewLetterAvatar` component.
 *
 * The `AutoViewLetterAvatar` component is used to generate an avatar with initials or a letter.
 * It allows specifying the name (`name`) and background color (`color`).
 */
export interface IAutoViewLetterAvatarProps
  extends IAutoViewComponentPropsBase<"LetterAvatar"> {
  /**
   * The name used to generate the letter avatar.
   * - Typically the user's name or initials.
   * - The first letter of the name is displayed inside the avatar.
   *
   * Example:
   * ```ts
   * name: "John Doe" // Displays "J"
   * ```
   */
  name: string;

  /**
   * The background color of the avatar.
   * - Accepts any valid CSS color value (e.g., "blue", "#FF5733", "rgb(255, 99, 71)").
   * - Used to differentiate avatars visually.
   * @default "#3498db"
   *
   * Example:
   * ```ts
   * color: "#3498db"
   * ```
   */
  color: IAutoViewLetterAvatarProps.IColor;
}

/**
 * Namespace containing type definitions for `IAutoViewLetterAvatarProps`.
 */
export namespace IAutoViewLetterAvatarProps {
  /**
   * Defines the type for the `color` property.
   * - Represents the background color of the avatar.
   * - Accepts any valid CSS color format.
   */
  export type IColor = string;
}
