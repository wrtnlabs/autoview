import { IAutoViewComponentProps } from "../../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../properties/IAutoViewComponentPropsBase";

/**
 * Properties for configuring the StackedList component.
 *
 * The StackedList component presents a collection of vertically arranged items, each following a consistent structure and style. This layout ensures users can process information systematically and easily navigate through the list.
 */
export interface IAutoViewStackedListProps
  extends IAutoViewComponentPropsBase<"StackedList"> {
  /**
   * Array of items to be displayed in the stacked list.
   * Each item should conform to the IAutoViewComponentProps interface, ensuring uniformity across all elements.
   */
  items: IAutoViewComponentProps[];
}
