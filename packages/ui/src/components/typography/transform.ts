import { IAutoViewTypographyProps } from "@autoview/interface";
import { TypographyOwnProps } from "@mui/material";

export function transformTypographyProps(
  props: Omit<IAutoViewTypographyProps, "type">,
): TypographyOwnProps {
  return {
    variant: props.variant,
    color: props.color,
  };
}
