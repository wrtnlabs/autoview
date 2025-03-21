import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../properties/theme";
import { IAutoViewAvatarProps } from "./IAutoViewAvatarProps";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewChipProps
  extends IAutoViewComponentPropsBase<"Chip"> {
  label: string;

  startElement?: IAutoViewAvatarProps | IAutoViewIconProps;

  endElement?: IAutoViewAvatarProps | IAutoViewIconProps;

  color?: IAutoViewColor.IVariant | IAutoViewColor.IScale | IAutoViewColor.IHex;
}

export namespace IAutoViewChipProps {
  export type IColors = string;
  export type IStatus = "error" | "info" | "success" | "warning";

  export interface IExtended {
    color: IColors;
    status: IStatus;
    size: string | number;
  }
}
