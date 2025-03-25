import { tags } from "typia";

import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../properties/theme";
import { IAutoViewSize } from "../properties/theme/IAutoViewSize";
import { Arrayable } from "../utils/Arrayable";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewButtonProps
  extends IAutoViewComponentPropsBase<"Button"> {
  variant?: IAutoViewButtonProps.IVariant;
  color?: IAutoViewColor.IVariant | IAutoViewColor.IScale;
  size?: IAutoViewSize.IBase;
  label?: Arrayable<string>;
  startElement?: IAutoViewIconProps;
  endElement?: IAutoViewIconProps;
  href?: string & tags.Format<"uri">;
}

export namespace IAutoViewButtonProps {
  export type IVariant = "text" | "outlined" | "contained";
}
