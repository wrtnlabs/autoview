export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { url, enabled } = input;
    // Compose a data list with two items: the repository URL and the enforcement status.
    const dataList = {
        type: "DataList",
        childrenProps: [
            // Item 1: Display the URL as a clickable text button
            {
                type: "DataListItem",
                label: {
                    type: "Text",
                    // Use body2 variant for compact labels; string is acceptable for content
                    variant: "body2",
                    content: "Repository URL",
                },
                value: {
                    type: "Button",
                    variant: "text",
                    color: "primary",
                    size: "small",
                    label: url,
                    href: url,
                },
            },
            // Item 2: Show whether admin enforcement is enabled or disabled via a colored chip
            {
                type: "DataListItem",
                label: {
                    type: "Text",
                    variant: "body2",
                    content: "Admin Enforced",
                },
                value: {
                    type: "Chip",
                    label: enabled ? "Enabled" : "Disabled",
                    // Green for enabled, gray for disabled
                    color: enabled ? "green" : "gray",
                    variant: "filled",
                    size: "small",
                    // Prepend a status icon to make it more visual
                    startElement: {
                        type: "Icon",
                        id: enabled ? "check-circle" : "times-circle",
                        color: enabled ? "green" : "gray",
                        size: 16,
                    },
                },
            },
        ],
    };
    // Use a vertical card to make the display responsive on mobile and desktop.
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with an icon to denote enforcement
            {
                type: "CardHeader",
                title: "Protected Branch Admin Enforcement",
                description: "Overview of repository protection settings",
                startElement: {
                    type: "Icon",
                    // A shield icon represents protection
                    id: "shield-alt",
                    color: "blue",
                    size: 28,
                },
            },
            // Card content wraps our data list
            {
                type: "CardContent",
                // Wrap dataList in an array to satisfy childrenProps array type
                childrenProps: [dataList],
            },
        ],
    };
}
//# sourceMappingURL=632.js.map