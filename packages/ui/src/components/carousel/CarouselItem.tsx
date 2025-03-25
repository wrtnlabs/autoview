import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export interface CarouselItemProps
  extends PropsWithChildren<{
    gutter?: number;
  }> {}

export const CarouselItem = ({
  children,
  gutter,
  ...props
}: CarouselItemProps) => {
  return (
    <Box sx={baseStyle} mx={`${gutter}px`} {...props}>
      {children}
    </Box>
  );
};

const baseStyle = {
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: "100%",
  minWidth: 0,
};
