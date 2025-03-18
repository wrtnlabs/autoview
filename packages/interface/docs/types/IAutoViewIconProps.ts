import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";
import { AutoViewIconName } from "../../src/typings/AutoViewIconName";

export interface IAutoViewIconProps
  extends IAutoViewComponentPropsBase<"Icon"> {
  id: AutoViewIconName;
}
