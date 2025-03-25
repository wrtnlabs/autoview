import { IAutoViewTextProps } from "@autoview/interface";
import {
  TypographyProps as BaseProps,
  Typography as BaseText,
} from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface TextProps
  extends TransformToComponentProps<IAutoViewTextProps> {}

export const Text = ({ content, lineClamp, ...props }: TextProps) => {
  return (
    <BaseText
      sx={lineClamp ? lineClampFactory(lineClamp) : {}}
      {...transformTextProps(props)}
    >
      {renderComponent(content)}
    </BaseText>
  );
};

export function transformTextProps(
  props: Omit<TextProps, "content">,
): BaseProps {
  return {
    variant: props.variant,
    color: props.color,
  };
}

function lineClampFactory(line: number) {
  return {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: line,
    WebkitBoxOrient: "vertical",
  };
}
