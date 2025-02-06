import { IAutoViewAccordionProps } from "./IAutoViewAccordionProps";
import { IAutoViewCarouselProps } from "./IAutoViewCarouselProps";
import { IAutoViewGridProps } from "./IAutoViewGridProps";

export type IAutoViewComponentProps =
  | IAutoViewAccordionProps
  | IAutoViewCarouselProps
  | IAutoViewGridProps;
