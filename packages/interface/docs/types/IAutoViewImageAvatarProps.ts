import { tags } from "typia";

import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";

export interface IAutoViewImageAvatarProps
  extends IAutoViewComponentPropsBase<"ImageAvatar"> {
  src: string & tags.Format<"uri">;
  name?: string;
  size?: IAutoViewImageAvatarProps.ISize;
}

export namespace IAutoViewImageAvatarProps {
  export type ISize = number;
}
