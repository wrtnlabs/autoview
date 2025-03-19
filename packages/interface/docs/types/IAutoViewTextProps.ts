import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";
import {
  IAutoViewColor,
  IAutoViewTypography,
} from "../../src/properties/theme";
import { Arrayable } from "../../src/utils";
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
