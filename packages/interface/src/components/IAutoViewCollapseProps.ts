import { IAutoViewNonSurfaceComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

/**
 * Props for the `AutoViewCollapse` component.
 *
 * The `AutoViewCollapse` component allows users to expand or collapse sections of content,
 * optimizing space usage and enhancing readability. It is commonly used for FAQs, settings panels,
 * and expandable content sections.
 *
 */
export interface IAutoViewCollapseProps
  extends IAutoViewComponentPropsBase<"Collapse"> {
  /**
   * Represents the header of an individual collapse item.
   * This section acts as the trigger to expand or collapse the content.
   */
  header: IAutoViewCollapseProps.IHeader;

  /**
   * Represents the collapsible content.
   * This section becomes visible when the collapse item is expanded.
   */
  content: IAutoViewCollapseProps.IContent;

  /**
   * Adds a border around each collapse item, distinguishing them from surrounding content.
   * @default true
   */
  bordered?: boolean;

  /**
   * Icon displayed for expanding the section.
   * If not provided, a default icon will be used.
   * @default undefined
   */
  expandIcon?: IAutoViewIconProps;

  /**
   * Icon displayed for collapsing the section.
   * If not provided, a default icon will be used.
   * @default undefined
   */
  collapseIcon?: IAutoViewIconProps;

  /**
   * Position of the expand/collapse icon relative to the header content.
   * @default 'start'
   */
  expandIconPosition?: IAutoViewCollapseProps.IIconPosition;

  /**
   * Defines the size of the collapse component.
   * @default 'middle'
   */
  size?: IAutoViewCollapseProps.ISize;
}

export namespace IAutoViewCollapseProps {
  /**
   * Represents the header of an individual collapse item.
   * Contains the main title or summary and may include additional elements.
   */
  export interface IHeader {
    /**
     * Main content of the header.
     * Should clearly indicate what the collapsible content contains.
     */
    children: IAutoViewNonSurfaceComponentProps[];
  }

  /**
   * Represents the content of an individual collapse item.
   * This section is displayed when the item is expanded.
   */
  export interface IContent {
    /**
     * Main content inside the collapsible section.
     */
    children: IAutoViewNonSurfaceComponentProps[];
  }

  /**
   * Defines the size options for the collapse component.
   * - 'large': Larger padding and font size.
   * - 'middle': Medium padding and font size.
   * - 'small': Smaller padding and font size.
   */
  export type ISize = "large" | "middle" | "small";

  /**
   * Defines the position options for the expand/collapse icon.
   * - `'start'`: Icon appears before the header content.
   * - `'end'`: Icon appears after the header content (default).
   */
  export type IIconPosition = "start" | "end";
}
