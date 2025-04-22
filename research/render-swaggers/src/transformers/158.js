export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { pagination, data } = input;
    // Edge case: no records to display
    if (!data || data.length === 0) {
        return {
            type: "Markdown",
            content: "### No stock supplementation records found\n\nThere are no records to display at this time."
        };
    }
    // Map each supplement record into a DataListItemProps
    const listItems = data.map((record) => ({
        type: "DataListItem",
        // Use an icon + timestamp as the label for readability
        label: [
            {
                type: "Icon",
                id: "calendar",
                size: 16,
                color: "blue"
            },
            {
                type: "Text",
                variant: "body2",
                color: "gray",
                content: record.created_at
            }
        ],
        // Render the supplemented quantity as a colored chip
        value: {
            type: "Chip",
            label: record.value.toString(),
            color: "success",
            size: "small",
            variant: "filled"
        }
    }));
    // Assemble the overall UI as a responsive vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with title, page info, and an illustrative icon
                type: "CardHeader",
                title: "Stock Supplementation History",
                description: `Page ${pagination.current} of ${pagination.pages}`,
                startElement: {
                    type: "Icon",
                    id: "history",
                    size: 20,
                    color: "teal"
                }
            },
            {
                // Main content: list of supplementation events
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: listItems
                }
            },
            {
                // Footer summarizing total record count
                type: "CardFooter",
                childrenProps: {
                    type: "Text",
                    variant: "caption",
                    content: `Total records: ${pagination.records}`
                }
            }
        ]
    };
}
//# sourceMappingURL=158.js.map