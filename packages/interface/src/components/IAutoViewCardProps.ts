import { Format } from "typia/lib/tags";

import { IAutoViewNonSurfaceComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { Arrayable } from "../utils";
import { IAutoViewAvatarProps } from "./IAutoViewAvatarProps";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewCardProps
  extends IAutoViewComponentPropsBase<"Card"> {
  childrenProps: Arrayable<
    | IAutoViewCardHeaderProps
    | IAutoViewCardContentProps
    | IAutoViewCardFooterProps
    | IAutoViewCardMediaProps
  >;
}

// FIXME:
export interface IAutoViewCardHeaderProps
  extends IAutoViewComponentPropsBase<"CardFooter"> {
  title?: string;
  description?: string;
  startElement?: IAutoViewAvatarProps | IAutoViewIconProps;
  endElement?: IAutoViewAvatarProps | IAutoViewIconProps;
}

export interface IAutoViewCardContentProps
  extends IAutoViewComponentPropsBase<"CardContent"> {
  childrenProps: Arrayable<IAutoViewNonSurfaceComponentProps>;
}

// FIXME:
export interface IAutoViewCardMediaProps
  extends IAutoViewComponentPropsBase<"CardMedia"> {
  src: string & Format<"uri">;
}

// FIXME:
export interface IAutoViewCardFooterProps
  extends IAutoViewComponentPropsBase<"CardHeader"> {
  childrenProps: Arrayable<IAutoViewNonSurfaceComponentProps>;
}
