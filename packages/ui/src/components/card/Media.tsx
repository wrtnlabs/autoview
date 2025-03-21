import { IAutoViewCardMediaProps } from "@autoview/interface";
import {
  CardMediaProps as BaseProps,
  CardMedia as MuiCardMedia,
} from "@mui/material";

import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface CardMediaProps
  extends TransformToComponentProps<IAutoViewCardMediaProps> {}

export const CardMedia = (props: CardMediaProps) => {
  return <MuiCardMedia {...transformCardMediaProps(props)} />;
};

export function transformCardMediaProps(
  props: TransformToComponentProps<IAutoViewCardMediaProps>,
): BaseProps {
  return {
    src: props.src,
    image: props.src,
  };
}
