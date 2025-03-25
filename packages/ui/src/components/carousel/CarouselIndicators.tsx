import { Box, Stack } from "@mui/material";

import { AutoViewCarouselContext } from "./CarouselContext";

export interface CarouselIndicators {
  length: number;
}

export const CarouselIndicators = ({ length }: CarouselIndicators) => {
  const { carouselApi, selectedIndex, setSelectedIndex } =
    AutoViewCarouselContext.useAutoViewCarouselContextContext();

  return (
    <Stack
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap="8px"
      paddingTop="10px"
    >
      {Array(length)
        .fill(1)
        .map((_, index) => (
          <Box
            key={`dot.${index}`}
            onClick={() => {
              setSelectedIndex(index);
              carouselApi?.scrollTo(index);
            }}
            width="8px"
            height="8px"
            borderRadius="100%"
            sx={{
              backgroundColor:
                index === selectedIndex ? "darkGray.main" : "gray.main",
            }}
          />
        ))}
    </Stack>
  );
};
