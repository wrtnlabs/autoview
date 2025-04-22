export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { pagination, data } = input;
    // 1. Create a sticky subheader showing current page info.
    const pageInfoText = {
        type: "Text",
        variant: "subtitle1",
        // Display "Page X of Y (Z records)"
        content: `Page ${pagination.current} of ${pagination.pages} (${pagination.records} records)`,
    };
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: [pageInfoText],
    };
    // 2. Map each sale summary into a ListItem component.
    const listItems = data.map((sale) => {
        var _a;
        // Determine thumbnail; fallback to an icon if none.
        const firstThumb = (_a = sale.content.thumbnails) === null || _a === void 0 ? void 0 : _a[0];
        const startElement = firstThumb
            ? {
                type: "Image",
                src: firstThumb.url,
                alt: sale.content.title,
            }
            : {
                type: "Icon",
                id: "image",
                color: "gray",
                size: 40,
            };
        // Convert each category into a small outlined chip.
        const categoryChips = sale.categories.map((cat) => ({
            type: "Chip",
            label: cat.name,
            size: "small",
            variant: "outlined",
        }));
        // Price range text; e.g. "1000 - 2000"
        const priceRangeText = `${sale.price_range.lowest.real} - ${sale.price_range.highest.real}`;
        return {
            type: "ListItem",
            // Title is the sale's main title.
            title: sale.content.title,
            // Show the numeric price range under the title.
            description: priceRangeText,
            startElement,
            // Show category chips at the end; omit if none.
            endElement: categoryChips.length > 0 ? categoryChips : undefined,
            // Link to a detail page (modify URL structure as needed).
            href: `/sales/${sale.id}`,
        };
    });
    // 3. Compose the overall List component.
    return {
        type: "List",
        // First the page-info subheader, then each sale item.
        childrenProps: [subheader, ...listItems],
    };
}
//# sourceMappingURL=87.js.map