import {
  IAutoViewCarouselProps,
  IAutoViewCollapseProps,
  IAutoViewGridListProps,
  IAutoViewStackedListProps,
} from "@autoview/interface";

export type IAutoViewComponentProps =
  | IAutoViewCarouselProps
  | IAutoViewCollapseProps
  | IAutoViewGridListProps
  | IAutoViewStackedListProps;
