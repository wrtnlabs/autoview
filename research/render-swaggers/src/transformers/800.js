export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Compose an avatar showing the first letter of the label name,
    // using a distinct variant if this is a default label.
    const avatar = {
        type: "Avatar",
        name: input.name.charAt(0).toUpperCase(),
        variant: input.default ? "success" : "gray",
        size: 40,
    };
    // A simple text component for DataListItem labels/values.
    const makeText = (txt) => ({
        type: "Text",
        content: txt,
        variant: "body2",
    });
    // Build a list of key/value pairs to display core metadata.
    const dataListItems = [
        {
            type: "DataListItem",
            label: makeText("ID"),
            value: makeText(String(input.id)),
        },
        {
            type: "DataListItem",
            label: makeText("Node ID"),
            value: makeText(input.node_id),
        },
        {
            type: "DataListItem",
            label: makeText("Color"),
            // Use a Divider as a color swatch; setting its color to the label's hex.
            value: {
                type: "Divider",
                orientation: "horizontal",
                color: `#${input.color}`,
            },
        },
        {
            type: "DataListItem",
            label: makeText("Default"),
            // Show a small chip indicating default vs custom
            value: {
                type: "Chip",
                label: input.default ? "Yes" : "No",
                color: input.default ? "success" : "error",
                variant: "filled",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            label: makeText("URL"),
            // Render the URL as a text button for easy tapping on mobile
            value: {
                type: "Button",
                label: input.url,
                href: input.url,
                variant: "text",
                color: "primary",
                size: "small",
            },
        },
    ];
    // Wrap metadata in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // A footer chip showing the label description if present
    const footerChildren = input.description
        ? [
            {
                type: "Chip",
                label: input.description,
                color: "info",
                variant: "outlined",
                size: "small",
            },
        ]
        : [];
    // Assemble everything into a responsive vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with avatar, name and optional description
                type: "CardHeader",
                title: input.name,
                description: (_a = input.description) !== null && _a !== void 0 ? _a : undefined,
                startElement: avatar,
            },
            {
                // Main content with key/value listing
                type: "CardContent",
                childrenProps: dataList,
            },
            {
                // Footer with supplemental description chips
                type: "CardFooter",
                childrenProps: footerChildren,
            },
        ],
    };
}
//# sourceMappingURL=800.js.map