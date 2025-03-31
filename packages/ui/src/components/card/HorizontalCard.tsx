import { IAutoViewHorizontalCardProps } from "@autoview/interface";
import { Card as BaseCard } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface HorizontalCardProps
  extends TransformToComponentProps<IAutoViewHorizontalCardProps> {}

export const HorizontalCard = ({
  childrenProps,
  ...props
}: HorizontalCardProps) => {
  return (
    <BaseCard sx={baseStyle} raised {...props}>
      {renderComponent(childrenProps)}
    </BaseCard>
  );
};

const baseStyle = {
  display: "flex",
  maxWidth: 560,
  "[class*='CardMedia']": {
    flexShrink: 0,
    width: 200,
    alignSelf: "stretch",
  },
  "[class*='CardContent']": {
    flexGrow: 1,
  },
  "[class*='CardContent']:last-child": {
    paddingBottom: 4,
  },
};
