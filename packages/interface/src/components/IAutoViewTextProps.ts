import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor, IAutoViewTypography } from "../properties/theme";
import { Arrayable } from "../utils";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewTextProps
  extends IAutoViewComponentPropsBase<"Text"> {
  variant?: IAutoViewTextProps.IVariant;

  color?: IAutoViewTextProps.IColor;

  ellipsis?: boolean;

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
