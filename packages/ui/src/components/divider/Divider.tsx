import { IAutoViewDividerProps } from "@autoview/interface";
import { Divider as MuiDivider } from "@mui/material";

import { transformDividerProps } from "./transform";

export const Divider = (props: IAutoViewDividerProps) => {
  return <MuiDivider {...transformDividerProps(props)} />;
};
