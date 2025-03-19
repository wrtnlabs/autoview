import { IAutoViewCardMediaProps } from "@autoview/interface";
import { CardMediaProps, CardMedia as MuiCardMedia } from "@mui/material";
import React from "react";

export const CardMedia = (props: IAutoViewCardMediaProps) => {
  return <MuiCardMedia {...transformCardMediaProps(props)} />;
};

export function transformCardMediaProps(
  props: IAutoViewCardMediaProps,
): CardMediaProps {
  return {
    src: props.src,
    image: props.src,
    sx: props.style,
  };
}
