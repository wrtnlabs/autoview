import { IAutoViewCardMediaProps } from "@autoview/interface";
import {
  CardMedia as BaseCardMedia,
  CardMediaProps as BaseProps,
} from "@mui/material";

import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface CardMediaProps
  extends TransformToComponentProps<IAutoViewCardMediaProps> {}

export const CardMedia = (props: CardMediaProps) => {
  return <BaseCardMedia {...transformCardMediaProps(props)} />;
};

export function transformCardMediaProps(
  props: TransformToComponentProps<IAutoViewCardMediaProps>,
): BaseProps {
  return {
    image: props.src,
  };
}
