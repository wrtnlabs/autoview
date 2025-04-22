export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    const { sale, volume, price, created_at } = input;
    // Build a list of DataListItemProps from each unit's stocks
    const dataListItems = [];
    (_a = sale.units) === null || _a === void 0 ? void 0 : _a.forEach((unit) => {
        var _a;
        (_a = unit.stocks) === null || _a === void 0 ? void 0 : _a.forEach((stock) => {
            dataListItems.push({
                type: "DataListItem",
                // Label shows unit and stock name
                label: [
                    { type: "Text", content: [`${unit.name} – ${stock.name}`] }
                ],
                // Value shows real price and quantity
                value: [
                    { type: "Text", content: [`$${stock.price.real.toFixed(2)}`] },
                    { type: "Text", content: [`×${stock.quantity}`] }
                ]
            });
        });
    });
    // Fallback item if there are no stocks
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems.length
            ? dataListItems
            : [
                {
                    type: "DataListItem",
                    label: [{ type: "Text", content: ["No items in cart"] }]
                }
            ]
    };
    // Create chips for categories
    const categoryChips = ((_b = sale.categories) === null || _b === void 0 ? void 0 : _b.map((cat) => ({
        type: "Chip",
        label: cat.name,
        variant: "outlined",
        size: "small"
    }))) || [];
    const categoryChipGroup = {
        type: "ChipGroup",
        childrenProps: categoryChips
    };
    // Create chips for tags
    const tagChips = ((_c = sale.tags) === null || _c === void 0 ? void 0 : _c.map((tag) => ({
        type: "Chip",
        label: tag,
        color: "secondary",
        variant: "filled",
        size: "small"
    }))) || [];
    const tagChipGroup = {
        type: "ChipGroup",
        childrenProps: tagChips
    };
    // Use the first thumbnail as the card media if available
    const thumbnailUrl = (_e = (_d = sale.content.thumbnails) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.url;
    const mediaComponent = thumbnailUrl
        ? { type: "CardMedia", src: thumbnailUrl }
        : undefined;
    // Format the creation date
    const addedDate = (() => {
        try {
            return new Date(created_at).toLocaleDateString();
        }
        catch (_a) {
            return created_at;
        }
    })();
    // Assemble card children in order: header, media, content, footer
    const cardChildren = [];
    // Header with title, metadata, and price
    cardChildren.push({
        type: "CardHeader",
        title: sale.content.title,
        description: `Added: ${addedDate} • Qty: ${volume}`,
        endElement: {
            type: "Text",
            content: [`$${price.real.toFixed(2)}`]
        }
    });
    // Optional media
    if (mediaComponent) {
        cardChildren.push(mediaComponent);
    }
    // Main content: data list of stocks
    cardChildren.push({
        type: "CardContent",
        childrenProps: dataList
    });
    // Footer: categories and tags
    cardChildren.push({
        type: "CardFooter",
        childrenProps: [categoryChipGroup, tagChipGroup]
    });
    // Return as a responsive vertical card
    return {
        type: "VerticalCard",
        childrenProps: cardChildren
    };
}
//# sourceMappingURL=73.js.map