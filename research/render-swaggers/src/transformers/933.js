export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Convert ISO timestamps to locale strings for human-friendly display.
    const createdAt = new Date(input.created_at).toLocaleString();
    const updatedAt = new Date(input.updated_at).toLocaleString();
    // Map visibility values to chip colors for quick visual distinction.
    const visibilityColorMap = {
        all: "primary",
        private: "error",
        selected: "warning",
    };
    const chipColor = (_a = visibilityColorMap[input.visibility]) !== null && _a !== void 0 ? _a : "gray";
    // Compose the VerticalCard with header, content (data list), and footer (action button).
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header shows the secret name, an icon, and a visibility chip.
                type: "CardHeader",
                title: input.name,
                description: "Codespaces Secret",
                startElement: {
                    type: "Icon",
                    id: "lock", // lock icon to represent a secret
                    size: 24,
                    color: "gray",
                },
                endElement: {
                    type: "Chip",
                    label: input.visibility,
                    variant: "outlined",
                    color: chipColor,
                },
            },
            {
                // Card content contains a DataList of created/updated dates.
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: [
                        {
                            type: "DataListItem",
                            // Use array of components for label: calendar icon + text
                            label: [
                                {
                                    type: "Icon",
                                    id: "calendar-plus",
                                    size: 20,
                                    color: "gray",
                                },
                                {
                                    type: "Text",
                                    content: "Created At",
                                    variant: "body2",
                                    color: "gray",
                                },
                            ],
                            value: {
                                type: "Text",
                                content: createdAt,
                                variant: "body1",
                            },
                        },
                        {
                            type: "DataListItem",
                            label: [
                                {
                                    type: "Icon",
                                    id: "calendar-check",
                                    size: 20,
                                    color: "gray",
                                },
                                {
                                    type: "Text",
                                    content: "Updated At",
                                    variant: "body2",
                                    color: "gray",
                                },
                            ],
                            value: {
                                type: "Text",
                                content: updatedAt,
                                variant: "body1",
                            },
                        },
                    ],
                },
            },
            {
                // Card footer provides a button linking to the repositories URL.
                type: "CardFooter",
                childrenProps: {
                    type: "Button",
                    label: "View Repositories",
                    startElement: {
                        type: "Icon",
                        id: "link",
                        size: 16,
                        color: "blue",
                    },
                    href: input.selected_repositories_url,
                    variant: "text",
                    color: "primary",
                },
            },
        ],
    };
}
//# sourceMappingURL=933.js.map