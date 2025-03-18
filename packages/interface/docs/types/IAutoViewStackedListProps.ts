import { IAutoViewComponentProps } from "../../src/properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";

export interface IAutoViewStackedListProps
  extends IAutoViewComponentPropsBase<"StackedList"> {
  items: IAutoViewStackedListProps.IItem[];
  gap?: number;
}

export namespace IAutoViewStackedListProps {
  export interface IItem {
    children: IAutoViewComponentProps[];
  }
}
