import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../properties/theme";

export interface IAutoViewButtonProps
  extends IAutoViewComponentPropsBase<"Button"> {
  variant?: IAutoViewColor.IVariant;
  // FIXME: 아이콘 버튼 size와 일치
  size?: string;
}
