import { IAutoViewBadgeProps } from "@autoview/interface";
import { BadgeOwnProps, Badge as MuiBadge } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export const Badge = (
  props: TransformToComponentProps<IAutoViewBadgeProps>,
) => {
  return (
    <MuiBadge {...transformBadgeProps(props)}>
      {renderComponent(props.childrenProps)}
    </MuiBadge>
  );
};

export function transformBadgeProps(
  props: TransformToComponentProps<IAutoViewBadgeProps>,
): BadgeOwnProps {
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
