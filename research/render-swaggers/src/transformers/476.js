export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // If there is no data, render a simple markdown message
    if (input == null) {
        return {
            type: "Markdown",
            content: "**No issue type data provided**",
        };
    }
    // Prepare the avatar: use the first letter of the name, fallback to gray
    const avatarVariant = ((_a = input.color) !== null && _a !== void 0 ? _a : "gray");
    const avatarName = (_c = (_b = input.name) === null || _b === void 0 ? void 0 : _b.charAt(0).toUpperCase()) !== null && _c !== void 0 ? _c : "?";
    // Format dates with a fallback
    const createdDate = input.created_at
        ? new Date(input.created_at).toLocaleDateString()
        : "N/A";
    const updatedDate = input.updated_at
        ? new Date(input.updated_at).toLocaleDateString()
        : "N/A";
    // Map the schema color to a chip-friendly color (palette difference: "purple" → "violet")
    const chipColor = (input.color === "purple" ? "violet" : input.color);
    // Header: show name, numeric ID, avatar, and an enabled/disabled badge
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        startElement: {
            type: "Avatar",
            name: avatarName,
            variant: avatarVariant,
            size: 40,
        },
        endElement: {
            type: "Chip",
            label: input.is_enabled ? "Enabled" : "Disabled",
            color: input.is_enabled ? "success" : "error",
            size: "small",
            variant: "filled",
        },
    };
    // Build a small data‐list of metadata: node_id, created, updated, color
    const dataListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Node ID" },
            value: { type: "Text", content: input.node_id },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At" },
            value: { type: "Text", content: createdDate },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated At" },
            value: { type: "Text", content: updatedDate },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Color" },
            value: {
                type: "Chip",
                label: (_d = input.color) !== null && _d !== void 0 ? _d : "N/A",
                color: chipColor,
                size: "small",
                variant: input.color ? "filled" : "outlined",
            },
        },
    ];
    // Wrap the list in a CardContent block
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems,
        },
    };
    // Compose a vertical card with header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=476.js.map