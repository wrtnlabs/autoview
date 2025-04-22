export function transform($input) {
    return visualizeData($input);
}
/**
 * Transforms a paginated list of shopping sale summaries into an AutoView List
 * with subheaders for pagination info and ListItems for each sale.
 */
function visualizeData(input) {
    const { pagination, data } = input;
    // Compose a Text component for pagination summary (e.g. "Page 1 of 10")
    const pageInfoText = {
        type: "Text",
        variant: "subtitle2",
        content: [`Page ${pagination.current} of ${pagination.pages}`],
    };
    // Compose a Text component for total records summary
    const totalInfoText = {
        type: "Text",
        variant: "subtitle2",
        content: [`${pagination.records} records total`],
    };
    // Map each sale summary to a ListItem component
    const listItems = data.map((sale) => {
        var _a, _b;
        // Use the first thumbnail as the start image, if available
        const thumbnailUrl = (_b = (_a = sale.content.thumbnails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url;
        const startImage = thumbnailUrl
            ? {
                type: "Image",
                src: thumbnailUrl,
                alt: sale.content.title,
            }
            : undefined;
        // Format price range as a simple string description
        const priceLow = sale.price_range.lowest.real.toFixed(2);
        const priceHigh = sale.price_range.highest.real.toFixed(2);
        const description = `$${priceLow} – $${priceHigh}`;
        // Build chips for section, latest flag, and any paused/suspended state
        const statusChips = [];
        // Section chip
        statusChips.push({
            type: "Chip",
            label: sale.section.name,
            color: "primary",
            size: "small",
        });
        // Latest snapshot indicator
        statusChips.push({
            type: "Chip",
            label: sale.latest ? "Latest" : "Outdated",
            color: sale.latest ? "success" : "gray",
            size: "small",
        });
        // Paused / Suspended indicators
        if (sale.paused_at) {
            statusChips.push({
                type: "Chip",
                label: "Paused",
                color: "warning",
                size: "small",
            });
        }
        if (sale.suspended_at) {
            statusChips.push({
                type: "Chip",
                label: "Suspended",
                color: "error",
                size: "small",
            });
        }
        return {
            type: "ListItem",
            // Use the sale title as the main text
            title: sale.content.title,
            // Show the price range underneath
            description,
            // Show the thumbnail image on the left if available
            startElement: startImage,
            // Display chips for status on the right
            endElement: statusChips,
        };
    });
    // Assemble the full List, including subheader items and sale entries
    const childrenProps = [
        {
            type: "ListSubheader",
            stickToTop: true,
            childrenProps: [pageInfoText],
        },
        ...listItems,
        {
            type: "ListSubheader",
            childrenProps: [totalInfoText],
        },
    ];
    // Return the List as the top-level component
    return {
        type: "List",
        childrenProps,
    };
}
//# sourceMappingURL=133.js.map