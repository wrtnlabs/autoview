export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there is no webhook data, show a simple markdown message
    if (!input.webhook) {
        return {
            type: "Markdown",
            content: "## No webhook data available",
        };
    }
    const w = input.webhook;
    // Card header: show the webhook name and URL with a link icon
    const header = {
        type: "CardHeader",
        title: w.name,
        description: w.url,
        startElement: {
            type: "Icon",
            id: "link", // FontAwesome "link" icon
            size: 20,
            color: "blue",
        },
    };
    // Build a data list of key/value pairs for webhook properties
    const dataItems = [];
    // Helper to push a text-based list item if value is defined
    const pushTextItem = (label, value) => {
        if (value !== undefined && value !== null) {
            dataItems.push({
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: label,
                    variant: "subtitle2",
                    color: "tertiary",
                },
                value: {
                    type: "Text",
                    content: String(value),
                    variant: "body2",
                },
            });
        }
    };
    pushTextItem("ID", w.id);
    pushTextItem("Channel ID", w.channelId);
    pushTextItem("API Version", w.apiVersion);
    // Timestamps: format to human‐readable
    if (w.createdAt !== undefined) {
        dataItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Created At",
                variant: "subtitle2",
                color: "tertiary",
            },
            value: {
                type: "Text",
                content: new Date(w.createdAt).toLocaleString(),
                variant: "body2",
            },
        });
    }
    if (w.lastBlockedAt !== undefined) {
        dataItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Last Blocked At",
                variant: "subtitle2",
                color: "tertiary",
            },
            value: {
                type: "Text",
                content: new Date(w.lastBlockedAt).toLocaleString(),
                variant: "body2",
            },
        });
    }
    // Keywords: show as a group of chips
    if (Array.isArray(w.keywords) && w.keywords.length > 0) {
        dataItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Keywords",
                variant: "subtitle2",
                color: "tertiary",
            },
            value: {
                type: "ChipGroup",
                childrenProps: w.keywords.map((kw) => ({
                    type: "Chip",
                    label: kw,
                    size: "small",
                    variant: "outlined",
                })),
            },
        });
    }
    // Token: hide or mask if very long
    if (w.token) {
        const masked = w.token.length > 8
            ? w.token.slice(0, 4) + "…" + w.token.slice(-4)
            : w.token;
        dataItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Token",
                variant: "subtitle2",
                color: "tertiary",
            },
            value: {
                type: "Text",
                content: masked,
                variant: "body2",
            },
        });
    }
    // Assemble the data list component
    const dataList = {
        type: "DataList",
        childrenProps: dataItems,
    };
    // Footer: represent boolean flags as colored chips
    const flagChips = [];
    if (w.watchUserChats !== undefined) {
        flagChips.push({
            type: "Chip",
            label: "User Chats",
            color: w.watchUserChats ? "success" : "gray",
            size: "small",
            variant: "filled",
        });
    }
    if (w.watchGroups !== undefined) {
        flagChips.push({
            type: "Chip",
            label: "Groups",
            color: w.watchGroups ? "success" : "gray",
            size: "small",
            variant: "filled",
        });
    }
    if (w.blocked !== undefined) {
        flagChips.push({
            type: "Chip",
            label: w.blocked ? "Blocked" : "Active",
            color: w.blocked ? "error" : "success",
            size: "small",
            variant: "filled",
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "ChipGroup",
            childrenProps: flagChips,
        },
    };
    // Wrap everything in a responsive vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: dataList,
            },
            footer,
        ],
    };
    return card;
}
//# sourceMappingURL=218.js.map