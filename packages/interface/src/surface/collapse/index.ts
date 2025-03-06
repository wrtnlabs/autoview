import {
  IAutoViewComponentProps,
  IAutoViewNonSurfaceComponentProps,
} from "../../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../properties/IAutoViewComponentPropsBase";

/**
 * Properties for configuring the Collapse component.
 *
 * The Collapse component allows users to expand or collapse sections of content,
 * enabling them to view or hide information as needed, thus optimizing space and reducing complexity on the page.
 */
export interface IAutoViewCollapseProps
  extends IAutoViewComponentPropsBase<"Collapse"> {
  /**
   * An array of items to be displayed within the collapse component.
   * Each item must conform to the IItem interface, ensuring a consistent structure across all elements.
   */
  items: IAutoViewCollapseProps.IItem[];

  /**
   * Keys of the items that should be expanded by default when the component is first rendered.
   * If not provided, the first item (key 0) will be expanded by default.
   * @default [0]
   */
  defaultExpandedKeys?: number[];

  /**
   * Keys of the currently expanded items.
   * This prop makes the component controlled, allowing external control over which items are expanded.
   */
  expandedKeys?: number[];

  /**
   * Callback function triggered when the expanded items change.
   * Receives the new array of expanded keys as an argument.
   */
  onChange?: (expandedKeys: number[]) => void;

  /**
   * Enables accordion behavior, allowing only one item to be expanded at a time.
   * When a new item is expanded, the previously expanded item will collapse.
   * @default false
   */
  accordion?: boolean;

  /**
   * Adds a border around each collapse item, distinguishing them from surrounding content.
   * @default true
   */
  bordered?: boolean;

  /**
   * Custom icon to indicate the expand/collapse state of each item.
   * If not provided, a default icon will be used.
   */
  expandIcon?: IAutoViewComponentProps;

  /**
   * Position of the expand/collapse icon relative to the item header.
   * - 'start': Icon appears before the header content.
   * - 'end': Icon appears after the header content.
   * @default 'start'
   */
  expandIconPosition?: IAutoViewCollapseProps.IIconPosition;

  /**
   * Size of the collapse items.
   * - 'large': Larger padding and font size.
   * - 'middle': Medium padding and font size.
   * - 'small': Smaller padding and font size.
   * @default 'middle'
   */
  size?: IAutoViewCollapseProps.ISize;
}

export namespace IAutoViewCollapseProps {
  /**
   * Represents the header of an individual collapse item.
   * Contains the main content and optional extra elements.
   */
  export interface IItemHeader {
    /**
     * Main content of the item header.
     * Typically includes a title or summary of the collapsible content.
     */
    content: IAutoViewNonSurfaceComponentProps;

    /**
     * Additional elements displayed alongside the main header content.
     * Can include actions like edit buttons or status indicators.
     */
    extra?: IAutoViewComponentProps;
  }

  /**
   * Represents an individual item within the collapse component.
   * Each item has a unique key, a header, and content that can be expanded or collapsed.
   */
  export interface IItem {
    /**
     * Unique identifier for the collapse item.
     * Used to manage the expanded/collapsed state of the item.
     */
    key: number;

    /**
     * Header of the collapse item, containing the main title and optional extra elements.
     */
    header: IItemHeader;

    /**
     * Content to be rendered within the collapse item when expanded.
     * Must conform to the IAutoViewNonSurfaceComponentProps interface.
     */
    content: IAutoViewNonSurfaceComponentProps;
  }

  /**
   * Defines the size options for collapse items.
   * - 'large': Larger padding and font size.
   * - 'middle': Medium padding and font size.
   * - 'small': Smaller padding and font size.
   */
  export type ISize = "large" | "middle" | "small";

  /**
   * Defines the position options for the expand/collapse icon.
   * - 'start': Icon appears before the header content.
   * - 'end': Icon appears after the header content.
   */
  export type IIconPosition = "start" | "end";
}
