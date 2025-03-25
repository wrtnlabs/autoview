import { IAutoViewIconProps } from "@autoview/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material";

import { TransformToComponentProps } from "../../utils/TransformToComponentProps";
import { transformIconProps } from "./transform";

export interface IconProps
  extends TransformToComponentProps<IAutoViewIconProps> {}

export const Icon = ({ size, color, ...props }: IconProps) => {
  try {
    return (
      <Box
        sx={{
          width: size ?? "1em",
          height: size ?? "1em",
          color: color ? `${color}.main` : undefined,
        }}
      >
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
  color: props.color ?? "currentcolor",
  verticalAlign: "middle",
  svg: {
    width: "100%",
    height: "100%",
  },
}));
