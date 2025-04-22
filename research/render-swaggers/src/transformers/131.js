export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Format creation date for display
    const formattedDate = new Date(input.created_at).toLocaleString();
    // 1. Create the card header with an order icon, title and metadata
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Order ID: ${input.id} • ${formattedDate}`,
        startElement: {
            type: "Icon",
            id: "shopping-cart",
            color: "blue",
            size: 24
        }
    };
    // 2. Build a DataList of ordered goods
    const goodsItems = input.goods.map((good) => {
        var _a, _b;
        // Extract a title and optional thumbnail from the sale snapshot
        const title = good.commodity.sale.content.title || "Item";
        const thumbnailUrl = (_b = (_a = good.commodity.sale.content.thumbnails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url;
        // Compose the label: image (if available) + product name
        const labelChildren = [];
        if (thumbnailUrl) {
            labelChildren.push({
                type: "Image",
                src: thumbnailUrl,
                alt: title
            });
        }
        labelChildren.push({
            type: "Text",
            content: title
        });
        // Compose the value: quantity text + price chip
        const valueChildren = [
            {
                type: "Text",
                content: `x${good.volume}`
            },
            {
                type: "Chip",
                label: `$${good.price.real.toFixed(2)}`,
                variant: "outlined",
                color: "green"
            }
        ];
        return {
            type: "DataListItem",
            label: labelChildren,
            value: valueChildren
        };
    });
    const goodsDataList = {
        type: "DataList",
        childrenProps: goodsItems
    };
    // 3. Build a DataList summarizing the order price breakdown
    const price = input.price;
    const summaryItems = [
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Nominal Total" }],
            value: [{ type: "Text", content: `$${price.nominal.toFixed(2)}` }]
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Real Total" }],
            value: [{ type: "Text", content: `$${price.real.toFixed(2)}` }]
        }
    ];
    // Only show non-zero payment breakdown entries
    if (price.cash) {
        summaryItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Cash Paid" }],
            value: [{ type: "Text", content: `$${price.cash.toFixed(2)}` }]
        });
    }
    if (price.deposit) {
        summaryItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Deposit Used" }],
            value: [{ type: "Text", content: `$${price.deposit.toFixed(2)}` }]
        });
    }
    if (price.mileage) {
        summaryItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Mileage Used" }],
            value: [{ type: "Text", content: price.mileage.toString() }]
        });
    }
    if (price.ticket) {
        summaryItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Ticket Discounts" }],
            value: [{ type: "Text", content: `$${price.ticket.toFixed(2)}` }]
        });
    }
    const priceDataList = {
        type: "DataList",
        childrenProps: summaryItems
    };
    // 4. Add an action button in the footer for navigating to order details
    const footer = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Button",
                variant: "outlined",
                color: "primary",
                size: "medium",
                label: "View Details",
                href: `/orders/${input.id}`
            }
        ]
    };
    // 5. Assemble everything into a responsive vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: [goodsDataList, priceDataList]
            },
            footer
        ]
    };
    return card;
}
//# sourceMappingURL=131.js.map