import { IAutoViewTypographyProps } from "@autoview/interface";
import { TypographyOwnProps } from "@mui/material";

export function transformTypographyProps(
  props: IAutoViewTypographyProps,
): TypographyOwnProps {
  return {
    variant: props.variant,
    color: props.color,
  };
}
