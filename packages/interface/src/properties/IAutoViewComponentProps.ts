import {
  IAutoViewBadgeProps,
  IAutoViewChipProps,
  IAutoViewDividerProps,
  IAutoViewStatsProps,
  IAutoViewTagProps,
} from "../data-display";
import {
  IAutoViewCarouselProps,
  IAutoViewCollapseProps,
  IAutoViewGridListProps,
  IAutoViewStackedListProps,
} from "../surface";

export type IAutoViewDataDisplayComponentProps =
  | IAutoViewBadgeProps
  | IAutoViewChipProps
  | IAutoViewDividerProps
  | IAutoViewStatsProps
  | IAutoViewTagProps;

export type IAutoViewSurfaceComponentProps =
  | IAutoViewCollapseProps
  | IAutoViewCarouselProps
  | IAutoViewGridListProps
  | IAutoViewStackedListProps;

export type IAutoViewNonSurfaceComponentProps =
  IAutoViewDataDisplayComponentProps;

export type IAutoViewComponentProps =
  | IAutoViewDataDisplayComponentProps
  | IAutoViewSurfaceComponentProps;
