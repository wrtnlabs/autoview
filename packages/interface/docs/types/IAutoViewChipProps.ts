import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../../src/properties/theme";
import { IAutoViewIconProps } from "./IAutoViewIconProps";
import { IAutoViewImageAvatarProps } from "./IAutoViewImageAvatarProps";
import { IAutoViewLetterAvatarProps } from "./IAutoViewLetterAvatarProps";

export interface IAutoViewChipProps
  extends IAutoViewComponentPropsBase<"Chip"> {
  label: string;
  startElement?:
    | IAutoViewImageAvatarProps
    | IAutoViewLetterAvatarProps
    | IAutoViewIconProps;
  endElement?:
    | IAutoViewImageAvatarProps
    | IAutoViewLetterAvatarProps
    | IAutoViewIconProps;
  color?: IAutoViewColor.IVariant | IAutoViewColor.IScale | IAutoViewColor.IHex;
}

export namespace IAutoViewChip {
  export type IColors = string;
  export type IStatus = "error" | "info" | "success" | "warning";

  export interface IExtended {
    color: IColors;
    status: IStatus;
    size: string | number;
  }
}
