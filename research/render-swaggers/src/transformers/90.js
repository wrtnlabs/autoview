export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each comment into a DataListItem for display
    const items = input.data.map((comment) => {
        // We assume snapshots are ordered by creation time; pick the latest one
        const snapshots = comment.snapshots;
        const latest = snapshots[snapshots.length - 1];
        // Label area: show when the comment and its latest snapshot were created
        const labelComponents = [
            // An icon to visually indicate a timestamp
            {
                type: "Icon",
                id: "calendar-alt",
                color: "gray",
                size: 16
            },
            // Text for the comment creation time
            {
                type: "Text",
                variant: "subtitle2",
                content: `Commented at ${new Date(comment.created_at).toLocaleString()}`
            },
            // Smaller caption for the snapshot time
            {
                type: "Text",
                variant: "caption",
                color: "gray",
                content: `Snapshot at ${new Date(latest.created_at).toLocaleString()}`
            }
        ];
        // Value area: render the body using the Markdown component for rich formatting
        const valueComponent = {
            type: "Markdown",
            content: latest.body
        };
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponent
        };
    });
    // Wrap all items in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Card header summarizing the comments section and pagination info
    const header = {
        type: "CardHeader",
        title: "Inquiry Comments",
        description: `Page ${input.pagination.current} / ${input.pagination.pages} · Total ${input.pagination.records}`,
        // Use a comments icon to make it more engaging
        startElement: {
            type: "Icon",
            id: "comments",
            color: "blue",
            size: 24
        }
    };
    // Card content containing the DataList
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Assemble everything into a vertical card for responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=90.js.map