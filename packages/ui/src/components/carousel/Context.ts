import { EmblaCarouselType } from "embla-carousel";

import { createSafeContext } from "../../utils/createSafeContext";

export type EmblaViewportRefType = <ViewportElement extends HTMLElement>(
  instance: ViewportElement | null,
) => void;

export type AutoViewCarouselContext = {
  carouselRef: EmblaViewportRefType;
  carouselApi: EmblaCarouselType | undefined;
};

export const AutoViewCarouselContext = createSafeContext(
  "AutoViewCarouselContext",
)<AutoViewCarouselContext>();
