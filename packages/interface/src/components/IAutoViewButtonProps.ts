import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../properties/theme";
import { Arrayable } from "../utils/Arrayable";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewButtonProps
  extends IAutoViewComponentPropsBase<"Button"> {
  variant?: IAutoViewColor.IVariant;
  size?: string;
  label?: Arrayable<string>;
  startElement?: IAutoViewIconProps;
  endElement?: IAutoViewIconProps;
}
