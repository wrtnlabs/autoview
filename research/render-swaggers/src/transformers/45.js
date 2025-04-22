export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Recursive helper to transform hierarchical categories into a DataList
    function buildCategoryList(categories) {
        const items = categories.map((cat) => {
            // If this category has children, nest another DataList; otherwise show the category code
            const valueComponent = cat.children.length
                ? buildCategoryList(cat.children)
                : {
                    type: "Text",
                    variant: "caption",
                    content: cat.code,
                };
            return {
                type: "DataListItem",
                label: {
                    // Category name as the label
                    type: "Text",
                    variant: "body1",
                    content: cat.name,
                },
                value: valueComponent,
            };
        });
        return {
            type: "DataList",
            childrenProps: items,
        };
    }
    const { pagination, data: channels } = input;
    // Build DataListItems for each shopping channel
    const channelItems = channels.map((channel) => ({
        type: "DataListItem",
        label: {
            // Channel name in a larger heading style
            type: "Text",
            variant: "h6",
            content: channel.name,
        },
        value: buildCategoryList(channel.categories),
    }));
    // If there are no channels, show a friendly message
    const channelListComponent = channelItems.length > 0
        ? { type: "DataList", childrenProps: channelItems }
        : {
            type: "Text",
            variant: "body1",
            content: "No shopping channels available.",
        };
    // Markdown block summarizing pagination info
    const paginationSummary = {
        type: "Markdown",
        content: `**Page**: ${pagination.current} / ${pagination.pages}\n\n` +
            `**Limit per page**: ${pagination.limit}\n\n` +
            `**Total records**: ${pagination.records}`,
    };
    // Card header with an icon and summary
    const header = {
        type: "CardHeader",
        title: "Shopping Channels Overview",
        description: `${channels.length} channel${channels.length === 1 ? "" : "s"}`,
        startElement: {
            type: "Icon",
            id: "layer-group", // FontAwesome icon: layers of channels
            color: "blue",
            size: 24,
        },
    };
    // Compose final VerticalCard with header, pagination, and channel list
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: [paginationSummary],
            },
            {
                type: "CardContent",
                childrenProps: [channelListComponent],
            },
        ],
    };
}
//# sourceMappingURL=45.js.map