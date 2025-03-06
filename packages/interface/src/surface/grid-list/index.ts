import { IAutoViewNonSurfaceComponentProps } from "../../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../properties/IAutoViewComponentPropsBase";

export interface IAutoViewGridListProps
  extends IAutoViewComponentPropsBase<"GridList"> {
  items: IAutoViewGridListProps.IItem[];
}

export namespace IAutoViewGridListProps {
  export interface IItem {
    key: number;
    children: IAutoViewNonSurfaceComponentProps;
  }
}
