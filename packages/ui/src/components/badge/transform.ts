import { IAutoViewBadgeProps } from "@autoview/interface";
import { BadgeOwnProps } from "@mui/material";

export function transformBadgeProps(props: IAutoViewBadgeProps): BadgeOwnProps {
  return {
    anchorOrigin: {
      vertical: props.offset?.vertical ?? "top",
      horizontal: props.offset?.horizontal ?? "right",
    },
    badgeContent: props.count,
    color: "primary",
    max: props.maxCount,
    showZero: props.showZero,
    variant: props.dot ? "dot" : "standard",
  };
}
