export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no tag_protection entries, display a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### 📭 No tags to display\n\nThere are currently no tag protections defined."
        };
    }
    // Transform each Schema.tag_protection into a DataListItemProps
    const items = input.map((tag) => {
        // Format created/updated timestamps as human-readable strings
        // (Assumes ISO strings; adjust formatting as needed)
        const created = tag.created_at
            ? new Date(tag.created_at).toLocaleString()
            : "–";
        const updated = tag.updated_at
            ? new Date(tag.updated_at).toLocaleString()
            : "–";
        // Determine status chip
        const statusLabel = tag.enabled ? "Enabled" : "Disabled";
        const statusColor = tag.enabled ? "green" : "red";
        // Label area: pattern + status chip
        const labelComponents = [
            {
                type: "Text",
                variant: "body1",
                // Show the raw regex/pattern in monospaced font via markdown inside Text
                content: `\`${tag.pattern}\``
            },
            {
                type: "Chip",
                label: statusLabel,
                color: statusColor,
                size: "small",
                variant: "outlined"
            }
        ];
        // Value area: creation and update dates in markdown list
        const valueMarkdown = `- 🆕 Created: **${created}**\n- ♻️ Updated: **${updated}**`;
        const valueComponent = {
            type: "Markdown",
            content: valueMarkdown
        };
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponent
        };
    });
    // Compose the DataList to render all items
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    return dataList;
}
//# sourceMappingURL=889.js.map