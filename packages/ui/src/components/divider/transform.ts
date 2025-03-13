import { IAutoViewDividerProps } from "@autoview/interface";
import { DividerOwnProps } from "@mui/material";

export function transformDividerProps(
  props: IAutoViewDividerProps,
): DividerOwnProps {
  return {
    orientation: props.orientation ?? "horizontal",
  };
}
