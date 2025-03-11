import { IAutoViewNonSurfaceComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";

/**
 * Properties for configuring the GridList component.
 *
 * The GridList component arranges items of the same type in a grid format, helping users efficiently navigate visually rich content. Each item maintains a consistent size and structure and can include various types of content, such as images, text, and icons.
 */
export interface IAutoViewGridListProps
  extends IAutoViewComponentPropsBase<"GridList"> {
  /**
   * Array of items to be displayed in the grid.
   * Each item must conform to the IItem interface, ensuring a consistent structure across all elements.
   */
  items: IAutoViewGridListProps.IItem[];

  /**
   * Number of columns in the grid, determining how many items are displayed per row.
   * @default 2
   */
  columns?: number;
}

export namespace IAutoViewGridListProps {
  /**
   * Represents an individual item within the GridList.
   * Each item must have a unique key and content adhering to the IAutoViewNonSurfaceComponentProps interface.
   */
  export interface IItem {
    /**
     * Content to be rendered within the grid item.
     * Must conform to the IAutoViewNonSurfaceComponentProps interface.
     */
    children: IAutoViewNonSurfaceComponentProps;
  }
}
