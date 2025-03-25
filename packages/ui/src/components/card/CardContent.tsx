import { IAutoViewCardContentProps } from "@autoview/interface";
import { CardContent as BaseCardContent } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface CardContentProps
  extends TransformToComponentProps<IAutoViewCardContentProps> {}

export const CardContent = ({ childrenProps, ...props }: CardContentProps) => {
  return (
    <BaseCardContent {...props}>
      {renderComponent(childrenProps)}
    </BaseCardContent>
  );
};
