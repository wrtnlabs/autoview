import {
  IAutoViewBadgeProps,
  IAutoViewCardActionsProps,
  IAutoViewCardContentProps,
  IAutoViewCardHeaderProps,
  IAutoViewCardMediaProps,
  IAutoViewCardProps,
  IAutoViewCarouselProps,
  IAutoViewChipProps,
  IAutoViewCollapseProps,
  IAutoViewDividerProps,
  IAutoViewGridListProps,
  IAutoViewIconProps,
  IAutoViewImageAvatarProps,
  IAutoViewImageProps,
  IAutoViewLetterAvatarProps,
  IAutoViewStackProps,
  IAutoViewStackedListProps,
  IAutoViewStatsProps,
  IAutoViewTextProps,
} from "../components";

export type IAutoViewCommonComponentProps =
  | IAutoViewIconProps
  | IAutoViewImageProps
  | IAutoViewTextProps
  | IAutoViewStackProps;

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

export type IAutoViewCardComponentProps =
  | IAutoViewCardActionsProps
  | IAutoViewCardContentProps
  | IAutoViewCardHeaderProps
  | IAutoViewCardMediaProps
  | IAutoViewCardProps;

export type IAutoViewNonSurfaceComponentProps =
  | IAutoViewCommonComponentProps
  | IAutoViewDataDisplayComponentProps;

export type IAutoViewComponentProps =
  | IAutoViewCommonComponentProps
  | IAutoViewDataDisplayComponentProps
  | IAutoViewSurfaceComponentProps
  | IAutoViewCardComponentProps;
