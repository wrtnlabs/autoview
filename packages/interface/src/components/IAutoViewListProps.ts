import { tags } from "typia";

import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { Arrayable } from "../utils";
import { IAutoViewAvatarProps } from "./IAutoViewAvatarProps";
import { IAutoViewBadgeProps } from "./IAutoViewBadgeProps";
import { IAutoViewButtonProps } from "./IAutoViewButtonProps";
import { IAutoViewChipProps } from "./IAutoViewChipProps";
import { IAutoViewIconButtonProps } from "./IAutoViewIconButtonProps";
import { IAutoViewIconProps } from "./IAutoViewIconProps";
import { IAutoViewImageProps } from "./IAutoViewImageProps";
import { IAutoViewTextProps } from "./IAutoViewTextProps";

export interface IAutoViewListProps
  extends IAutoViewComponentPropsBase<"List"> {
  childrenProps?: Arrayable<
    IAutoViewListItemProps | IAutoViewListSubheaderProps
  >;
}

export type IAutoViewListItemProps =
  | ({
      title?: string;
      description?: string;
      startElement?:
        | IAutoViewAvatarProps
        | IAutoViewBadgeProps
        | IAutoViewChipProps
        | IAutoViewIconButtonProps
        | IAutoViewIconProps
        | IAutoViewImageProps
        | IAutoViewTextProps;
      endElement?:
        | IAutoViewAvatarProps
        | IAutoViewBadgeProps
        | IAutoViewButtonProps
        | IAutoViewChipProps
        | IAutoViewIconButtonProps
        | IAutoViewIconProps
        | IAutoViewImageProps
        | IAutoViewTextProps;
    } & IAutoViewComponentPropsBase<"ListItem">)
  | ({
      childrenProps?: IAutoViewListItemButtonProps;
    } & IAutoViewComponentPropsBase<"ListItem">);

export interface IAutoViewListItemButtonProps
  extends IAutoViewComponentPropsBase<"ListItemButton"> {
  title?: string;
  description?: string;
  startElement?:
    | IAutoViewAvatarProps
    | IAutoViewBadgeProps
    | IAutoViewChipProps
    | IAutoViewIconButtonProps
    | IAutoViewIconProps
    | IAutoViewImageProps
    | IAutoViewTextProps;
  endElement?:
    | IAutoViewAvatarProps
    | IAutoViewBadgeProps
    | IAutoViewButtonProps
    | IAutoViewChipProps
    | IAutoViewIconButtonProps
    | IAutoViewIconProps
    | IAutoViewImageProps
    | IAutoViewTextProps;
  href?: string & tags.Format<"uri">;
}

export interface IAutoViewListSubheaderProps
  extends IAutoViewComponentPropsBase<"ListSubheader"> {
  stickToTop?: boolean;
  childrenProps?: IAutoViewTextProps;
}
