import { IAutoViewBadgeProps } from "@autoview/interface";
import { Badge as MuiBadge } from "@mui/material";
import React from "react";

import { renderComponent } from "../../renderer";
import { transformBadgeProps } from "./transform";

export const Badge = (props: IAutoViewBadgeProps) => {
  return (
    <MuiBadge {...transformBadgeProps(props)}>
      {renderComponent(props.childComponents)}
    </MuiBadge>
  );
};
