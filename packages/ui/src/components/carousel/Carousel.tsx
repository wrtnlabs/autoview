import { IAutoViewCarouselProps } from "@autoview/interface";
import { Box } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";

import { TransformToComponentProps } from "../../utils/TransformToComponentProps";
import { AutoViewCarouselContext } from "./CarouselContext";
import { CarouselIndicators } from "./CarouselIndicators";
import { CarouselItem } from "./CarouselItem";
import { CarouselNavControls } from "./CarouselNavControls";
import { CarouselContainer } from "./Container";
import { transformCarouselProps } from "./transform";

export interface CarouselProps
  extends TransformToComponentProps<IAutoViewCarouselProps> {}

export const Carousel = ({
  childrenProps = [],
  navControls,
  indicators,
  gutter = 16,
  ...props
}: CarouselProps) => {
  const [options, plugins] = transformCarouselProps(props);
  const [carouselRef, carouselApi] = useEmblaCarousel(options, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <AutoViewCarouselContext.AutoViewCarouselContextProvider
      value={{
        carouselRef,
        carouselApi,
        selectedIndex,
        setSelectedIndex,
      }}
    >
      <Box sx={baseStyle}>
        <CarouselContainer>
          {childrenProps.map((prop, index) => (
            <CarouselItem key={index} {...prop} gutter={gutter} />
          ))}
        </CarouselContainer>

        {navControls && <CarouselNavControls />}
      </Box>
      {indicators && <CarouselIndicators length={childrenProps.length} />}
    </AutoViewCarouselContext.AutoViewCarouselContextProvider>
  );
};

const baseStyle = {
  position: "relative",
  width: "100%",
  maxWidth: 320,
};
