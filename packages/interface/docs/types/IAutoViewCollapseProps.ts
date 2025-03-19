import { IAutoViewNonSurfaceComponentProps } from "../../src/properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";
import { Arrayable } from "../../src/utils";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewCollapseProps
  extends IAutoViewComponentPropsBase<"Collapse"> {
  header: Arrayable<IAutoViewNonSurfaceComponentProps>;
  content: Arrayable<IAutoViewNonSurfaceComponentProps>;
  bordered?: boolean;
  expandIcon?: IAutoViewIconProps;
  collapseIcon?: IAutoViewIconProps;
  expandIconPosition?: IAutoViewCollapseProps.IIconPosition;
  size?: IAutoViewCollapseProps.ISize;
}

export namespace IAutoViewCollapseProps {
  export type ISize = "large" | "middle" | "small";
  export type IIconPosition = "start" | "end";
}
