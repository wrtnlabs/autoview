import { Format } from "typia/lib/tags";

import { IAutoViewPresentationComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { Arrayable } from "../utils/Arrayable";
import { IAutoViewAvatarProps } from "./IAutoViewAvatarProps";
import { IAutoViewBadgeProps } from "./IAutoViewBadgeProps";
import { IAutoViewChipProps } from "./IAutoViewChipProps";
import { IAutoViewIconButtonProps } from "./IAutoViewIconButtonProps";
import { IAutoViewIconProps } from "./IAutoViewIconProps";
import { IAutoViewTextProps } from "./IAutoViewTextProps";

export interface IAutoViewHorizontalCardProps
  extends IAutoViewComponentPropsBase<"HorizontalCard"> {
  childrenProps?: Arrayable<
    IAutoViewCardMediaProps | IAutoViewCardContentProps
  >;
}

export interface IAutoViewVerticalCardProps
  extends IAutoViewComponentPropsBase<"VerticalCard"> {
  childrenProps?: Arrayable<
    | IAutoViewCardHeaderProps
    | IAutoViewCardContentProps
    | IAutoViewCardFooterProps
    | IAutoViewCardMediaProps
  >;
}

export interface IAutoViewCardHeaderProps
  extends IAutoViewComponentPropsBase<"CardHeader"> {
  title?: string;
  description?: string;
  startElement?:
    | IAutoViewAvatarProps
    | IAutoViewIconProps
    | IAutoViewChipProps
    | IAutoViewBadgeProps
    | IAutoViewIconButtonProps
    | IAutoViewTextProps;
  endElement?:
    | IAutoViewAvatarProps
    | IAutoViewIconProps
    | IAutoViewChipProps
    | IAutoViewBadgeProps
    | IAutoViewIconButtonProps
    | IAutoViewTextProps;
}

export interface IAutoViewCardContentProps
  extends IAutoViewComponentPropsBase<"CardContent"> {
  childrenProps?: Arrayable<IAutoViewPresentationComponentProps>;
}

// FIXME:
export interface IAutoViewCardMediaProps
  extends IAutoViewComponentPropsBase<"CardMedia"> {
  src?: string & Format<"uri">;
}

// FIXME:
export interface IAutoViewCardFooterProps
  extends IAutoViewComponentPropsBase<"CardFooter"> {
  childrenProps?: Arrayable<IAutoViewPresentationComponentProps>;
}

export type IAutoViewCardComponentProps =
  | IAutoViewCardContentProps
  | IAutoViewCardFooterProps
  | IAutoViewCardHeaderProps
  | IAutoViewCardMediaProps
  | IAutoViewVerticalCardProps
  | IAutoViewHorizontalCardProps;
