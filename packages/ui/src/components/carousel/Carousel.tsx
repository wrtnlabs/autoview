import { IAutoViewCarouselProps } from "@autoview/interface";
import useEmblaCarousel from "embla-carousel-react";
import React, { useState } from "react";

import { CarouselContainer as Container } from "./Container";
import { AutoViewCarouselContext } from "./Context";
import { CarouselControls as Controls } from "./Controls";
import { CarouselIndicators as Indicators } from "./Indicators";
import { CarouselSlide as Slide } from "./Slide";
import { transformCarouselProps } from "./transform";

export const Carousel = (props: IAutoViewCarouselProps) => {
  const { childComponents, showArrows, indicators } = props;
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
      <div style={{ position: "relative" }}>
        <Container>
          {childComponents.map((comp, index) => (
            <Slide key={index} {...comp} />
          ))}
        </Container>

        {showArrows && <Controls />}
        {indicators && <Indicators items={childComponents} />}
      </div>
    </AutoViewCarouselContext.AutoViewCarouselContextProvider>
  );
};
