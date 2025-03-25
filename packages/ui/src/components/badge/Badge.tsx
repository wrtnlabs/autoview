import { IAutoViewBadgeProps } from "@autoview/interface";
import { Badge as BaseBadge, BadgeProps as BaseProps } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface BadgeProps
  extends TransformToComponentProps<IAutoViewBadgeProps> {}

export const Badge = (props: BadgeProps) => {
  return (
    <BaseBadge {...transformBadgeProps(props)}>
      {renderComponent(props.childrenProps)}
    </BaseBadge>
  );
};

export function transformBadgeProps(
  props: TransformToComponentProps<IAutoViewBadgeProps>,
): BaseProps {
  return {
    anchorOrigin: {
      vertical: props.offset?.vertical ?? "top",
      horizontal: props.offset?.horizontal ?? "right",
    },
    badgeContent: props.count,
    color: props.color ?? "green",
    max: props.maxCount,
    showZero: props.showZero,
    variant: props.dot ? "dot" : "standard",
  };
}
