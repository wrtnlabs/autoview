import { IAutoViewColor } from "@autoview/interface";
import {
  ChipPropsColorOverrides,
  ChipPropsSizeOverrides,
} from "@mui/material/Chip";
import { OverridableStringUnion } from "@mui/types";

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
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

  interface ChipPropsSizeOverrides {
    large: true;
  }
}
