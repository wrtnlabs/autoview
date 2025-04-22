export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no items in the cart, show a friendly markdown message
    if (!input.data || input.data.length === 0) {
        return {
            type: "Markdown",
            content: "### Your shopping cart is empty\nAdd some items to your cart to see them here."
        };
    }
    // Helper to format numbers as localized currency strings
    const formatCurrency = (amount) => new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD"
    }).format(amount);
    // Transform each cart item into a DataListItemProps
    const listItems = input.data.map(item => {
        var _a, _b;
        const { sale, volume, price } = item;
        const title = sale.content.title || "Untitled item";
        // Use first thumbnail if available
        const thumbnailUrl = (_b = (_a = sale.content.thumbnails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url;
        // Build the visual chips for quantity and pricing
        const chipProps = [
            {
                type: "Chip",
                label: `Qty: ${volume}`,
                color: "primary",
                variant: "outlined",
                size: "small"
            },
            {
                type: "Chip",
                label: formatCurrency(price.real),
                color: "success",
                variant: "filled",
                size: "small"
            }
        ];
        // If there's a nominal (original) price higher than the real price, show it as a secondary chip
        if (price.nominal > price.real) {
            chipProps.push({
                type: "Chip",
                label: formatCurrency(price.nominal),
                color: "secondary",
                variant: "outlined",
                size: "small"
            });
        }
        // Compose the label: an image plus the item title
        const labelComponents = [];
        if (thumbnailUrl) {
            labelComponents.push({
                type: "Image",
                src: thumbnailUrl,
                alt: title
            });
        }
        labelComponents.push({
            type: "Text",
            content: title,
            variant: "subtitle1"
        });
        return {
            type: "DataListItem",
            // Left side: image and title
            label: labelComponents,
            // Right side: quantity & pricing chips
            value: chipProps
        };
    });
    // Wrap all items in a DataList for responsive display
    return {
        type: "DataList",
        childrenProps: listItems
    };
}
//# sourceMappingURL=74.js.map