import { IAutoViewCarouselProps } from "@autoview/interface";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";

import { TransformToComponentProps } from "../../utils/TransformToComponentProps";
import { CarouselContainer as Container } from "./Container";
import { AutoViewCarouselContext } from "./Context";
import { CarouselIndicators as Indicators } from "./Indicators";
import { CarouselNavControls as Controls } from "./NavControls";
import { CarouselSlide as Slide } from "./Slide";
import { transformCarouselProps } from "./transform";

export interface CarouselProps
  extends TransformToComponentProps<IAutoViewCarouselProps> {}

export const Carousel = (props: CarouselProps) => {
  const { childrenProps = [], navControls, indicators } = props;
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
          {childrenProps.map((comp, index) => (
            <Slide key={index} {...comp} />
          ))}
        </Container>

        {navControls && <Controls />}
        {indicators && <Indicators items={childrenProps} />}
      </div>
    </AutoViewCarouselContext.AutoViewCarouselContextProvider>
  );
};
