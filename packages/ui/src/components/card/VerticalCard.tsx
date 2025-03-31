import { IAutoViewVerticalCardProps } from "@autoview/interface";
import { Card as BaseCard } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface VerticalCardProps
  extends TransformToComponentProps<IAutoViewVerticalCardProps> {}

export const VerticalCard = ({
  childrenProps,
  ...props
}: VerticalCardProps) => {
  return (
    <BaseCard sx={baseStyle} raised {...props}>
      {renderComponent(childrenProps)}
    </BaseCard>
  );
};

const baseStyle = {
  maxWidth: 320,
  "[class*='CardMedia']": {
    width: "100%",
    minHeight: 200,
  },
};
