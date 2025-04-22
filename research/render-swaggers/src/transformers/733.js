export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input for easier access
    const { id, node_id: nodeId, name, type } = input;
    // Map policy type to an icon identifier and colors
    // 'code-branch' for branch, 'tag' for tag (FontAwesome kebab-case names)
    const iconId = type === "branch" ? "code-branch" : "tag";
    const iconColor = type === "branch" ? "green" : "blue";
    const chipColor = type === "branch" ? "success" : "info";
    // Helper to render a DataListItem for a key/value pair.
    const makeListItem = (labelText, valueComponent) => ({
        type: "DataListItem",
        label: { type: "Text", content: labelText },
        value: valueComponent,
    });
    // Compose DataList items dynamically, skipping undefined values
    const dataListItems = [
        makeListItem("Policy ID", {
            type: "Text",
            content: id != null ? id.toString() : "N/A",
        }),
        nodeId != null
            ? makeListItem("Node ID", { type: "Text", content: nodeId })
            : undefined,
        makeListItem("Policy Type", {
            type: "Chip",
            label: type !== null && type !== void 0 ? type : "unknown",
            // Use filled variant to stand out
            variant: "filled",
            color: chipColor,
            size: "medium",
        }),
    ].filter((item) => !!item);
    return {
        // Use a vertical card to stack header and details
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with an icon, title, and optional description
                type: "CardHeader",
                title: name !== null && name !== void 0 ? name : "Unnamed Policy",
                description: nodeId ? `Node: ${nodeId}` : undefined,
                startElement: {
                    type: "Icon",
                    id: iconId,
                    color: iconColor,
                    size: 24,
                },
            },
            {
                // Card content holds a DataList of key/value rows
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=733.js.map