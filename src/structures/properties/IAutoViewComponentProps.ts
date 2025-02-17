import { IAutoViewAccordionProps } from "./IAutoViewAccordionProps";
import { IAutoViewCarouselProps } from "./IAutoViewCarouselProps";
import { IAutoViewGridProps } from "./IAutoViewGridProps";
import { IAutoViewListProps } from "./IAutoViewListProps";

export type IAutoViewComponentProps =
  | IAutoViewAccordionProps
  | IAutoViewCarouselProps
  | IAutoViewGridProps
  | IAutoViewListProps;
