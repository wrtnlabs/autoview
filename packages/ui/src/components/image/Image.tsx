import { IAutoViewImageProps } from "@autoview/interface";
import { styled } from "@mui/material";

export const Image = (props: IAutoViewImageProps) => {
  return <Img src={props.src} alt={props.alt} />;
};

const Img = styled("img")``;
