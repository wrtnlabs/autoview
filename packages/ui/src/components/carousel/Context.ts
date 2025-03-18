import { EmblaCarouselType } from "embla-carousel";
import { Dispatch, SetStateAction } from "react";

import { createSafeContext } from "../../utils/createSafeContext";

export type EmblaViewportRefType = <ViewportElement extends HTMLElement>(
  instance: ViewportElement | null,
) => void;

export type AutoViewCarouselContext = {
  carouselRef: EmblaViewportRefType;
  carouselApi: EmblaCarouselType | undefined;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
};

export const AutoViewCarouselContext = createSafeContext(
  "AutoViewCarouselContext",
)<AutoViewCarouselContext>();
