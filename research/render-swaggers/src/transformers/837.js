export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map pull request state to a chip color
    const stateColorMap = {
        open: "green",
        closed: "red",
    };
    const prStateColor = stateColorMap[input.state] || "gray";
    // Safely extract user info (might be null)
    const author = input.user;
    const avatarProps = {
        type: "Avatar",
        src: author === null || author === void 0 ? void 0 : author.avatar_url,
        name: (_a = author === null || author === void 0 ? void 0 : author.login) !== null && _a !== void 0 ? _a : "Unknown",
        size: 40,
        variant: "gray",
    };
    // Format dates into a more readable form
    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Build data list items for created and updated timestamps
    const dataListItems = [
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "calendar", size: 16, color: "gray" },
                { type: "Text", content: "Created", variant: "body2" }
            ],
            value: { type: "Text", content: formatDate(input.created_at), variant: "body2" }
        },
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "clock", size: 16, color: "gray" },
                { type: "Text", content: "Updated", variant: "body2" }
            ],
            value: { type: "Text", content: formatDate(input.updated_at), variant: "body2" }
        }
    ];
    // Compose the final vertical card with header, content (data list), and footer (action button)
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                startElement: avatarProps,
                title: input.title,
                description: `#${input.number} · ${input.state}`,
                endElement: {
                    type: "Chip",
                    label: input.state.toUpperCase(),
                    color: prStateColor,
                    variant: "filled",
                    size: "small"
                }
            },
            {
                type: "CardContent",
                // Wrap the data list inside the card content
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems
                }
            },
            {
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Button",
                        label: "View on GitHub",
                        href: input.html_url,
                        variant: "text",
                        color: "primary",
                        size: "medium"
                    }
                ]
            }
        ]
    };
}
//# sourceMappingURL=837.js.map