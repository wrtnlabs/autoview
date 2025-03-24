import { IAutoViewTooltipProps } from "@autoview/interface";
import { Tooltip as BaseTooltip } from "@mui/material";
import { ReactElement } from "react";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface TooltipProps
  extends TransformToComponentProps<IAutoViewTooltipProps> {}

export const Tooltip = ({ message, childrenProps, ...props }: TooltipProps) => {
  if (childrenProps == null) {
    return null;
  }

  return (
    <BaseTooltip title={message} {...props}>
      {renderComponent(childrenProps) as ReactElement}
    </BaseTooltip>
  );
};
