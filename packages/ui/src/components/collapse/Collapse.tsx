import { IAutoViewCollapseProps } from "@autoview/interface";
import {
  Accordion as MuiCollapse,
  AccordionDetails as MuiCollapseDetails,
  AccordionSummary as MuiCollapseSummary,
} from "@mui/material";
import React from "react";

import { renderComponent } from "../../renderer";

export const Collapse = (props: IAutoViewCollapseProps) => {
  return (
    <MuiCollapse style={props.style}>
      <MuiCollapseSummary expandIcon={renderComponent(props.expandIcon)}>
        {renderComponent(props.header)}
      </MuiCollapseSummary>
      <MuiCollapseDetails>{renderComponent(props.content)}</MuiCollapseDetails>
    </MuiCollapse>
  );
};
