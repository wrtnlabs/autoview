import { styled } from "@mui/material";
import React, { useCallback } from "react";

import { AutoViewCarouselContext } from "./Context";

export const CarouselControls = () => {
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
    <Controls>
      <button type="button" onClick={goToPrev}>
        Prev
      </button>
      <button type="button" onClick={goToNext}>
        Next
      </button>
    </Controls>
  );
};

const Controls = styled("div")`
  display: flex;
  justify-content: space-between;
`;
