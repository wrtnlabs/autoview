export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure pagination and orders
    const { pagination, data: orders } = input;
    // Transform each order into a DataListItemProps
    const listItems = orders.map(order => {
        var _a, _b;
        // Safely compute goods count and total price
        const goodsCount = Array.isArray(order.goods) ? order.goods.length : 0;
        const totalReal = (_b = (_a = order.price) === null || _a === void 0 ? void 0 : _a.real) !== null && _b !== void 0 ? _b : 0;
        // Format date for display (YYYY-MM-DD)
        const dateOnly = order.created_at ? order.created_at.split("T")[0] : "";
        return {
            type: "DataListItem",
            // Label consists of a shopping-cart icon + order name
            label: [
                {
                    type: "Icon",
                    id: "shopping-cart",
                    color: "blue",
                    size: 16,
                },
                {
                    type: "Text",
                    variant: "body1",
                    // content supports mixing IconProps, so we wrap the order name as a single-element array
                    content: [order.name],
                },
            ],
            // Value shows number of items, total price, and order date as chips/text
            value: [
                {
                    type: "Chip",
                    label: `${goodsCount} item${goodsCount !== 1 ? "s" : ""}`,
                    size: "small",
                    variant: "outlined",
                    color: "primary",
                },
                {
                    type: "Chip",
                    label: `$${totalReal.toFixed(2)}`,
                    size: "small",
                    variant: "filled",
                    color: "success",
                },
                {
                    type: "Text",
                    variant: "caption",
                    color: "gray",
                    content: [dateOnly],
                },
            ],
        };
    });
    // Compose a DataList to display all orders
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Header for the card, showing current page info
    const cardHeader = {
        type: "CardHeader",
        title: "Orders",
        description: `Page ${pagination.current} of ${pagination.pages}`,
    };
    // Card content wrapping the list
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Return a vertical card containing header and content
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
}
//# sourceMappingURL=130.js.map