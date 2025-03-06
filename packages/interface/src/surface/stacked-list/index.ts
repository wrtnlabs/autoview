import { IAutoViewComponentProps } from "../../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../properties/IAutoViewComponentPropsBase";

export interface IAutoViewStackedListProps
  extends IAutoViewComponentPropsBase<"StackedList"> {
  items: Array<IAutoViewComponentProps>;
}
