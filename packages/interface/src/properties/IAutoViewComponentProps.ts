import {
  IAutoViewAvatarGroupProps,
  IAutoViewAvatarProps,
  IAutoViewBadgeProps,
  IAutoViewButtonProps,
  IAutoViewCardComponentProps,
  IAutoViewCarouselComponentProps,
  IAutoViewChipGroupProps,
  IAutoViewChipProps,
  IAutoViewCollapseComponentProps,
  IAutoViewDataListItemProps,
  IAutoViewDataListProps,
  IAutoViewDividerProps,
  IAutoViewIconButtonProps,
  IAutoViewIconProps,
  IAutoViewImageProps,
  IAutoViewListComponentProps,
  IAutoViewMarkdownProps,
  IAutoViewTextProps,
  IAutoViewTooltipProps,
} from "../components";

export type IAutoViewPresentationComponentProps =
  | IAutoViewAvatarProps
  | IAutoViewAvatarGroupProps
  | IAutoViewBadgeProps
  | IAutoViewButtonProps
  | IAutoViewChipProps
  | IAutoViewChipGroupProps
  | IAutoViewDataListProps
  | IAutoViewDataListItemProps
  | IAutoViewDividerProps
  | IAutoViewIconButtonProps
  | IAutoViewIconProps
  | IAutoViewImageProps
  | IAutoViewMarkdownProps
  | IAutoViewTextProps
  | IAutoViewTooltipProps;

export type IAutoViewContainerComponentProps =
  | IAutoViewCardComponentProps
  | IAutoViewCarouselComponentProps
  | IAutoViewCollapseComponentProps
  | IAutoViewListComponentProps;

export type IAutoViewComponentProps =
  | IAutoViewPresentationComponentProps
  | IAutoViewContainerComponentProps;
