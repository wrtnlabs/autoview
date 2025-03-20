import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";

export interface IAutoViewTooltipProps
  extends IAutoViewComponentPropsBase<"Tooltip"> {
  message?: string;
}
