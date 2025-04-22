export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    const webhook = input.webhook;
    // If no webhook data is provided, show a simple informative text
    if (!webhook) {
        return {
            type: "Text",
            content: "No webhook data available",
            variant: "body1",
            color: "tertiary",
        };
    }
    // Helper to format a timestamp (in ms) into a localized string or "-" if undefined
    const formatDate = (ts) => ts !== undefined ? new Date(ts).toLocaleString() : "-";
    // Helper to mask sensitive token, showing only last 4 chars if available
    const maskToken = (token) => {
        if (!token)
            return "-";
        const len = token.length;
        if (len <= 4)
            return "****";
        return "••••" + token.slice(len - 4);
    };
    // Prepare the list of key/value pairs for details
    const detailsItems = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Webhook ID",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: (_a = webhook.id) !== null && _a !== void 0 ? _a : "-",
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Channel",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: (_b = webhook.channelId) !== null && _b !== void 0 ? _b : "-",
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "URL",
                variant: "body2",
                color: "secondary",
            },
            // Provide a button that opens the URL in a new tab
            value: {
                type: "Button",
                variant: "text",
                size: "small",
                color: "primary",
                href: webhook.url,
                startElement: {
                    type: "Icon",
                    id: "link",
                    size: 16,
                    color: "cyan",
                },
                label: "Open",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Token",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: maskToken(webhook.token),
                variant: "body1",
                color: webhook.token ? "gray" : "disabled",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Created At",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: formatDate(webhook.createdAt),
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "API Version",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: webhook.apiVersion,
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Blocked",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: webhook.blocked ? "Yes" : "No",
                variant: "body1",
                color: webhook.blocked ? "error" : "success",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Last Blocked",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: formatDate(webhook.lastBlockedAt),
                variant: "body1",
            },
        },
    ];
    // Build a group of chips for each scope for a compact overview
    const scopeChips = webhook.scopes.map((scope) => ({
        type: "Chip",
        label: scope,
        size: "small",
        variant: "outlined",
        color: "primary",
    }));
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with an icon, title, and blocked status indicator
                type: "CardHeader",
                title: webhook.name,
                description: webhook.id ? `ID: ${webhook.id}` : undefined,
                startElement: {
                    type: "Icon",
                    id: "plug",
                    size: 32,
                    color: "blue",
                },
                endElement: webhook.blocked
                    ? {
                        type: "Icon",
                        id: "ban",
                        size: 24,
                        color: "red",
                    }
                    : undefined,
            },
            {
                // Main content displaying all details in a data list
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: detailsItems,
                },
            },
            {
                // Footer showing the scopes as a chip group
                type: "CardFooter",
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: scopeChips,
                    maxItems: 10, // avoid overflow on small screens
                },
            },
        ],
    };
}
//# sourceMappingURL=280.js.map