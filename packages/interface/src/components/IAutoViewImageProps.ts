import { tags } from "typia";

import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";

export interface IAutoViewImageProps
  extends IAutoViewComponentPropsBase<"Image"> {
  src: string & tags.Format<"uri">;
  alt?: string;
}
