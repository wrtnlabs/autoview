import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../properties/theme";

export interface IAutoViewIconButtonProps
  extends IAutoViewComponentPropsBase<"IconButton"> {
  // FIXME: 버튼 variant와 일치
  variant?: IAutoViewColor.IVariant;
  // FIXME: 버튼 size와 일치
  size?: string;
  // FIXME:
  tooltip?: any;
}
