import { IAutoViewIconProps } from "@autoview/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material";

import { TransformToComponentProps } from "../../utils/TransformToComponentProps";
import { transformIconProps } from "./transform";

export interface IconProps
  extends TransformToComponentProps<IAutoViewIconProps> {}

export const Icon = (props: IconProps) => {
  try {
    return (
      <Box style={props.style}>
        <FontAwesomeIcon icon={transformIconProps(props)} />
      </Box>
    );
  } catch {
    return null;
  }
};

const Box = styled("div")((props) => ({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: "0",
  color: "currentcolor",
  verticalAlign: "middle",
  width: props.style?.width ?? "1em",
  height: props.style?.height ?? "1em",
  ...props.style,
  svg: {
    width: "100%",
    height: "100%",
  },
}));
