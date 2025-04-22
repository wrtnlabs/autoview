export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a markdown message instead of an empty list
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No data available",
        };
    }
    // Map each record to a DataListItem with a badge showing the id
    const items = input.map((record) => {
        // Use a badge to visually represent the `id` and an icon as the badge's child
        const badge = {
            type: "Badge",
            count: record.id,
            maxCount: 999, // Allow up to 3-digit IDs before showing "..."
            showZero: true, // In case `id` is 0
            // A simple "hashtag" icon to convey that this is an identifier
            childrenProps: {
                type: "Icon",
                id: "hashtag",
                color: "blue",
                size: 20,
            },
        };
        // The list item itself: key as the title, badge in the startElement
        return {
            type: "DataListItem",
            title: record.key,
            startElement: badge,
        };
    });
    // Wrap all items into a DataList for a clean vertical layout
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=997.js.map