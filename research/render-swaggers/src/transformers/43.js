export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: safely format ISO date strings to localized date.
    const formatDate = (iso) => {
        const d = new Date(iso);
        return isNaN(d.getTime()) ? iso : d.toLocaleDateString();
    };
    const { pagination, data: channels } = input;
    // Map each channel record to a DataListItemProps for visual listing.
    const items = channels.map((channel) => ({
        type: "DataListItem",
        // Icon at the start to represent a shopping channel
        startElement: {
            type: "Icon",
            id: "store", // using the "store" icon
            color: "blue",
            size: 24,
        },
        // Use the channel name as primary label
        label: {
            type: "Text",
            variant: "subtitle1",
            content: channel.name,
        },
        // Display the channel code as a colored chip
        value: {
            type: "Chip",
            label: channel.code,
            variant: "outlined",
            color: "primary",
        },
        // Show creation date as a caption on the right
        endElement: {
            type: "Text",
            variant: "caption",
            content: formatDate(channel.created_at),
        },
    }));
    // Build the data list or a fallback markdown if no channels exist
    const listOrEmpty = items.length > 0
        ? {
            type: "DataList",
            childrenProps: items,
        }
        : {
            type: "Markdown",
            content: "### No shopping channels available.",
        };
    // Compose pagination chips for the footer
    const paginationChips = [
        {
            type: "Chip",
            label: `Page ${pagination.current}/${pagination.pages}`,
            variant: "filled",
            color: "primary",
        },
        {
            type: "Chip",
            label: `Total records: ${pagination.records}`,
            variant: "outlined",
            color: "secondary",
        },
    ];
    // Assemble the vertical card with header, content (list or markdown), and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Shopping Channels",
                description: `Displaying ${channels.length} channel(s)`,
                startElement: {
                    type: "Icon",
                    id: "store",
                    color: "teal",
                    size: 32,
                },
            },
            {
                type: "CardContent",
                // We can pass either a DataListProps or a MarkdownProps here
                childrenProps: listOrEmpty,
            },
            {
                type: "CardFooter",
                // Wrap pagination chips in a ChipGroup for compact display
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: paginationChips,
                    maxItems: 2,
                },
            },
        ],
    };
}
//# sourceMappingURL=43.js.map