export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { pagination, data } = input;
    // Helper to format a number into a dollar price string with two decimals.
    const formatPrice = (value) => {
        return `$${value.toFixed(2)}`;
    };
    // Build the header subcomponent that shows current page info.
    const header = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: [
            {
                type: "Text",
                // Using a concise page indicator for users.
                content: `Page ${pagination.current} of ${pagination.pages}`,
                variant: "subtitle1"
            }
        ]
    };
    // Convert each sale snapshot into a ListItem for display.
    const items = data.map((snapshot) => {
        const { content, price_range, categories } = snapshot;
        const lowest = price_range.lowest;
        const highest = price_range.highest;
        // Prepare image thumbnail if available.
        const firstThumb = Array.isArray(content.thumbnails) && content.thumbnails.length > 0
            ? content.thumbnails[0]
            : null;
        // Prepare up to three category chips, then a "+N" chip if more.
        const maxChips = 3;
        const chipProps = [];
        for (let i = 0; i < categories.length; i++) {
            if (i < maxChips) {
                chipProps.push({
                    type: "Chip",
                    label: categories[i].name,
                    variant: "outlined",
                    size: "small",
                    color: "primary"
                });
            }
            else {
                const remaining = categories.length - maxChips;
                chipProps.push({
                    type: "Chip",
                    label: `+${remaining}`,
                    variant: "outlined",
                    size: "small",
                    color: "gray"
                });
                break;
            }
        }
        return {
            type: "ListItem",
            // Title is the main sale title.
            title: content.title,
            // Description shows the real price range and nominal in parentheses.
            description: `${formatPrice(lowest.real)} - ${formatPrice(highest.real)} (nominal ${formatPrice(lowest.nominal)} - ${formatPrice(highest.nominal)})`,
            // Display the first thumbnail image as a preview.
            startElement: firstThumb
                ? {
                    type: "Image",
                    src: firstThumb.url,
                    alt: content.title
                }
                : undefined,
            // Render category chips on the right side.
            endElement: chipProps.length > 0 ? chipProps : undefined,
            // If the snapshot is the latest, show a badge on the left.
            href: undefined
        };
    });
    // Compose the final List component with header + items.
    const listProps = {
        type: "List",
        childrenProps: [header, ...items]
    };
    return listProps;
}
//# sourceMappingURL=105.js.map