import typia, { tags } from "typia";
namespace IAutoView {
    export type IAutoViewComponentProps = IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps | IAutoViewCardContentProps | IAutoViewCardFooterProps | IAutoViewCardHeaderProps | IAutoViewCardMediaProps | IAutoViewVerticalCardProps | IAutoViewHorizontalCardProps | IAutoViewCarouselProps | IAutoViewCollapseProps | IAutoViewCollapseHeaderProps | IAutoViewCollapseContentProps | IAutoViewListProps | IAutoViewListSubheaderProps | IAutoViewListItemProps;
    export type IAutoViewAvatarProps = {
        /**
         * @format uri
        */
        src?: string & tags.Format<"uri">;
        name?: string;
        variant?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray";
        size?: 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 56 | 64 | 72;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "Avatar";
    };
    export type IAutoViewAvatarGroupProps = {
        childrenProps?: IAutoViewAvatarProps[];
        maxItems?: number;
        totalItems?: number;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
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
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "Badge";
    };
    export type IAutoViewIconProps = {
        /**
         * Name of the icon to display.
         *
         * It must be one of the icon names defined by the `@fortawesome/free-solid-svg-icons` and
         * `@fortawesome/free-brands-svg-icons` packages.
         *
         * The name must be in kebab-case, without the `fa` prefix. Also you should not include the icon
         * set prefix (e.g. `fa-solid` or `fa-brands`) in the name.
         *
         * For example:
         *
         * - `home`
         * - `github`
         * - `arrow-right`
         * - `caret-down`
         *
         * @title Name of the icon to display
        */
        id: string;
        color?: "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray";
        size?: 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 56 | 64 | 72;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "Icon";
    };
    export type IAutoViewButtonProps = {
        variant?: "text" | "outlined" | "contained";
        color?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray";
        size?: "small" | "medium" | "large";
        label?: string | string[];
        startElement?: IAutoViewIconProps;
        endElement?: IAutoViewIconProps;
        /**
         * @format uri
        */
        href?: string & tags.Format<"uri">;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "Button";
    };
    export type IAutoViewChipProps = {
        label: string;
        startElement?: IAutoViewAvatarProps | IAutoViewIconProps;
        color?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray";
        size?: "small" | "medium" | "large";
        variant?: "outlined" | "filled";
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "Chip";
    };
    export type IAutoViewChipGroupProps = {
        childrenProps?: IAutoViewChipProps[];
        maxItems?: number;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "ChipGroup";
    };
    export type IAutoViewDataListProps = {
        childrenProps?: IAutoViewDataListItemProps[];
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "DataList";
    };
    export type IAutoViewDataListItemProps = {
        label?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        value?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "DataListItem";
    };
    export type IAutoViewPresentationComponentProps = IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
    export type IAutoViewDividerProps = {
        orientation?: "horizontal" | "vertical";
        color?: string;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "Divider";
    };
    export type IAutoViewIconButtonProps = {
        /**
         * Name of the icon to display.
         *
         * It must be one of the icon names defined by the `@fortawesome/free-solid-svg-icons` and
         * `@fortawesome/free-brands-svg-icons` packages.
         *
         * The name must be in kebab-case, without the `fa` prefix. Also you should not include the icon
         * set prefix (e.g. `fa-solid` or `fa-brands`) in the name.
         *
         * For example:
         *
         * - `home`
         * - `github`
         * - `arrow-right`
         * - `caret-down`
         *
         * @title Name of the icon to display
        */
        icon?: string;
        variant?: "outlined" | "contained";
        color?: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray";
        size?: "small" | "medium" | "large";
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "IconButton";
    };
    export type IAutoViewImageProps = {
        /**
         * @format uri
        */
        src: string & tags.Format<"uri">;
        alt?: string;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "Image";
    };
    /**
     * The component rendering the markdown content.
     *
     * If cannot find proper component to render, just utilize this one
     * so that render the markdown content.
     *
     * When writing the markdown content, if required, utilize the mermaid
     * syntax for drawing some digrams. When image contents are, just put
     * them through the markdown image syntax.
    */
    export type IAutoViewMarkdownProps = {
        /**
         * The markdown content.
         *
         * @title The markdown content
        */
        content: string;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "Markdown";
    };
    export type IAutoViewTextProps = {
        variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "subtitle3" | "body1" | "body2" | "caption" | "button" | "footnote";
        /**
         * @pattern ^(#(.*))
        */
        color?: "primary" | "secondary" | "success" | "error" | "info" | "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray" | "tertiary" | "disabled";
        lineClamp?: number;
        content: ArrayablestringIAutoViewIconProps;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "Text";
    };
    export type ArrayablestringIAutoViewIconProps = string | (string | IAutoViewIconProps)[] | IAutoViewIconProps;
    export type IAutoViewTooltipProps = {
        message?: string;
        childrenProps?: IAutoViewButtonProps | IAutoViewIconButtonProps | IAutoViewIconProps;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "Tooltip";
    };
    export type IAutoViewCardContentProps = {
        childrenProps?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "CardContent";
    };
    export type IAutoViewCardFooterProps = {
        childrenProps?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "CardFooter";
    };
    export type IAutoViewCardHeaderProps = {
        title?: string;
        description?: string;
        startElement?: IAutoViewAvatarProps | IAutoViewBadgeProps | IAutoViewChipProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewTextProps;
        endElement?: IAutoViewAvatarProps | IAutoViewBadgeProps | IAutoViewChipProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewTextProps;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "CardHeader";
    };
    export type IAutoViewCardMediaProps = {
        /**
         * @format uri
        */
        src?: string & tags.Format<"uri">;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "CardMedia";
    };
    export type IAutoViewVerticalCardProps = {
        childrenProps?: (IAutoViewCardFooterProps | IAutoViewCardContentProps | IAutoViewCardHeaderProps | IAutoViewCardMediaProps)[] | IAutoViewCardFooterProps | IAutoViewCardContentProps | IAutoViewCardHeaderProps | IAutoViewCardMediaProps;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "VerticalCard";
    };
    export type IAutoViewHorizontalCardProps = {
        childrenProps?: (IAutoViewCardContentProps | IAutoViewCardMediaProps)[] | IAutoViewCardContentProps | IAutoViewCardMediaProps;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "HorizontalCard";
    };
    export type IAutoViewCarouselProps = {
        autoPlay?: boolean;
        interval?: number;
        infinite?: boolean;
        gutter?: number;
        effect?: "slide" | "fade";
        navControls?: boolean;
        indicators?: boolean;
        childrenProps?: (IAutoViewHorizontalCardProps | IAutoViewVerticalCardProps)[];
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "Carousel";
    };
    export type IAutoViewCollapseProps = {
        header: IAutoViewCollapseHeaderProps;
        content: IAutoViewCollapseContentProps;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "Collapse";
    };
    export type IAutoViewCollapseHeaderProps = {
        toggleIcon?: IAutoViewIconProps;
        childrenProps?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "CollapseHeader";
    };
    export type IAutoViewCollapseContentProps = {
        childrenProps?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "CollapseContent";
    };
    export type IAutoViewListProps = {
        childrenProps?: (IAutoViewListSubheaderProps | IAutoViewListItemProps)[] | IAutoViewListSubheaderProps | IAutoViewListItemProps;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "List";
    };
    export type IAutoViewListSubheaderProps = {
        stickToTop?: boolean;
        childrenProps?: IAutoViewPresentationComponentProps[] | IAutoViewAvatarProps | IAutoViewAvatarGroupProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewChipGroupProps | IAutoViewDataListProps | IAutoViewDataListItemProps | IAutoViewDividerProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewMarkdownProps | IAutoViewTextProps | IAutoViewTooltipProps;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "ListSubheader";
    };
    export type IAutoViewListItemProps = {
        title?: string;
        description?: string;
        startElement?: IAutoViewAvatarProps | IAutoViewBadgeProps | IAutoViewChipProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewTextProps;
        endElement?: (IAutoViewAvatarProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewTextProps)[] | IAutoViewAvatarProps | IAutoViewBadgeProps | IAutoViewButtonProps | IAutoViewChipProps | IAutoViewIconButtonProps | IAutoViewIconProps | IAutoViewImageProps | IAutoViewTextProps;
        /**
         * @format uri
        */
        href?: string & tags.Format<"uri">;
        /**
         * Discriminator property.
         *
         * @title Discriminator property
        */
        type: "ListItem";
    };
}
type IAutoViewTransformerInputType = {
    /**
     * Creation information of a shopping cart commodity.
     *
     * ------------------------------
     *
     * Description of the current {@link IShoppingCartCommodity.ICreate} type:
     *
     * > Creation information of a shopping cart commodity.
     *
     * ------------------------------
     *
     * Description of the parent {@link IShoppingCartCommodity} type:
     *
     * > Item in a shopping cart.
     * >
     * > `IShoppingCartCommodity` is an entity that represents a
     * > {@link IShoppingSaleSnapshot snapshot} of the items that
     * > {@link IShoppingCustomer customer} has placed into his shopping cart with a
     * > {@link IShoppingOrder purchase} in mind. And if the customer continues this
     * > into an actual order in the future, `IShoppingCartCommodity` be changed to
     * > {@link IShoppingOrderGood}.
     * >
     * > And while adding a sale snapshot to the shopping cart, the customer inevitably
     * > selects specific {@link IShoppingSaleUnit units} and
     * > {@link IShoppingSaleUnitStock final stocks} within the listing snapshot.
     * > Information about these units and stocks is recorded in the subsidiary entity
     * > {@link IShoppingCartCommodityStock}. Also, there is an attribute {@link volume}
     * > that indicates how many sets of snapshots of the target commodity will be
     * > purchased. This "volume" is a value that will be multiplied by
     * > {@link IShoppingSaleUnitStock.IInvert.quantity}, the quantity for each
     * > component.
    */
    body: {
        /**
         * Target sale's {@link IShoppingSale.id}.
         *
         *
         * @format uuid
         *
         * @title Target sale's {@link IShoppingSale.id}
        */
        sale_id: string & tags.Format<"uuid">;
        /**
         * List of the stocks to be purchased.
         *
         *
         * @minItems 1
         *
         * @title List of the stocks to be purchased
        */
        stocks: {
            /**
             * Target unit's {@link IShoppingSaleUnit.id}.
             *
             *
             * @format uuid
             *
             * @title Target unit's {@link IShoppingSaleUnit.id}
            */
            unit_id: string & tags.Format<"uuid">;
            /**
             * Target stock's {@link IShoppingSaleUnitStock.id}.
             *
             * It must be matched with the {@link choices} property.
             *
             *
             * @format uuid
             *
             * @title Target stock's {@link IShoppingSaleUnitStock.id}
            */
            stock_id: string & tags.Format<"uuid">;
            /**
             * Creation information of the choices for each descriptive option.
             *
             * If target option is not of descriptive but of selective, then
             * this property must be an empty array.
             *
             * @title Creation information of the choices for each descriptive option
            */
            choices: {
                /**
                 * Target option's {@link IShoppingSaleUnitOption.id}.
                 *
                 *
                 * @format uuid
                 *
                 * @title Target option's {@link IShoppingSaleUnitOption.id}
                */
                option_id: string & tags.Format<"uuid">;
                /**
                 * Written value about the option.
                 *
                 * When target option's type is 'descriptive', then you have to
                 * fill this property with the written value by the customer.
                 *
                 * @title Written value about the option
                */
                value: null | string | number | boolean;
            }[];
            /**
             * Quantity of the stock to purchase.
             *
             * This value is multiplied by the {@link IShoppingCartCommodity.volume}.
             *
             *
             * @minimum 1
             *
             * @title Quantity of the stock to purchase
            */
            quantity: number & tags.Type<"int32"> & tags.Minimum<1>;
        }[] & tags.MinItems<1>;
        /**
         * Volume of the commodity to purchase.
         *
         * A value indicating how many sets would be multiplied to the children
         * {@link IShoppingSaleUnitStock.IInvert.quantity} values.
         *
         *
         * @minimum 1
         *
         * @title Volume of the commodity to purchase
        */
        volume: number & tags.Type<"int32"> & tags.Minimum<1>;
        /**
         * Whether to accumulate the volume or not.
         *
         * If this attribute is not `false` and there's same commodity that
         * composed with same stocks and options, then the volume will be
         * accumulated to the existed one.
         *
         * Otherwise, duplicated commodity would be newly created.
         *
         * @title Whether to accumulate the volume or not
        */
        accumulate?: null | boolean;
    };
};
export function test_components_as_ts_types($input: unknown): IAutoView.IAutoViewComponentProps {
    typia.assertGuard<IAutoViewTransformerInputType>($input);
    return visualizeData($input);
}
