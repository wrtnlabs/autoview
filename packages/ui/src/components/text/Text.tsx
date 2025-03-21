import { IAutoViewTextProps } from "@autoview/interface";
import { Typography as MuiTypography, TypographyOwnProps } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface TextProps
  extends TransformToComponentProps<IAutoViewTextProps> {}

export const Text = ({ content, ...props }: TextProps) => {
  return (
    <MuiTypography {...transformTextProps(props)}>
      {renderComponent(content)}
    </MuiTypography>
  );
};

export function transformTextProps(
  props: Partial<TextProps>,
): TypographyOwnProps {
  return {
    variant: props.variant as any,
    color: props.color,
  };
}
