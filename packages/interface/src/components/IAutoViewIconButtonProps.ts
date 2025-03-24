import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../properties/theme";
import { IAutoViewSize } from "../properties/theme/IAutoViewSize";
import { AutoViewIconName } from "../typings/AutoViewIconName";
import { IAutoViewTooltipProps } from "./IAutoViewTooltipProps";

export interface IAutoViewIconButtonProps
  extends IAutoViewComponentPropsBase<"IconButton"> {
  icon?: AutoViewIconName;
  variant?: IAutoViewColor.IVariant | IAutoViewColor.IScale;
  size?: IAutoViewSize.IBase;
  tooltip?: IAutoViewTooltipProps;
}
