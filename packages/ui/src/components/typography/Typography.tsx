import { IAutoViewTypographyProps } from "@autoview/interface";
import { Typography as MuiTypography } from "@mui/material";
import React from "react";

import { transformTypographyProps } from "./transform";

export const Typography = (props: IAutoViewTypographyProps) => {
  return <MuiTypography {...transformTypographyProps(props)} />;
};
