import {
  IAutoViewBadgeProps,
  IAutoViewCarouselProps,
  IAutoViewChipProps,
  IAutoViewCollapseProps,
  IAutoViewDividerProps,
  IAutoViewGridListProps,
  IAutoViewIconProps,
  IAutoViewImageProps,
  IAutoViewStackedListProps,
  IAutoViewStatsProps,
  IAutoViewTagProps,
  IAutoViewTypographyProps,
} from "../components";

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
