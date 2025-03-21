import { IAutoViewBadgeProps } from "@autoview/interface";
import { Badge as MuiBadge } from "@mui/material";

import { transformBadgeProps } from "./transform";

export const Badge = (props: IAutoViewBadgeProps) => {
  return <MuiBadge {...transformBadgeProps(props)} />;
};
