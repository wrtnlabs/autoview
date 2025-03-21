import { IAutoViewDividerProps } from "@autoview/interface";
import { DividerOwnProps, Divider as MuiDivider } from "@mui/material";

import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface DividerProps
  extends TransformToComponentProps<IAutoViewDividerProps> {}

export const Divider = (props: DividerProps) => {
  return <MuiDivider {...transformDividerProps(props)} />;
};

export function transformDividerProps(props: DividerProps): DividerOwnProps {
  return {
    orientation: props.orientation ?? "horizontal",
  };
}
