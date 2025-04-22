export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    const { user, role_name, permission } = input;
    // If user data is missing, show a simple markdown notice
    if (!user) {
        return {
            type: "Markdown",
            content: "### Unknown Collaborator\nUser data is unavailable."
        };
    }
    // Card header: show avatar, login, and real name
    const header = {
        type: "CardHeader",
        title: user.login,
        description: (_a = user.name) !== null && _a !== void 0 ? _a : undefined,
        startElement: {
            type: "Avatar",
            // use the avatar_url for the image
            src: user.avatar_url,
            // fallback name display
            name: user.login,
            size: 40,
            variant: "primary"
        }
    };
    // Data list showing key properties
    const dataList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: { type: "Text", content: "ID" },
                value: { type: "Text", content: String(user.id) }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Email" },
                // if email is null or undefined, show 'N/A'
                value: { type: "Text", content: (_b = user.email) !== null && _b !== void 0 ? _b : "N/A" }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Role" },
                // visualize role with a filled chip
                value: {
                    type: "Chip",
                    label: role_name,
                    variant: "filled",
                    color: "info",
                    size: "small"
                }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Permission" },
                // show permission in an outlined chip
                value: {
                    type: "Chip",
                    label: permission,
                    variant: "outlined",
                    color: "success",
                    size: "small"
                }
            }
        ]
    };
    // Card content wraps the data list
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Compose a vertical card with header and content for a clean, responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=697.js.map