import { IAutoViewCollapseHeaderProps } from "@autoview/interface";
import { AccordionSummary as BaseCollapseHeader } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface CollapseHeaderProps
  extends TransformToComponentProps<IAutoViewCollapseHeaderProps> {}

export const CollapseHeader = ({
  childrenProps,
  toggleIcon,
}: CollapseHeaderProps) => {
  return (
    <BaseCollapseHeader expandIcon={renderComponent(toggleIcon)}>
      {renderComponent(childrenProps)}
    </BaseCollapseHeader>
  );
};
