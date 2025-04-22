export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: safely extract avatar_url and login from account if present
    const hasAccount = input.account !== null &&
        typeof input.account === "object" &&
        "avatar_url" in input.account &&
        "login" in input.account;
    // Build the CardHeader: shows installation ID, repo selection, and account avatar if available
    const header = {
        type: "CardHeader",
        title: `Installation #${input.id}`,
        description: `Repository selection: ${input.repository_selection}`,
        startElement: hasAccount
            ? {
                type: "Avatar",
                src: input.account.avatar_url,
                name: input.account.login,
            }
            : undefined,
    };
    // Count the number of permission keys granted
    const permissionCount = input.permissions
        ? Object.keys(input.permissions).length
        : 0;
    // Build the events chip group
    const eventsChipGroup = {
        type: "ChipGroup",
        maxItems: input.events.length,
        childrenProps: input.events.map((evt) => ({
            type: "Chip",
            label: evt,
            variant: "outlined",
        })),
    };
    // Build the data list items for key-value pairs
    const dataListItems = [
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "App ID" }],
            value: [{ type: "Text", content: input.app_id.toString() }],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "App Slug" }],
            value: [{ type: "Text", content: input.app_slug }],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Target ID" }],
            value: [{ type: "Text", content: input.target_id.toString() }],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Permissions" }],
            value: {
                // Badge with a key icon showing how many permission entries exist
                type: "Badge",
                count: permissionCount,
                showZero: false,
                childrenProps: {
                    type: "Icon",
                    id: "key",
                    color: "teal",
                },
            },
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Events" }],
            value: eventsChipGroup,
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Created At" }],
            value: [
                {
                    type: "Text",
                    content: new Date(input.created_at).toLocaleString(),
                },
            ],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Updated At" }],
            value: [
                {
                    type: "Text",
                    content: new Date(input.updated_at).toLocaleString(),
                },
            ],
        },
    ];
    // Wrap the DataList in a CardContent for layout consistency
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems,
        },
    };
    // Build footer buttons for the primary URLs, each with an icon
    const footerButtons = [
        {
            type: "Button",
            label: "View on GitHub",
            href: input.html_url,
            startElement: { type: "Icon", id: "link", color: "blue" },
            variant: "text",
            color: "primary",
        },
        {
            type: "Button",
            label: "Repositories",
            href: input.repositories_url,
            startElement: { type: "Icon", id: "folder", color: "green" },
            variant: "text",
            color: "primary",
        },
        {
            type: "Button",
            label: "Access Tokens",
            href: input.access_tokens_url,
            startElement: { type: "Icon", id: "key", color: "orange" },
            variant: "text",
            color: "primary",
        },
    ];
    const footer = {
        type: "CardFooter",
        childrenProps: footerButtons,
    };
    // Assemble a responsive vertical card containing header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=996.js.map