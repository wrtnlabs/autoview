import { IAutoViewTextProps } from "@autoview/interface";
import { Typography as MuiTypography, TypographyOwnProps } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface TextProps
  extends TransformToComponentProps<IAutoViewTextProps> {}

export const Text = ({ content, lineClamp = null, ...props }: TextProps) => {
  return (
    <MuiTypography
      sx={lineClamp ? lineClampFactory(lineClamp) : {}}
      {...transformTextProps(props)}
    >
      {renderComponent(content)}
    </MuiTypography>
  );
};

export function transformTextProps(
  props: Partial<TextProps>,
): TypographyOwnProps {
  return {
    variant: props.variant,
    color: props.color,
  };
}

function lineClampFactory(line: number = 1) {
  return {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: line, // 표시할 최대 줄 수
    WebkitBoxOrient: "vertical",
  };
}
