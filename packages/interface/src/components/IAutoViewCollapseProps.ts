import { IAutoViewNonSurfaceComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { Arrayable } from "../utils";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewCollapseProps
  extends IAutoViewComponentPropsBase<"Collapse"> {
  header: Arrayable<IAutoViewNonSurfaceComponentProps>;
  content: Arrayable<IAutoViewNonSurfaceComponentProps>;

  expandIcon?: IAutoViewIconProps;

  expandIconPosition?: IAutoViewCollapseProps.IIconPosition;

  size?: IAutoViewCollapseProps.ISize;
}

export namespace IAutoViewCollapseProps {
  export interface IHeader {
    // FIXME:
    childrenProps: IAutoViewNonSurfaceComponentProps[];
  }

  export interface IContent {
    // FIXME:
    childrenProps: IAutoViewNonSurfaceComponentProps[];
  }

  export type ISize = "large" | "middle" | "small";

  export type IIconPosition = "start" | "end";
}
