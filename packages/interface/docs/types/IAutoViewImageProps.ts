import { tags } from "typia";

import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";

export interface IAutoViewImageProps
  extends IAutoViewComponentPropsBase<"Image"> {
  src: string & tags.Format<"uri">;
  alt?: string;
}
