import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";

/**
 * The component rendering the markdown content.
 *
 * If cannot find proper component to render, just utilize this one
 * so that render the markdown content.
 *
 * When writing the markdown content, if required, utilize the mermaid
 * syntax for drawing some digrams. When image contents are, just put
 * them through the markdown image syntax.
 */
export interface IAutoViewMarkdownProps
  extends IAutoViewComponentPropsBase<"Markdown"> {
  /**
   * The markdown content.
   */
  content: string;
}
