import {
  IAutoViewAvatarProps,
  IAutoViewBadgeProps,
  IAutoViewButtonProps,
  IAutoViewCardComponentProps,
  IAutoViewCarouselComponentProps,
  IAutoViewChipProps,
  IAutoViewCollapseComponentProps,
  IAutoViewDividerProps,
  IAutoViewIconButtonProps,
  IAutoViewIconProps,
  IAutoViewImageProps,
  IAutoViewListComponentProps,
  IAutoViewMarkdownProps,
  IAutoViewStatsProps,
  IAutoViewStepperProps,
  IAutoViewTextProps,
  IAutoViewTooltipProps,
} from "../components";

export type IAutoViewPresentationComponentProps =
  | IAutoViewAvatarProps
  | IAutoViewBadgeProps
  | IAutoViewButtonProps
  | IAutoViewChipProps
  | IAutoViewDividerProps
  | IAutoViewIconButtonProps
  | IAutoViewIconProps
  | IAutoViewImageProps
  | IAutoViewMarkdownProps
  | IAutoViewStatsProps
  | IAutoViewTextProps
  | IAutoViewTooltipProps;

export type IAutoViewContainerComponentProps =
  | IAutoViewCardComponentProps
  | IAutoViewCarouselComponentProps
  | IAutoViewCollapseComponentProps
  | IAutoViewListComponentProps
  | IAutoViewStepperProps;

export type IAutoViewComponentProps =
  | IAutoViewPresentationComponentProps
  | IAutoViewContainerComponentProps;
