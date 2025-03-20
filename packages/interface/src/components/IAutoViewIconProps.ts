import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { AutoViewIconName } from "../typings/AutoViewIconName";

export interface IAutoViewIconProps
  extends IAutoViewComponentPropsBase<"Icon"> {
  id: AutoViewIconName;
  // FIXME:
  size?: any;
}
