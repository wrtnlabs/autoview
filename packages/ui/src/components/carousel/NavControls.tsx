import { IconButton, styled } from "@mui/material";
import { useCallback } from "react";

import { Icon } from "../icon";
import { AutoViewCarouselContext } from "./Context";

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
    <Controls>
      <IconButton onClick={goToPrev}>
        <Icon type="Icon" id="chevron-left" />
      </IconButton>
      <IconButton onClick={goToNext}>
        <Icon type="Icon" id="chevron-right" />
      </IconButton>
    </Controls>
  );
};

const Controls = styled("div")`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
`;
