export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // 1. Transform each ordered good into a DataListItem
    const goodsListItems = input.goods.map((good) => {
        var _a, _b, _c, _d, _e;
        const sale = good.commodity.sale;
        const title = (_b = (_a = sale.content) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "Unnamed Item";
        // Extract a thumbnail image if available
        const thumbnailUrl = (_e = (_d = (_c = sale.content) === null || _c === void 0 ? void 0 : _c.thumbnails) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.url;
        const labelComponents = [];
        if (thumbnailUrl) {
            labelComponents.push({
                type: "Image",
                src: thumbnailUrl,
                alt: title,
            });
        }
        // Always show the sale title
        labelComponents.push({
            type: "Text",
            content: title,
        });
        // Prepare the price and state as value components
        const priceText = `$${good.price.real.toFixed(2)}`;
        const stateText = good.state ? `Status: ${good.state}` : "";
        const valueComponents = [
            {
                type: "Text",
                content: priceText,
            },
        ];
        if (stateText) {
            valueComponents.push({
                type: "Text",
                content: stateText,
            });
        }
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // 2. Wrap order items in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: goodsListItems,
    };
    // 3. Build a CardHeader with an icon, order name, and order ID
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Order ID: ${input.id}`,
        startElement: {
            type: "Icon",
            id: "shopping-cart",
            size: 24,
            color: "blue",
        },
    };
    // 4. Create chips for the price breakdown
    const price = input.price;
    const chips = [
        {
            type: "Chip",
            label: `Total: $${price.real.toFixed(2)}`,
            color: "primary",
        },
        {
            type: "Chip",
            label: `Nominal: $${price.nominal.toFixed(2)}`,
            color: "gray",
        },
        {
            type: "Chip",
            label: `Cash: $${price.cash.toFixed(2)}`,
            color: "green",
        },
        {
            type: "Chip",
            label: `Deposit: $${price.deposit.toFixed(2)}`,
            color: "teal",
        },
        {
            type: "Chip",
            label: `Mileage: $${price.mileage.toFixed(2)}`,
            color: "cyan",
        },
        {
            type: "Chip",
            label: `Ticket: $${price.ticket.toFixed(2)}`,
            color: "orange",
        },
    ];
    const chipGroup = {
        type: "ChipGroup",
        childrenProps: chips,
    };
    const footer = {
        type: "CardFooter",
        childrenProps: [chipGroup],
    };
    // 5. Assemble the VerticalCard
    const content = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=20.js.map