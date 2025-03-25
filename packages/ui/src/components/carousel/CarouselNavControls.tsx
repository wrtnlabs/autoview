import { IconButton, Stack } from "@mui/material";
import { useCallback } from "react";

import { Icon } from "../icon";
import { AutoViewCarouselContext } from "./CarouselContext";

export const CarouselNavControls = () => {
  const { carouselApi, setSelectedIndex } =
    AutoViewCarouselContext.useAutoViewCarouselContextContext();

  const goToPrev = useCallback(() => {
    if (!carouselApi) return;
    carouselApi.scrollPrev();
    setSelectedIndex((prev) => (prev - 1 < 0 ? 2 : prev - 1));
  }, [carouselApi]);

  const goToNext = useCallback(() => {
    if (!carouselApi) return;
    carouselApi.scrollNext();
    setSelectedIndex((prev) => (prev + 1 > 2 ? 0 : prev + 1));
  }, [carouselApi]);

  return (
    <Stack flexDirection="row" sx={baseStyle} justifyContent="space-between">
      <IconButton size="small" onClick={goToPrev}>
        <Icon type="Icon" id="chevron-left" size={16} />
      </IconButton>
      <IconButton size="small" onClick={goToNext}>
        <Icon type="Icon" id="chevron-right" size={16} />
      </IconButton>
    </Stack>
  );
};

const baseStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: `calc(100% + ${28 * 2 + 8 * 2}px)`,
  transform: "translate(-50%, -50%)",
};
