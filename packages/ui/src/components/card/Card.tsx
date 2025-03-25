import { IAutoViewCardProps } from "@autoview/interface";
import { Card as BaseCard } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface CardProps
  extends TransformToComponentProps<IAutoViewCardProps> {}

export const Card = ({
  childrenProps,
  orientation = "vertical",
  ...props
}: CardProps) => {
  return (
    <BaseCard sx={orientationStyle[orientation]} raised {...props}>
      {renderComponent(childrenProps)}
    </BaseCard>
  );
};

const orientationStyle = {
  vertical: {
    maxWidth: 320,
    "[class*='CardMedia']": {
      width: "100%",
      minHeight: 200,
    },
  },
  horizontal: {
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
  },
};
