import { IAutoViewColor } from "@autoview/interface";
import { IconButtonPropsColorOverrides } from "@mui/material/IconButton";
import { OverridableStringUnion } from "@mui/types";

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    red: true;
    orange: true;
    yellow: true;
    lime: true;
    green: true;
    teal: true;
    cyan: true;
    blue: true;
    indigo: true;
    violet: true;
    pink: true;
    gray: true;
    darkGray: true;
  }
}
