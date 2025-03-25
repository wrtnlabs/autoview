import { IAutoViewCollapseContentProps } from "@autoview/interface";
import { AccordionDetails as BaseCollapseContent } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface CollapseContentProps
  extends TransformToComponentProps<IAutoViewCollapseContentProps> {}

export const CollapseContent = ({ childrenProps }: CollapseContentProps) => {
  return (
    <BaseCollapseContent>{renderComponent(childrenProps)}</BaseCollapseContent>
  );
};
