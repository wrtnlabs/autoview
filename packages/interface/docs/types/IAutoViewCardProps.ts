import { StandardProperties } from "csstype";
import { Format } from "typia/lib/tags";

import {
  IAutoViewComponentPropsBase,
  IAutoViewNonSurfaceComponentProps,
} from "../../src";
import { Arrayable } from "../../src/utils";
import { IAutoViewIconProps } from "./IAutoViewIconProps";
import { IAutoViewImageAvatarProps } from "./IAutoViewImageAvatarProps";
import { IAutoViewLetterAvatarProps } from "./IAutoViewLetterAvatarProps";

export interface IAutoViewCardProps
  extends IAutoViewComponentPropsBase<"Card"> {
  maxWidth?: StandardProperties["maxWidth"];
  borderRadius?: StandardProperties["borderRadius"];
  childComponents: Arrayable<
    | IAutoViewCardActionsProps
    | IAutoViewCardContentProps
    | IAutoViewCardHeaderProps
    | IAutoViewCardMediaProps
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
