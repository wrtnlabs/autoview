import { IAutoViewTypographyProps } from "@autoview/interface";
import { Typography as MuiTypography } from "@mui/material";
import React from "react";

import { transformTypographyProps } from "./transform";

export const Typography = (props: Omit<IAutoViewTypographyProps, "type">) => {
  return (
    <MuiTypography {...transformTypographyProps(props)}>
      {props.children}
    </MuiTypography>
  );
};
