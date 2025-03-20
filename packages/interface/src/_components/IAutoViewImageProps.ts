import { tags } from "typia";

import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";

/**
 * Props for the `AutoViewImage` component.
 *
 * The `AutoViewImage` component is used to display images in the UI.
 * It supports specifying the image source (`src`) and alternative text (`alt`).
 */
export interface IAutoViewImageProps
  extends IAutoViewComponentPropsBase<"Image"> {
  /**
   * The URL of the image to be displayed.
   * - Must be a valid URI format.
   * - Used to fetch and render the image.
   *
   * Example:
   * ```ts
   * src: "https://example.com/image.jpg"
   * ```
   */
  src: string & tags.Format<"uri">;

  /**
   * Alternative text for the image.
   * - Displayed when the image cannot be loaded.
   * - Improves accessibility and SEO.
   * - Screen readers use this text to describe the image to visually impaired users.
   *
   * @default "" (empty string)
   */
  alt?: string;
}
