export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Extract organization data for reuse
    const org = input.organization;
    // Compose the card header: show team name, description, and org avatar
    const header = {
        type: "CardHeader",
        title: input.name,
        description: (_a = input.description) !== null && _a !== void 0 ? _a : "No description provided",
        startElement: {
            type: "Avatar",
            // Organization avatar as the leading image
            src: org.avatar_url,
            name: org.login,
            variant: "indigo",
            size: 40,
        },
    };
    // Utility to format ISO timestamps into a friendly date
    const formatDate = (iso) => new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    // Build a data list of key metrics and properties
    const listItems = [];
    // 1) Members count with an icon badge
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Members",
            variant: "body2",
            color: "primary",
        },
        value: {
            type: "Badge",
            count: input.members_count,
            maxCount: 999,
            color: "teal",
            childrenProps: {
                type: "Icon",
                id: "users",
                color: "teal",
                size: 16,
            },
        },
    });
    // 2) Repositories count
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Repositories",
            variant: "body2",
            color: "primary",
        },
        value: {
            type: "Badge",
            count: input.repos_count,
            maxCount: 999,
            color: "blue",
            childrenProps: {
                type: "Icon",
                id: "book",
                color: "blue",
                size: 16,
            },
        },
    });
    // 3) Permission as a colored chip
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Permission",
            variant: "body2",
            color: "primary",
        },
        value: {
            type: "Chip",
            label: input.permission,
            color: "success",
            size: "small",
            variant: "filled",
        },
    });
    // 4) Privacy setting (closed/secret) if present
    if (input.privacy) {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Privacy",
                variant: "body2",
                color: "primary",
            },
            value: {
                type: "Chip",
                label: input.privacy,
                color: input.privacy === "secret" ? "error" : "secondary",
                size: "small",
                variant: "outlined",
            },
        });
    }
    // 5) Creation and update timestamps using Markdown for emphasis
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Created",
            variant: "body2",
            color: "primary",
        },
        value: {
            type: "Markdown",
            content: `**${formatDate(input.created_at)}**`,
        },
    });
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Updated",
            variant: "body2",
            color: "primary",
        },
        value: {
            type: "Markdown",
            content: `**${formatDate(input.updated_at)}**`,
        },
    });
    // Wrap the list items into a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Compose the main card content
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Optionally, a footer could host links (e.g., to GitHub pages), but omitted for brevity
    // Return a vertical card combining header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=535.js.map