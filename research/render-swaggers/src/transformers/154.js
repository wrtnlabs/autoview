export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { data } = input;
    // If there's no sale data, show a friendly markdown message
    if (!Array.isArray(data) || data.length === 0) {
        return {
            type: "Markdown",
            content: "## No sales available\nThere are currently no sale snapshots to display."
        };
    }
    // Helper to format a price number into currency string
    const formatPrice = (value) => `$${value.toFixed(2)}`;
    // Build a list of sale items
    const listItems = data.map((item) => {
        var _a;
        // Use the first thumbnail as an image if present
        const firstThumbnail = (_a = item.content.thumbnails) === null || _a === void 0 ? void 0 : _a[0];
        const startElement = firstThumbnail
            ? {
                type: "Image",
                src: firstThumbnail.url,
                alt: item.content.title
            }
            : undefined;
        // Construct chips for search tags (limit to 3, then a "+N" chip)
        const tagChips = [];
        const MAX_TAG_CHIPS = 3;
        if (Array.isArray(item.tags) && item.tags.length > 0) {
            // If this snapshot is marked as latest, prepend a badge-like chip
            if (item.latest) {
                tagChips.push({
                    type: "Chip",
                    label: "Latest",
                    color: "primary",
                    size: "small",
                    variant: "filled"
                });
            }
            // Show up to MAX_TAG_CHIPS user-defined tags
            item.tags.slice(0, MAX_TAG_CHIPS).forEach((tag) => {
                tagChips.push({
                    type: "Chip",
                    label: tag,
                    size: "small",
                    variant: "outlined"
                });
            });
            const remaining = item.tags.length - MAX_TAG_CHIPS;
            if (remaining > 0) {
                tagChips.push({
                    type: "Chip",
                    label: `+${remaining}`,
                    size: "small",
                    variant: "outlined"
                });
            }
        }
        // Compose the price range for description
        const low = formatPrice(item.price_range.lowest.real);
        const high = formatPrice(item.price_range.highest.real);
        const priceDescription = `Price Range: ${low} - ${high}`;
        return {
            type: "ListItem",
            title: item.content.title,
            description: priceDescription,
            startElement,
            endElement: tagChips,
            // Optional: link to a detail page if your routing supports it.
            // href: `/sales/${item.id}`
        };
    });
    // Return the list component with all sale snapshots
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=154.js.map