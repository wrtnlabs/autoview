import { IAutoViewCardContentProps } from "@autoview/interface";
import { CardContent as MuiCardContent } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface CardContentProps
  extends TransformToComponentProps<IAutoViewCardContentProps> {}

export const CardContent = (props: CardContentProps) => {
  return (
    <MuiCardContent>{renderComponent(props.childrenProps)}</MuiCardContent>
  );
};
