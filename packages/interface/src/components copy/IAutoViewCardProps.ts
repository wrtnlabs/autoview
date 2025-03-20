import { StandardProperties } from "csstype";
import { Format } from "typia/lib/tags";

import { IAutoViewNonSurfaceComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { Arrayable } from "../utils";
import { IAutoViewIconProps } from "./IAutoViewIconProps";
import { IAutoViewImageAvatarProps } from "./IAutoViewImageAvatarProps";
import { IAutoViewLetterAvatarProps } from "./IAutoViewLetterAvatarProps";
import { IAutoViewStackProps } from "./IAutoViewStackProps";

export interface IAutoViewCardProps
  extends IAutoViewComponentPropsBase<"Card"> {
  maxWidth?: StandardProperties["maxWidth"];
  borderRadius?: StandardProperties["borderRadius"];
  childComponents: Arrayable<
    | IAutoViewCardActionsProps
    | IAutoViewCardContentProps
    | IAutoViewCardHeaderProps
    | IAutoViewCardMediaProps
    | IAutoViewStackProps
  >;
}

export interface IAutoViewCardActionsProps
  extends IAutoViewComponentPropsBase<"CardActions"> {
  childComponents: Arrayable<IAutoViewNonSurfaceComponentProps>;
}

export interface IAutoViewCardContentProps
  extends IAutoViewComponentPropsBase<"CardContent"> {
  childComponents: Arrayable<IAutoViewNonSurfaceComponentProps>;
}

export interface IAutoViewCardHeaderProps
  extends IAutoViewComponentPropsBase<"CardHeader"> {
  action: null;
  startElement?:
    | IAutoViewImageAvatarProps
    | IAutoViewLetterAvatarProps
    | IAutoViewIconProps;
  title?: string;
  description?: string;
  endElement?:
    | IAutoViewImageAvatarProps
    | IAutoViewLetterAvatarProps
    | IAutoViewIconProps;
}

export interface IAutoViewCardMediaProps
  extends IAutoViewComponentPropsBase<"CardMedia"> {
  src: string & Format<"uri">;
  height?: StandardProperties["height"];
}
