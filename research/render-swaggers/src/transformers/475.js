export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle the case when there's no data
    if (input === null) {
        return {
            type: "Markdown",
            content: "#### No issue type data provided."
        };
    }
    // Map backend color to Avatar variant (purple → violet)
    const colorMap = {
        gray: "gray",
        blue: "blue",
        green: "green",
        yellow: "yellow",
        orange: "orange",
        red: "red",
        pink: "pink",
        purple: "violet"
    };
    const avatarVariant = input.color ? (colorMap[input.color] || "gray") : "gray";
    // Create an avatar showing the issue type name (initials or full name as tooltip)
    const avatar = {
        type: "Avatar",
        name: input.name,
        variant: avatarVariant,
        size: 40
    };
    // Build a list of metadata entries
    const dataListChildren = [
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "ID" },
            value: { type: "Text", variant: "body2", content: String(input.id) }
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Node ID" },
            value: { type: "Text", variant: "body2", content: input.node_id }
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Created At" },
            value: { type: "Text", variant: "body2", content: input.created_at || "—" }
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Updated At" },
            value: { type: "Text", variant: "body2", content: input.updated_at || "—" }
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Enabled" },
            value: {
                type: "Chip",
                label: input.is_enabled ? "Yes" : "No",
                color: input.is_enabled ? "success" : "error",
                size: "small",
                variant: "filled"
            }
        }
    ];
    // Assemble the content: optional description + metadata list
    const contentChildren = [];
    if (input.description) {
        // Render description using markdown to preserve formatting
        contentChildren.push({
            type: "Markdown",
            content: `**Description**:\n\n${input.description}`
        });
    }
    contentChildren.push({
        type: "DataList",
        childrenProps: dataListChildren
    });
    // Compose a vertical card with a header and content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: input.name,
                description: input.description || undefined,
                startElement: avatar
            },
            {
                type: "CardContent",
                childrenProps: contentChildren
            }
        ]
    };
}
//# sourceMappingURL=475.js.map