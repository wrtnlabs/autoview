import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingCartCommodity {
        /**
         * Creation information of a shopping cart commodity.
        */
        export type ICreate = {
            /**
             * Target sale's {@link IShoppingSale.id}.
             *
             * @title Target sale's {@link IShoppingSale.id}
            */
            sale_id: string;
            /**
             * List of the stocks to be purchased.
             *
             * @title List of the stocks to be purchased
            */
            stocks: Schema.IShoppingCartCommodityStock.ICreate[];
            /**
             * Volume of the commodity to purchase.
             *
             * A value indicating how many sets would be multiplied to the children
             * {@link IShoppingSaleUnitStock.IInvert.quantity} values.
             *
             * @title Volume of the commodity to purchase
            */
            volume: number & tags.Type<"int32">;
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
    }
    export namespace IShoppingCartCommodityStock {
        /**
         * Creation information of the commodity stock of shopping cart.
         *
         * When record being created, its corresponding structure would be
         * {@link IShoppingSaleSnapshotUnit.IInvert} and
         * {@link IShoppingSaleSnapshotUnitStock.IInvert}.
        */
        export type ICreate = {
            /**
             * Target unit's {@link IShoppingSaleUnit.id}.
             *
             * @title Target unit's {@link IShoppingSaleUnit.id}
            */
            unit_id: string;
            /**
             * Target stock's {@link IShoppingSaleUnitStock.id}.
             *
             * It must be matched with the {@link choices} property.
             *
             * @title Target stock's {@link IShoppingSaleUnitStock.id}
            */
            stock_id: string;
            /**
             * Creation information of the choices for each descriptive option.
             *
             * If target option is not of descriptive but of selective, then
             * this property must be an empty array.
             *
             * @title Creation information of the choices for each descriptive option
            */
            choices: Schema.IShoppingCartCommodityStockChoice.ICreate[];
            /**
             * Quantity of the stock to purchase.
             *
             * This value is multiplied by the {@link IShoppingCartCommodity.volume}.
             *
             * @title Quantity of the stock to purchase
            */
            quantity: number & tags.Type<"int32">;
        };
    }
    export namespace IShoppingCartCommodityStockChoice {
        /**
         * Creation information of the choice for each option (of descriptive).
         *
         * When target option is {@link IShoppingSaleUnitDescriptiveOption}
         * type, then you have to compose this choice structure with
         * {@link value} specification.
         *
         * Otherwise when target option is {@link IShoppingSaleUnitSelectableOption}
         * type, you don't need to compose this choice structure. Just fill only
         * the {@link IShoppingCartCommodityStock.ICreate.stock_id} property.
        */
        export type ICreate = {
            /**
             * Target option's {@link IShoppingSaleUnitOption.id}.
             *
             * @title Target option's {@link IShoppingSaleUnitOption.id}
            */
            option_id: string;
            /**
             * Written value about the option.
             *
             * When target option's type is 'descriptive', then you have to
             * fill this property with the written value by the customer.
             *
             * @title Written value about the option
            */
            value: null | string | number | boolean;
        };
    }
}
type IAutoViewTransformerInputType = Schema.IShoppingCartCommodity.ICreate;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Header: show sale ID / volume with an icon
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: `Sale ${input.sale_id}`,
        description: `Volume: ${input.volume}`,
        // Shopping cart icon to visually identify the sale item
        startElement: {
            type: "Icon",
            id: "shopping-cart",
            size: 24,
            color: "blue",
        },
    };

    // Content: list each stock in a DataList or show a placeholder if empty
    let contentChildren: IAutoView.IAutoViewPresentationComponentProps[];
    if (Array.isArray(input.stocks) && input.stocks.length > 0) {
        // Transform each stock into a DataListItem
        const items: IAutoView.IAutoViewDataListItemProps[] = input.stocks.map((stock) => {
            // Compute total quantity per stock
            const totalQuantity = stock.quantity * input.volume;

            // Build a set of chips: stock ID, total quantity, and any descriptive choices
            const chips: IAutoView.IAutoViewChipProps[] = [];

            // Chip for the stock identifier
            chips.push({
                type: "Chip",
                label: `Stock ${stock.stock_id}`,
                color: "cyan",
                size: "small",
                variant: "outlined",
            });

            // Chip for the computed total quantity
            chips.push({
                type: "Chip",
                label: `Qty: ${totalQuantity}`,
                color: "teal",
                size: "small",
                variant: "filled",
            });

            // If there are descriptive options, render each as a chip
            if (Array.isArray(stock.choices) && stock.choices.length > 0) {
                stock.choices.forEach((choice) => {
                    // Convert null to an em dash for better UX
                    const val = choice.value !== null ? `${choice.value}` : "—";
                    chips.push({
                        type: "Chip",
                        label: `${choice.option_id}: ${val}`,
                        color: "indigo",
                        size: "small",
                        variant: "outlined",
                    });
                });
            }

            // Each DataListItem shows the unit on the left and chips on the right
            return {
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: `Unit ${stock.unit_id}`,
                },
                value: {
                    type: "ChipGroup",
                    childrenProps: chips,
                    maxItems: chips.length,
                },
            };
        });

        contentChildren = [
            {
                type: "DataList",
                childrenProps: items,
            },
        ];
    } else {
        // Gracefully handle the case of no stocks
        contentChildren = [
            {
                type: "Markdown",
                content: "### No stocks in the shopping cart.\nPlease add items to see details.",
            },
        ];
    }

    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: contentChildren,
    };

    // Footer: show accumulate flag and an edit action
    const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

    if (input.accumulate) {
        // If accumulation is enabled, highlight it
        footerChildren.push({
            type: "Chip",
            label: "Accumulate",
            color: "success",
            size: "small",
            variant: "filled",
        });
    }

    // Action button to allow editing this commodity
    footerChildren.push({
        type: "IconButton",
        icon: "edit",
        variant: "contained",
        color: "primary",
        size: "small",
    });

    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };

    // Compose into a vertical card for responsive display
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };

    return card;
}
