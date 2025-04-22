export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { total_count, labels } = input;
    // Sort labels alphabetically to provide a consistent order
    const sortedLabels = [...labels].sort((a, b) => a.name.localeCompare(b.name));
    // Map each runner label into a DataListItem with an icon indicating its type
    const listItems = sortedLabels.map(label => {
        // Choose a lock icon for read-only labels, a tag icon for custom labels
        const iconProps = {
            type: "Icon",
            id: label.type === "read-only" ? "lock" : "tag",
            // Use a subdued gray for read-only, green for custom to highlight custom labels
            color: label.type === "read-only" ? "gray" : "green",
            size: 16
        };
        return {
            type: "DataListItem",
            // The main label text
            title: label.name,
            // A subtitle describing label type
            description: label.type === "read-only" ? "Read‑only label" : "Custom label",
            // Icon prepended to each list item for quick visual parsing
            startElement: iconProps
        };
    });
    // Compose the data list component
    const dataList = {
        type: "DataList",
        childrenProps: listItems
    };
    // Build a vertical card containing a header and the data list
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Runner Labels",
                description: `Total labels: ${total_count}`,
                // An icon in the header to give visual context
                startElement: {
                    type: "Icon",
                    id: "tag",
                    color: "blue",
                    size: 20
                }
            },
            {
                type: "CardContent",
                // Embed the DataList inside the card content
                childrenProps: dataList
            }
        ]
    };
}
//# sourceMappingURL=596.js.map