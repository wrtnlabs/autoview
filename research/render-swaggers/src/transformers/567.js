export function transform($input) {
    return visualizeData($input);
}
// Transforms a project_collaborator_permission into a visual component
function visualizeData(input) {
    var _a;
    // If the user object is null, render a markdown warning.
    if (!input.user) {
        return {
            type: "Markdown",
            content: "**No collaborator data available**\n\nUser information is missing."
        };
    }
    const user = input.user;
    // Avatar for the collaborator
    const avatar = {
        type: "Avatar",
        src: user.avatar_url,
        name: user.name || user.login,
        size: 40,
        variant: "gray"
    };
    // Chip to indicate permission level
    const permissionChip = {
        type: "Chip",
        label: input.permission,
        variant: "filled",
        color: "primary",
        size: "small"
    };
    // Button linking to the user's GitHub profile
    const profileButton = {
        type: "Button",
        variant: "text",
        color: "secondary",
        size: "small",
        href: user.html_url,
        startElement: {
            type: "Icon",
            id: "github",
            size: 16,
            color: "gray"
        },
        label: "View Profile"
    };
    // Assemble additional details into a data list
    const detailItems = [
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Login", variant: "body2" }],
            value: [{ type: "Text", content: user.login, variant: "body2" }]
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Email", variant: "body2" }],
            value: [{ type: "Text", content: (_a = user.email) !== null && _a !== void 0 ? _a : "N/A", variant: "body2" }]
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "User ID", variant: "body2" }],
            value: [{ type: "Text", content: String(user.id), variant: "body2" }]
        }
    ];
    // Compose a vertical card with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header: avatar + name + permission chip
                type: "CardHeader",
                title: user.name || user.login,
                description: `Collaborator`,
                startElement: avatar,
                endElement: permissionChip
            },
            {
                // Content: detailed data list
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: detailItems
                }
            },
            {
                // Footer: action button
                type: "CardFooter",
                childrenProps: profileButton
            }
        ]
    };
}
//# sourceMappingURL=567.js.map