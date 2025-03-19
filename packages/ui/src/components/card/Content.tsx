import { IAutoViewCardContentProps } from "@autoview/interface";
import { CardContent as MuiCardContent } from "@mui/material";
import React from "react";

import { renderComponent } from "../../renderer";

export const CardContent = (props: IAutoViewCardContentProps) => {
  return (
    <MuiCardContent>{renderComponent(props.childComponents)}</MuiCardContent>
  );
};
