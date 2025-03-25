import { IAutoViewPresentationComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { Arrayable } from "../utils";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewCollapseProps
  extends IAutoViewComponentPropsBase<"Collapse"> {
  header: IAutoViewCollapseHeaderProps;
  content: IAutoViewCollapseContentProps;
}

export interface IAutoViewCollapseHeaderProps
  extends IAutoViewComponentPropsBase<"CollapseHeader"> {
  toggleIcon?: IAutoViewIconProps;
  childrenProps?: Arrayable<IAutoViewPresentationComponentProps>;
}

export interface IAutoViewCollapseContentProps
  extends IAutoViewComponentPropsBase<"CollapseContent"> {
  childrenProps?: Arrayable<IAutoViewPresentationComponentProps>;
}

export type IAutoViewCollapseComponentProps =
  | IAutoViewCollapseProps
  | IAutoViewCollapseHeaderProps
  | IAutoViewCollapseContentProps;
