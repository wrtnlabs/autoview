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
  IAutoViewTextProps,
} from "../components";

export type IAutoViewCommonComponentProps =
  | IAutoViewIconProps
  | IAutoViewImageProps
  | IAutoViewTextProps;

export type IAutoViewDataDisplayComponentProps =
  | IAutoViewBadgeProps
  | IAutoViewChipProps
  | IAutoViewDividerProps
  | IAutoViewStatsProps
  | IAutoViewImageAvatarProps
  | IAutoViewLetterAvatarProps;

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
