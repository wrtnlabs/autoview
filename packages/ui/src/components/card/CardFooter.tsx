import { IAutoViewCardFooterProps } from "@autoview/interface";
import { CardActions as BaseCardFooter } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface CardFooterProps
  extends TransformToComponentProps<IAutoViewCardFooterProps> {}

export const CardFooter = (
  props: TransformToComponentProps<IAutoViewCardFooterProps>,
) => {
  return (
    <BaseCardFooter>{renderComponent(props.childrenProps)}</BaseCardFooter>
  );
};
