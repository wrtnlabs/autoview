import { IAutoViewComponentProps } from "./IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "./IAutoViewComponentPropsBase";

/**
 * Interface representing the properties required for rendering a List component.
 * This interface is designed to render collections of data with similar structures in a list format.
 * Each item within this list is represented uniformly, ensuring a consistent and cohesive display.
 *
 * This interface is particularly effective when handling arrays of data objects that share a common schema or data structure,
 * allowing for a seamless and organized presentation of repeated information.
 *
 * The List component itself serves solely as a container for displaying repeated data and does not convey any semantic meaning about the information it presents.
 * It is responsible for the layout and organization of its child components, each of which should be of the same card type to maintain consistency.
 */

export interface IAutoViewListProps
  extends IAutoViewComponentPropsBase<"List"> {
  /**
   * An array of items to be displayed in the list.
   * Each item should have a similar structure, adhering to same DTO and IAutoViewComponent type.
   */
}

export namespace IAutoViewListProps {
  export interface IItemProps {
    children: Array<Exclude<IAutoViewComponentProps, IAutoViewListProps>>;
  }
}
