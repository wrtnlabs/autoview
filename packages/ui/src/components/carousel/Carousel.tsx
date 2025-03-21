import { IAutoViewCarouselProps } from "@autoview/interface";
import useEmblaCarousel from "embla-carousel-react";

import { CarouselContainer as Container } from "./Container";
import { AutoViewCarouselContext } from "./Context";
import { CarouselControls as Controls } from "./Controls";
import { CarouselIndicators as Indicators } from "./Indicators";
import { CarouselSlide as Slide } from "./Slide";
import { transformCarouselProps } from "./transform";

export const Carousel = (props: IAutoViewCarouselProps) => {
  const { items, showArrows, indicators } = props;
  const [options, plugins] = transformCarouselProps(props);
  const [carouselRef, carouselApi] = useEmblaCarousel(options, plugins);

  return (
    <AutoViewCarouselContext.AutoViewCarouselContextProvider
      value={{
        carouselRef,
        carouselApi,
      }}
    >
      <Container>
        {items.map((item, index) => (
          <Slide key={index} {...item} />
        ))}
      </Container>

      {showArrows && <Controls />}
      {indicators && <Indicators items={items} />}
    </AutoViewCarouselContext.AutoViewCarouselContextProvider>
  );
};
