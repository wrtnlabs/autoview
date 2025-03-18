import { IAutoViewNonSurfaceComponentProps } from "../../src/properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewCollapseProps
  extends IAutoViewComponentPropsBase<"Collapse"> {
  header: IAutoViewCollapseProps.IHeader;
  content: IAutoViewCollapseProps.IContent;
  bordered?: boolean;
  expandIcon?: IAutoViewIconProps;
  collapseIcon?: IAutoViewIconProps;
  expandIconPosition?: IAutoViewCollapseProps.IIconPosition;
  size?: IAutoViewCollapseProps.ISize;
}

export namespace IAutoViewCollapseProps {
  export interface IHeader {
    children: IAutoViewNonSurfaceComponentProps[];
  }

  export interface IContent {
    children: IAutoViewNonSurfaceComponentProps[];
  }

  export type ISize = "large" | "middle" | "small";
  export type IIconPosition = "start" | "end";
}
