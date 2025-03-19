import { IAutoViewTextProps } from "@autoview/interface";
import { Typography as MuiTypography, TypographyOwnProps } from "@mui/material";
import React from "react";

import { renderComponent } from "../../renderer";

export const Text = ({
  content,
  ...props
}: Omit<IAutoViewTextProps, "type">) => {
  return (
    <MuiTypography {...transformTextProps(props)}>
      {renderComponent(content)}
    </MuiTypography>
  );
};

export function transformTextProps(
  props: Partial<IAutoViewTextProps>,
): TypographyOwnProps {
  return {
    variant: props.variant as any,
    color: props.color,
  };
}
