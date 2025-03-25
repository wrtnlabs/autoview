import { IAutoViewImageProps } from "@autoview/interface";
import { styled } from "@mui/material";

import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface ImageProps
  extends TransformToComponentProps<IAutoViewImageProps> {}

export const Image = (props: ImageProps) => {
  return <Img src={props.src} alt={props.alt} />;
};

const Img = styled("img")`
  max-width: 100%;
  max-height: 100%;
`;
