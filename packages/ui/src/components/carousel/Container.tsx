import { Box, Stack } from "@mui/material";
import { type PropsWithChildren } from "react";

import { AutoViewCarouselContext } from "./CarouselContext";

export const CarouselContainer = ({ children }: PropsWithChildren<{}>) => {
  const { carouselRef } =
    AutoViewCarouselContext.useAutoViewCarouselContextContext();

  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="5px"
      ref={carouselRef}
    >
      <Stack flexDirection="row" alignItems="stretch">
        {children}
      </Stack>
    </Box>
  );
};
