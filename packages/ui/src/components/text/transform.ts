import { IAutoViewTextProps } from "@autoview/interface";
import { TypographyOwnProps } from "@mui/material";

export function transformTextProps(
  props: Omit<IAutoViewTextProps, "type">,
): TypographyOwnProps {
  return {
    variant: props.variant as any,
    color: props.color,
  };
}
