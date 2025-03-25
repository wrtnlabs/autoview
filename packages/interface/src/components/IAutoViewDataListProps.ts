import { IAutoViewPresentationComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { Arrayable } from "../utils";

export interface IAutoViewDataListProps
  extends IAutoViewComponentPropsBase<"DataList"> {
  childrenProps?: IAutoViewDataListItemProps[];
}

export interface IAutoViewDataListItemProps
  extends IAutoViewComponentPropsBase<"DataListItem"> {
  label?: Arrayable<IAutoViewPresentationComponentProps>;
  value?: Arrayable<IAutoViewPresentationComponentProps>;
}
