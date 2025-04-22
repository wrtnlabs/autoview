export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Build a list of key-value pairs to display installation details
    const dataListItems = [];
    // Helper to push a simple text pair
    function pushTextItem(label, value) {
        dataListItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                content: [label],
            },
            value: {
                type: "Text",
                variant: "body2",
                content: [String(value)],
            },
        });
    }
    // Core fields
    pushTextItem("ID", input.id);
    pushTextItem("App ID", input.app_id);
    pushTextItem("App Slug", input.app_slug);
    pushTextItem("Account Type", input.target_type);
    pushTextItem("Repository Selection", input.repository_selection);
    pushTextItem("Events Count", input.events.length);
    pushTextItem("Created At", input.created_at);
    pushTextItem("Updated At", input.updated_at);
    // Permissions as JSON code block in markdown for readability
    dataListItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "subtitle2",
            content: ["Permissions"],
        },
        value: {
            type: "Markdown",
            content: "json\n" +
                JSON.stringify(input.permissions, null, 2) +
                "\n```",
        },
    });
    // If installation is suspended, show suspension details
    if (input.suspended_by) {
        dataListItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                content: ["Suspended By"],
            },
            value: {
                type: "AvatarGroup", // show avatar + name
                childrenProps: [
                    {
                        type: "Avatar",
                        src: input.suspended_by.avatar_url,
                        name: input.suspended_by.login,
                        variant: "error",
                        size: 32,
                    },
                ],
            },
        });
        if (input.suspended_at) {
            pushTextItem("Suspended At", input.suspended_at);
        }
    }
    // Compose the visual card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            // Card header with title, description, avatar or icon, and a selection chip
            {
                type: "CardHeader",
                title: `Installation #${input.id}`,
                description: input.html_url,
                startElement: input.suspended_by
                    ? {
                        type: "Avatar",
                        src: input.suspended_by.avatar_url,
                        name: input.suspended_by.login,
                        variant: "secondary",
                        size: 40,
                    }
                    : {
                        type: "Icon",
                        id: "user",
                        color: "gray",
                        size: 40,
                    },
                endElement: {
                    type: "Chip",
                    label: input.repository_selection.toUpperCase(),
                    color: input.repository_selection === "all" ? "success" : "warning",
                    size: "small",
                    variant: "outlined",
                },
            },
            // Card content: data list of details
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
            // Card footer: action buttons
            {
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Button",
                        label: "Open Installation",
                        href: input.html_url,
                        variant: "contained",
                        color: "primary",
                    },
                    {
                        type: "Button",
                        label: "View Repositories",
                        href: input.repositories_url,
                        variant: "outlined",
                        color: "secondary",
                    },
                ],
            },
        ],
    };
    return card;
}
//# sourceMappingURL=770.js.map