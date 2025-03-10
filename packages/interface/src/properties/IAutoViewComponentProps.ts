import {
  IAutoViewBadgeProps,
  IAutoViewCarouselProps,
  IAutoViewChipProps,
  IAutoViewCollapseProps,
  IAutoViewDividerProps,
  IAutoViewGridListProps,
  IAutoViewIconProps,
  IAutoViewImageAvatarProps,
  IAutoViewImageProps,
  IAutoViewLetterAvatarProps,
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
  | IAutoViewImageAvatarProps
  | IAutoViewLetterAvatarProps
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
