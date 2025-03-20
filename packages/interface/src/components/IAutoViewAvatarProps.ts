import { tags } from "typia";

import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../properties/theme";

export interface IAutoViewAvatarProps
  extends IAutoViewComponentPropsBase<"Avatar"> {
  src?: string & tags.Format<"uri">;
  name?: string;
  variant?:
    | IAutoViewColor.IVariant
    | IAutoViewColor.IScale
    | IAutoViewColor.IHex;
}
