import { IAutoViewCollapseProps } from "@autoview/interface";
import {
  Accordion as MuiCollapse,
  AccordionDetails as MuiCollapseDetails,
  AccordionSummary as MuiCollapseSummary,
} from "@mui/material";

import { renderComponent } from "../../renderer";

export const Collapse = (props: IAutoViewCollapseProps) => {
  return (
    <MuiCollapse>
      <MuiCollapseSummary>
        {renderComponent(props.header.children)}
      </MuiCollapseSummary>
      <MuiCollapseDetails>
        {renderComponent(props.content.children)}
      </MuiCollapseDetails>
    </MuiCollapse>
  );
};
