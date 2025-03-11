import { IAutoViewCollapseProps } from "@autoview/interface";
import {
  Accordion as MuiCollapse,
  AccordionDetails as MuiCollapseDetails,
  AccordionSummary as MuiCollapseSummary,
} from "@mui/material";
import React from "react";

export const Collapse = (props: IAutoViewCollapseProps.IItem) => {
  return (
    <MuiCollapse>
      <MuiCollapseSummary>
        {JSON.stringify(props.header.content)}
      </MuiCollapseSummary>
      <MuiCollapseDetails>{JSON.stringify(props.content)}</MuiCollapseDetails>
    </MuiCollapse>
  );
};
