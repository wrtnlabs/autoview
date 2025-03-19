import { IAutoViewCardProps } from "@autoview/interface";
import { CardProps, Card as MuiCard } from "@mui/material";
import React from "react";

import { renderComponent } from "../../renderer";

export const Card = ({ childComponents, ...props }: IAutoViewCardProps) => {
  return (
    <MuiCard {...transformCardProps(props)} raised>
      {renderComponent(childComponents)}
    </MuiCard>
  );
};

export function transformCardProps(
  props: Partial<IAutoViewCardProps>,
): CardProps {
  return {
    sx: {
      maxWidth: props.maxWidth ?? 400,
      // borderRadius: props.borderRadius ?? 8,
    },
  };
}
