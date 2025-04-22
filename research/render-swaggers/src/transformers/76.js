export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Header: show sale ID / volume with an icon
    const header = {
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
    let contentChildren;
    if (Array.isArray(input.stocks) && input.stocks.length > 0) {
        // Transform each stock into a DataListItem
        const items = input.stocks.map((stock) => {
            // Compute total quantity per stock
            const totalQuantity = stock.quantity * input.volume;
            // Build a set of chips: stock ID, total quantity, and any descriptive choices
            const chips = [];
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
    }
    else {
        // Gracefully handle the case of no stocks
        contentChildren = [
            {
                type: "Markdown",
                content: "### No stocks in the shopping cart.\nPlease add items to see details.",
            },
        ];
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Footer: show accumulate flag and an edit action
    const footerChildren = [];
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
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Compose into a vertical card for responsive display
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=76.js.map