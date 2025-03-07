import {
  IAutoViewIconProps,
  IAutoViewImageProps,
  IAutoViewTypographyProps,
} from "../common";
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

export type IAutoViewCommonComponentProps =
  | IAutoViewIconProps
  | IAutoViewImageProps
  | IAutoViewTypographyProps;

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
  | IAutoViewCommonComponentProps
  | IAutoViewDataDisplayComponentProps;

export type IAutoViewComponentProps =
  | IAutoViewCommonComponentProps
  | IAutoViewDataDisplayComponentProps
  | IAutoViewSurfaceComponentProps;
