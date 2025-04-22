export function transform($input) {
    return visualizeData($input);
}
// Function to transform a deployment branch policy into a rich UI representation
function visualizeData(input) {
    var _a, _b, _c;
    // Pick icon and color based on whether it is a branch or tag policy
    const isBranch = input.type === "branch";
    const iconId = isBranch ? "code-branch" : "tag";
    const themeColor = (isBranch ? "green" : "blue");
    // Helper to create a simple text component
    const createText = (text, variant = "body2") => ({
        type: "Text",
        content: text,
        variant,
    });
    // A small chip to show the policy type with a distinct color
    const typeChip = {
        type: "Chip",
        label: (_a = input.type) !== null && _a !== void 0 ? _a : "-",
        variant: "outlined",
        size: "small",
        color: themeColor,
    };
    // Build the rows: Policy ID, Node ID, and Type
    const rows = [
        {
            type: "DataListItem",
            label: createText("Policy ID", "subtitle2"),
            value: createText(input.id != null ? String(input.id) : "-", "body1"),
        },
        {
            type: "DataListItem",
            label: createText("Node ID", "subtitle2"),
            value: createText((_b = input.node_id) !== null && _b !== void 0 ? _b : "-", "body1"),
        },
        {
            type: "DataListItem",
            label: createText("Type", "subtitle2"),
            value: typeChip,
        },
    ];
    // The DataList component wraps those rows
    const dataList = {
        type: "DataList",
        childrenProps: rows,
    };
    // Compose a vertical card with a header (icon + title) and content (the list)
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // Show the policy name or a fallback
                title: (_c = input.name) !== null && _c !== void 0 ? _c : "Unnamed Policy",
                // If node_id is present, repeat it in the header description for quick glance
                description: input.node_id ? `Node ID: ${input.node_id}` : undefined,
                // Leading icon visualizes branch vs. tag
                startElement: {
                    type: "Icon",
                    id: iconId,
                    color: themeColor,
                    size: 24,
                },
            },
            {
                type: "CardContent",
                // Embed the data list inside the card content
                childrenProps: [dataList],
            },
        ],
    };
    return card;
}
//# sourceMappingURL=735.js.map