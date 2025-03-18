import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../../src/properties/theme";
import { IAutoViewIconProps } from "./IAutoViewIconProps";
import { IAutoViewImageAvatarProps } from "./IAutoViewImageAvatarProps";
import { IAutoViewLetterAvatarProps } from "./IAutoViewLetterAvatarProps";

export interface IAutoViewBadgeProps
  extends IAutoViewComponentPropsBase<"Badge"> {
  count: number;

  children:
    | IAutoViewImageAvatarProps
    | IAutoViewLetterAvatarProps
    | IAutoViewIconProps;

  color?: IAutoViewColor.IVariant | IAutoViewColor.IScale | IAutoViewColor.IHex;
  maxCount?: number;

  showZero?: boolean;

  dot?: boolean;

  offset?: {
    vertical?: "top" | "bottom";
    horizontal?: "left" | "right";
  };
}

export namespace IAutoViewBadge {
  export type IColors = string;
  export type IStatus = "error" | "info" | "success" | "warning";

  export interface IExtended {
    color: IColors;
    status: IStatus;
    size: string | number;
  }
}
