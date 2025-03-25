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

type ChildrenProps<T extends IAutoViewCardProps.IOrientation> =
  T extends "horizontal"
    ? Arrayable<IAutoViewCardMediaProps | IAutoViewCardContentProps>
    : Arrayable<
        | IAutoViewCardHeaderProps
        | IAutoViewCardContentProps
        | IAutoViewCardFooterProps
        | IAutoViewCardMediaProps
      >;

export interface IAutoViewCardProps<
  T extends IAutoViewCardProps.IOrientation = IAutoViewCardProps.IOrientation,
> extends IAutoViewComponentPropsBase<"Card"> {
  orientation?: T;
  childrenProps?: ChildrenProps<T>;
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

export namespace IAutoViewCardProps {
  export type IOrientation = "vertical" | "horizontal";
}

export type IAutoViewCardComponentProps =
  | IAutoViewCardContentProps
  | IAutoViewCardFooterProps
  | IAutoViewCardHeaderProps
  | IAutoViewCardMediaProps
  | IAutoViewCardProps;
