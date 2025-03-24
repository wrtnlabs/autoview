import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../properties/theme";
import { IAutoViewSize } from "../properties/theme/IAutoViewSize";
import { AutoViewIconName } from "../typings/AutoViewIconName";

export interface IAutoViewIconButtonProps
  extends IAutoViewComponentPropsBase<"IconButton"> {
  icon?: AutoViewIconName;
  variant?: IAutoViewIconButtonProps.IVariant;
  color?: IAutoViewColor.IVariant | IAutoViewColor.IScale;
  size?: IAutoViewSize.IBase;
}

export namespace IAutoViewIconButtonProps {
  export type IVariant = "contained" | "outlined";
}
