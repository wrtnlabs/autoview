import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../properties/theme";
import { IAutoViewAvatarProps } from "./IAutoViewAvatarProps";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewBadgeProps
  extends IAutoViewComponentPropsBase<"Badge"> {
  count?: number;
  color?: IAutoViewColor.IVariant | IAutoViewColor.IScale;
  childrenProps: IAutoViewAvatarProps | IAutoViewIconProps;
  maxCount?: number;
  showZero?: boolean;
  dot?: boolean;
  offset?: {
    vertical?: "top" | "bottom";
    horizontal?: "left" | "right";
  };
}

export namespace IAutoViewBadgeProps {
  export type IColors = string;
  export type IStatus = "error" | "info" | "success" | "warning";

  export interface IExtended {
    color: IColors;
    status: IStatus;
    size: string | number;
  }
}
