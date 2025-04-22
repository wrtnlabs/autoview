export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Helper to format date-times into a concise local string
    const formatDate = (dt) => {
        if (!dt)
            return undefined;
        const d = new Date(dt);
        return isNaN(d.getTime()) ? dt : d.toLocaleString();
    };
    // Build a list of key-value items summarizing the gist
    const dataItems = [];
    // Owner: show avatar and login
    if (input.owner) {
        dataItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Owner",
                variant: "subtitle2"
            },
            value: {
                type: "Avatar",
                // AvatarProps.src expects a URI-format string
                src: input.owner.avatar_url,
                name: input.owner.login,
                variant: "info",
                size: 32
            }
        });
    }
    // Files count
    const fileCount = input.files ? Object.keys(input.files).reduce((count, key) => {
        return input.files[key] ? count + 1 : count;
    }, 0) : 0;
    dataItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Files",
            variant: "subtitle2"
        },
        value: {
            type: "Chip",
            label: String(fileCount),
            startElement: {
                type: "Icon",
                id: "file",
                color: "teal",
                size: 16
            },
            variant: "outlined",
            size: "small"
        }
    });
    // Forks count
    const forksCount = Array.isArray(input.forks) ? input.forks.length : 0;
    dataItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Forks",
            variant: "subtitle2"
        },
        value: {
            type: "Chip",
            label: String(forksCount),
            startElement: {
                type: "Icon",
                id: "code-branch",
                color: "green",
                size: 16
            },
            variant: "outlined",
            size: "small"
        }
    });
    // Comments count
    if (typeof input.comments === "number") {
        dataItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Comments",
                variant: "subtitle2"
            },
            value: {
                type: "Chip",
                label: String(input.comments),
                startElement: {
                    type: "Icon",
                    id: "comments",
                    color: "blue",
                    size: 16
                },
                variant: "outlined",
                size: "small"
            }
        });
    }
    // Created and updated timestamps
    const created = formatDate(input.created_at);
    if (created) {
        dataItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Created At",
                variant: "subtitle2"
            },
            value: {
                type: "Text",
                content: created,
                variant: "body2",
                color: "gray"
            }
        });
    }
    const updated = formatDate(input.updated_at);
    if (updated) {
        dataItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Updated At",
                variant: "subtitle2"
            },
            value: {
                type: "Text",
                content: updated,
                variant: "body2",
                color: "gray"
            }
        });
    }
    // Assemble the DataList inside a CardContent
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataItems
        }
    };
    // Build the card header with title, description and an optional avatar
    const header = {
        type: "CardHeader",
        title: (_a = input.id) !== null && _a !== void 0 ? _a : "Gist",
        description: (_b = input.description) !== null && _b !== void 0 ? _b : undefined,
        startElement: input.owner
            ? {
                type: "Avatar",
                src: input.owner.avatar_url,
                name: input.owner.login,
                variant: "primary",
                size: 40
            }
            : undefined
    };
    // Final VerticalCard wrapping header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=342.js.map