import { IAutoViewPresentationComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { Arrayable } from "../utils";

export interface IAutoViewListProps
  extends IAutoViewComponentPropsBase<"List"> {
  childrenProps?: Arrayable<
    IAutoViewListItemProps | IAutoViewListSubheaderProps
  >;
}

export interface IAutoViewListItemProps
  extends IAutoViewComponentPropsBase<"ListItem"> {
  childrenProps?:
    | IAutoViewListItemButtonProps
    | Arrayable<IAutoViewPresentationComponentProps>;
}

export interface IAutoViewListItemButtonProps
  extends IAutoViewComponentPropsBase<"ListItemButton"> {
  childrenProps?:
    | IAutoViewListItemButtonProps
    | Arrayable<IAutoViewPresentationComponentProps>;
}

export interface IAutoViewListItemIconProps
  extends IAutoViewComponentPropsBase<"ListItemIcon"> {}

export interface IAutoViewListItemTextProps
  extends IAutoViewComponentPropsBase<"ListItemText"> {}

export interface IAutoViewListSubheaderProps
  extends IAutoViewComponentPropsBase<"ListSubheader"> {}
