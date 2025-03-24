import { IAutoViewCarouselItemProps } from "@autoview/interface";
import { Box } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface CarouselItemProps
  extends TransformToComponentProps<IAutoViewCarouselItemProps> {
  gutter?: number;
}

export const CarouselItem = ({
  childrenProps,
  gutter,
  ...props
}: CarouselItemProps) => {
  return (
    <Box sx={baseStyle} mx={`${gutter}px`} {...props}>
      {renderComponent(childrenProps)}
    </Box>
  );
};

const baseStyle = {
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: "100%",
  minWidth: 0,
};
