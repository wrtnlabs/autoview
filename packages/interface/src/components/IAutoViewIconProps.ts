import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../properties/theme";
import { IAutoViewSize } from "../properties/theme/IAutoViewSize";
import { AutoViewIconName } from "../typings/AutoViewIconName";

export interface IAutoViewIconProps
  extends IAutoViewComponentPropsBase<"Icon"> {
  id: AutoViewIconName;
  color?: IAutoViewColor.IScale;
  size?: IAutoViewSize.IIconSize;
}
