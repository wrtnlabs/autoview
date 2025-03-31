import typia, { tags } from "typia";
namespace IAutoView {
    export type IAutoViewComponentProps = IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps | IAutoViewCardContentProps | IAutoViewCardFooterProps | IAutoViewCardHeaderProps | IAutoViewCardMediaProps | IAutoViewCardPropsIAutoViewCardProps.IOrientation | IAutoViewCarouselProps | IAutoViewCollapseProps | IAutoViewCollapseHeaderProps | IAutoViewCollapseContentProps | IAutoViewListProps | IAutoViewListSubheaderProps | IAutoViewListItemProps;
    export type IAutoViewAvatarProps = {
        src?: string & tags.Format<"uri">;
        name?: string;
        variant?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray";
        size?: 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 56 | 64 | 72;
        type: "Avatar";
    };
    export type IAutoViewAvatarGroupProps = {
        childrenProps?: IAutoViewAvatarProps[];
        maxItems?: number;
        totalItems?: number;
        type: "AvatarGroup";
    };
    export type IAutoViewBadgeProps = {
        count?: number;
        color?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray";
        childrenProps: IAutoViewAvatarProps | IAutoViewIconProps;
        maxCount?: number;
        showZero?: boolean;
        dot?: boolean;
        offset?: {
            vertical?: "top" | "bottom";
            horizontal?: "left" | "right";
        };
        type: "Badge";
    };
    export type IAutoViewIconProps = {
        id: string;
        color?: "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray";
        size?: 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 56 | 64 | 72;
        type: "Icon";
    };
    export type IAutoViewButtonProps = {
        variant?: "text" | "outlined" | "contained";
        color?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray";
        size?: "small" | "medium" | "large";
        label?: string | string[];
        startElement?: IAutoViewIconProps;
        endElement?: IAutoViewIconProps;
        href?: string & tags.Format<"uri">;
        type: "Button";
    };
    export type IAutoViewChipProps = {
        label: string;
        startElement?: IAutoViewAvatarProps | IAutoViewIconProps;
        color?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray";
        size?: "small" | "medium" | "large";
        variant?: "outlined" | "filled";
        type: "Chip";
    };
    export type IAutoViewChipGroupProps = {
        childrenProps?: IAutoViewChipProps[];
        maxItems?: number;
        type: "ChipGroup";
    };
    export type IAutoViewDataListProps = {
        childrenProps?: IAutoViewDataListItemProps[];
        type: "DataList";
    };
    export type IAutoViewDataListItemProps = {
        label?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        value?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        type: "DataListItem";
    };
    export type IAutoViewPresentationComponentProps = IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
    export type IAutoViewDividerProps = {
        orientation?: "horizontal" | "vertical";
        color?: string;
        type: "Divider";
    };
    export type IAutoViewIconButtonProps = {
        icon?: string;
        variant?: "outlined" | "contained";
        color?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray";
        size?: "small" | "medium" | "large";
        type: "IconButton";
    };
    export type IAutoViewImageProps = {
        src: string & tags.Format<"uri">;
        alt?: string;
        type: "Image";
    };
    export type IAutoViewMarkdownProps = {
        content: string;
        type: "Markdown";
    };
    export type IAutoViewTextProps = {
        variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "subtitle3" | "body1" | "body2" | "caption" | "button" | "footnote";
        color?: "primary" | "secondary" | "success" | "error" | "info" | "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray" | "tertiary" | "disabled";
        lineClamp?: number;
        content: ArrayablestringIAutoViewIconProps;
        type: "Text";
    };
    export type ArrayablestringIAutoViewIconProps = string | (string | IAutoViewIconProps)[] | IAutoViewIconProps;
    export type IAutoViewTooltipProps = {
        message?: string;
        childrenProps?: IAutoViewButtonProps | IAutoViewIconButtonProps | IAutoViewIconProps;
        type: "Tooltip";
    };
    export type IAutoViewCardContentProps = {
        childrenProps?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        type: "CardContent";
    };
    export type IAutoViewCardFooterProps = {
        childrenProps?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        type: "CardFooter";
    };
    export type IAutoViewCardHeaderProps = {
        title?: string;
        description?: string;
        startElement?: IAutoViewAvatarProps | IAutoViewBadgeProps | IAutoViewChipProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewTextProps;
        endElement?: IAutoViewAvatarProps | IAutoViewBadgeProps | IAutoViewChipProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewTextProps;
        type: "CardHeader";
    };
    export type IAutoViewCardMediaProps = {
        src?: string & tags.Format<"uri">;
        type: "CardMedia";
    };
    export namespace IAutoViewCardPropsIAutoViewCardProps {
        export type IOrientation = {
            orientation?: "horizontal" | "vertical";
            childrenProps?: (IAutoViewCardFooterProps | IAutoViewCardContentProps | IAutoViewCardHeaderProps | IAutoViewCardMediaProps)[] | (IAutoViewCardContentProps | IAutoViewCardMediaProps)[] | IAutoViewCardFooterProps | IAutoViewCardContentProps | IAutoViewCardHeaderProps | IAutoViewCardMediaProps;
            type: "Card";
        };
        export namespace IOrientation {
            export type o1 = {
                orientation?: "horizontal" | "vertical";
                childrenProps?: (IAutoViewCardFooterProps | IAutoViewCardContentProps | IAutoViewCardHeaderProps | IAutoViewCardMediaProps)[] | (IAutoViewCardContentProps | IAutoViewCardMediaProps)[] | IAutoViewCardFooterProps | IAutoViewCardContentProps | IAutoViewCardHeaderProps | IAutoViewCardMediaProps;
                type: "Card";
            };
        }
    }
    export type IAutoViewCarouselProps = {
        autoPlay?: boolean;
        interval?: number;
        infinite?: boolean;
        gutter?: number;
        effect?: "slide" | "fade";
        navControls?: boolean;
        indicators?: boolean;
        childrenProps?: IAutoViewCardPropsIAutoViewCardProps.IOrientation.o1[];
        type: "Carousel";
    };
    export type IAutoViewCollapseProps = {
        header: IAutoViewCollapseHeaderProps;
        content: IAutoViewCollapseContentProps;
        type: "Collapse";
    };
    export type IAutoViewCollapseHeaderProps = {
        toggleIcon?: IAutoViewIconProps;
        childrenProps?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        type: "CollapseHeader";
    };
    export type IAutoViewCollapseContentProps = {
        childrenProps?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        type: "CollapseContent";
    };
    export type IAutoViewListProps = {
        childrenProps?: (IAutoViewListSubheaderProps | IAutoViewListItemProps)[] | IAutoViewListSubheaderProps | IAutoViewListItemProps;
        type: "List";
    };
    export type IAutoViewListSubheaderProps = {
        stickToTop?: boolean;
        childrenProps?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        type: "ListSubheader";
    };
    export type IAutoViewListItemProps = {
        title?: string;
        description?: string;
        startElement?: IAutoViewAvatarProps | IAutoViewBadgeProps | IAutoViewChipProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewTextProps;
        endElement?: (IAutoViewAvatarProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewTextProps)[] | IAutoViewAvatarProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewTextProps;
        href?: string & tags.Format<"uri">;
        type: "ListItem";
    };
}
type IAutoViewTransformerInputType = {
    body: {
        sale_id: string & tags.Format<"uuid">;
        stocks: {
            unit_id: string & tags.Format<"uuid">;
            stock_id: string & tags.Format<"uuid">;
            choices: {
                option_id: string & tags.Format<"uuid">;
                value: null | string | number | boolean;
            }[];
            quantity: number & tags.Type<"int32"> & tags.Minimum<1>;
        }[] & tags.MinItems<1>;
        volume: number & tags.Type<"int32"> & tags.Minimum<1>;
        accumulate?: null | boolean;
    };
};
export function transform($input: unknown): IAutoView.IAutoViewComponentProps {
    typia.assertGuard<IAutoViewTransformerInputType>($input);
    return visualizeData($input);
}
