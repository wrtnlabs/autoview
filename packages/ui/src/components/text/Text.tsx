import { IAutoViewTextProps } from "@autoview/interface";
import { Typography as MuiTypography } from "@mui/material";
import React from "react";

import { renderComponent } from "../../renderer";
import { transformTextProps } from "./transform";

export const Text = (props: Omit<IAutoViewTextProps, "type">) => {
  return (
    <MuiTypography {...transformTextProps(props)}>
      {renderComponent(props.children)}
    </MuiTypography>
  );
};
