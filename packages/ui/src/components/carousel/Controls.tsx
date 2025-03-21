import { styled } from "@mui/material";
import { useCallback } from "react";

import { AutoViewCarouselContext } from "./Context";

export const CarouselControls = () => {
  const { carouselApi } =
    AutoViewCarouselContext.useAutoViewCarouselContextContext();

  const goToPrev = useCallback(() => {
    carouselApi?.scrollPrev();
  }, []);
  const goToNext = useCallback(() => {
    carouselApi?.scrollNext();
  }, []);

  return (
    <Controls>
      <button type="button" onClick={goToPrev}>
        Prev
      </button>
      <button type="button" onClick={goToNext}>
        <q>Next</q>
      </button>
    </Controls>
  );
};

const Controls = styled("div")`
  display: flex;
  justify-content: space-between;
`;
