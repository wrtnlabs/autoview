import { IAutoViewCollapseProps } from "@autoview/interface";
import { Accordion as BaseCollapse } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface CollapseProps
  extends TransformToComponentProps<IAutoViewCollapseProps> {}

export const Collapse = ({ header, content }: CollapseProps) => {
  return (
    <BaseCollapse>
      {renderComponent(header)}
      {renderComponent(content)}
    </BaseCollapse>
  );
};
