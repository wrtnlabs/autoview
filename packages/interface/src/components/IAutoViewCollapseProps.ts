import { IAutoViewPresentationComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { Arrayable } from "../utils";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewCollapseProps
  extends IAutoViewComponentPropsBase<"Collapse"> {
  header: Arrayable<IAutoViewPresentationComponentProps>;
  content: Arrayable<IAutoViewPresentationComponentProps>;

  expandIcon?: IAutoViewIconProps;
  expandIconPosition?: IAutoViewCollapseProps.IIconPosition;
}

export namespace IAutoViewCollapseProps {
  export interface IHeader {
    // FIXME:
    childrenProps?: IAutoViewPresentationComponentProps[];
  }

  export interface IContent {
    // FIXME:
    childrenProps?: IAutoViewPresentationComponentProps[];
  }

  export type IIconPosition = "start" | "end";
}
