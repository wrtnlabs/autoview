import { IAutoViewNonSurfaceComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { Arrayable } from "../utils";

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
   * A row gap space between children.
   * @default 8
   */
  rowGap?: number;

  /**
   * A column gap space between children.
   * @default 8
   */
  columnGap?: number;
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
    childComponents: Arrayable<IAutoViewNonSurfaceComponentProps>;

    /**
     * Size of the column in different screen sizes
     * @default 12
     */
    column?: IColumn | IResponsive;

    /**
     * Size of the column
     * @default 0
     */
    offset?: IColumn | IResponsive;
  }

  export type IColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  export type IBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";

  export interface IResponsive extends Record<IBreakpoint, IColumn> {}
}
