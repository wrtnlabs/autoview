import { IAutoViewCardActionsProps } from "@autoview/interface";
import { CardActions as MuiCardActions } from "@mui/material";
import React from "react";

import { renderComponent } from "../../renderer";

export const CardActions = (props: IAutoViewCardActionsProps) => {
  return (
    <MuiCardActions>{renderComponent(props.childComponents)}</MuiCardActions>
  );
};
