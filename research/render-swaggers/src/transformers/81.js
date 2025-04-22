export function transform($input) {
    return visualizeData($input);
}
/**
 * Helper to format ISO date strings into a human-readable format.
 */
function formatDate(iso) {
    try {
        return new Date(iso).toLocaleString();
    }
    catch (_a) {
        return iso;
    }
}
/**
 * Helper to format numbers as currency using the user's locale.
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
    }).format(amount);
}
function visualizeData(input) {
    var _a, _b;
    // Card header: show order name, ID, and created date with an icon
    const header = {
        type: "CardHeader",
        title: `Order: ${input.name}`,
        description: `#${input.id}`,
        startElement: {
            type: "Icon",
            id: "shopping-cart",
            size: 24,
            color: "blue",
        },
        endElement: {
            type: "Text",
            content: formatDate(input.created_at),
            variant: "caption",
            color: "gray",
        },
    };
    // Customer chip: shows the customer ID
    const customerChip = {
        type: "Chip",
        label: `Customer: ${input.customer.id}`,
        startElement: {
            type: "Icon",
            id: "user",
            size: 16,
            color: "teal",
        },
        variant: "outlined",
        color: "teal",
    };
    // Build a list of goods with quantity and price
    const goodsItems = input.goods.map((good) => ({
        type: "DataListItem",
        label: {
            type: "Text",
            content: `Good ID: ${good.id}`,
            variant: "body2",
        },
        value: {
            type: "Text",
            content: `Qty: ${good.volume}, ${formatCurrency(good.price.real)}`,
            variant: "body2",
        },
    }));
    // If no goods, show a markdown notice
    const goodsComponent = goodsItems.length > 0
        ? {
            type: "DataList",
            childrenProps: goodsItems,
        }
        : {
            type: "Markdown",
            content: "### No items in this order.",
        };
    // Card content: contains customer and goods list
    const content = {
        type: "CardContent",
        childrenProps: [customerChip, goodsComponent],
    };
    // Footer: show total payment and number of coupons used
    const totalChip = {
        type: "Chip",
        label: `Total: ${formatCurrency(input.price.real)}`,
        color: "green",
        variant: "filled",
    };
    const couponsUsed = (_b = (_a = input.price.ticket_payments) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    const couponChip = {
        type: "Chip",
        label: `Coupons used: ${couponsUsed}`,
        color: "violet",
        variant: "outlined",
    };
    const footer = {
        type: "CardFooter",
        // Arrange chips horizontally
        childrenProps: [totalChip, couponChip],
    };
    // Compose the vertical card as the top-level component
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=81.js.map