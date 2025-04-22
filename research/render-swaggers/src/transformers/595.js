export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { total_count, labels } = input;
    // If there are no labels, render a simple markdown message.
    if (!labels || labels.length === 0) {
        return {
            type: "Markdown",
            content: [
                "### 🏷 Runner Labels",
                "",
                `No labels found. Total count: **${total_count}**.`
            ].join("\n")
        };
    }
    // Transform each runner_label into a DataListItem with a name and a Chip indicating its type.
    const items = labels.map((label) => {
        // Choose chip color based on label type
        const chipColor = label.type === "read-only" ? "gray" : "blue";
        // Capitalize for display
        const chipLabel = label.type === "read-only" ? "Read‑only" : "Custom";
        return {
            type: "DataListItem",
            // The name of the label, rendered as body1 text
            label: {
                type: "Text",
                content: label.name,
                variant: "body1"
            },
            // Render label type as a Chip
            value: {
                type: "Chip",
                label: chipLabel,
                variant: "outlined",
                color: chipColor,
                size: "small"
            }
        };
    });
    // Wrap the items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Compose a vertical card summarizing total and listing each label
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // Title and summary with an icon
                title: "Runner Labels",
                description: `Total: ${total_count}`,
                startElement: {
                    type: "Icon",
                    id: "tags", // FontAwesome "tags" icon
                    color: "blue",
                    size: 24
                }
            },
            {
                type: "CardContent",
                childrenProps: dataList
            }
        ]
    };
}
//# sourceMappingURL=595.js.map