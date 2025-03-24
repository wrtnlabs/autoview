import { IAutoViewColor } from "@autoview/interface";
import { ButtonPropsColorOverrides } from "@mui/material/Button";
import { OverridableStringUnion } from "@mui/types";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
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
