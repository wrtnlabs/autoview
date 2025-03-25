import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewButtonProps } from "./IAutoViewButtonProps";
import { IAutoViewIconButtonProps } from "./IAutoViewIconButtonProps";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewTooltipProps
  extends IAutoViewComponentPropsBase<"Tooltip"> {
  message?: string;
  childrenProps?:
    | IAutoViewIconButtonProps
    | IAutoViewButtonProps
    | IAutoViewIconProps;
}
