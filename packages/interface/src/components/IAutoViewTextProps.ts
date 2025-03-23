import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor, IAutoViewTypography } from "../properties/theme";
import { Arrayable } from "../utils/Arrayable";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewTextProps
  extends IAutoViewComponentPropsBase<"Text"> {
  variant?: IAutoViewTextProps.IVariant;

  color?: IAutoViewTextProps.IColor;

  lineClamp?: number | null;

  content: Arrayable<string | IAutoViewIconProps>;
}

export namespace IAutoViewTextProps {
  export type IVariant = IAutoViewTypography.IVariant;
  export type IColor =
    | IAutoViewTypography.ITextColor
    | IAutoViewColor.IScale
    | `#${string}`;
}
