import { IAutoViewCollapseProps } from "@autoview/interface";
import {
  Accordion as MuiCollapse,
  AccordionDetails as MuiCollapseDetails,
  AccordionSummary as MuiCollapseSummary,
} from "@mui/material";

import { renderComponent } from "../../renderer";

export const Collapse = ({
  header,
  content,
  expandIcon,
}: IAutoViewCollapseProps) => {
  return (
    <MuiCollapse>
      <MuiCollapseSummary expandIcon={renderComponent(expandIcon)}>
        {renderComponent(header)}
      </MuiCollapseSummary>
      <MuiCollapseDetails>{renderComponent(content)}</MuiCollapseDetails>
    </MuiCollapse>
  );
};
