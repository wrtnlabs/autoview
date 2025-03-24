import { tags } from "typia";

import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../properties/theme";
import { IAutoViewSize } from "../properties/theme/IAutoViewSize";

export interface IAutoViewAvatarProps
  extends IAutoViewComponentPropsBase<"Avatar"> {
  src?: string & tags.Format<"uri">;
  name?: string;
  variant?: IAutoViewColor.IVariant | IAutoViewColor.IScale;
  size?: IAutoViewSize.IIconSize;
}

export interface IAutoViewAvatarGroupProps
  extends IAutoViewComponentPropsBase<"AvatarGroup"> {
  childrenProps?: IAutoViewAvatarProps[];
  maxItems?: number;
  totalItems?: number;
}
