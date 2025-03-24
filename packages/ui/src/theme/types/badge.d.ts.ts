import { IAutoViewColor } from "@autoview/interface";
import { BadgePropsColorOverrides } from "@mui/material/Badge";
import { OverridableStringUnion } from "@mui/types";

declare module "@mui/material/Badge" {
  interface BadgePropsColorOverrides {
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
