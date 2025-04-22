export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const webhook = input.webhook;
    // If there's no webhook, render a markdown notice.
    if (!webhook) {
        return {
            type: "Markdown",
            content: "### No webhook data available.\n\nPlease configure a webhook to see its details."
        };
    }
    // Helper: format timestamp or fallback to "N/A"
    const formatDate = (ms) => ms ? new Date(ms).toLocaleString() : "N/A";
    // Helper: mask a token for privacy, show first 4 & last 4 chars
    const maskToken = (token) => {
        if (!token)
            return "N/A";
        const len = token.length;
        if (len <= 8)
            return token;
        return `${token.slice(0, 4)}…${token.slice(-4)}`;
    };
    // Build chips for scopes
    const scopeChips = webhook.scopes.map((scope) => ({
        type: "Chip",
        label: scope,
        size: "small",
        variant: "outlined",
        color: "blue"
    }));
    // Build chips for keywords if present
    const keywordChips = (webhook.keywords || []).map((kw) => ({
        type: "Chip",
        label: kw,
        size: "small",
        variant: "outlined",
        color: "teal"
    }));
    // Badge indicating blocked state
    const blockedBadge = {
        type: "Badge",
        childrenProps: {
            type: "Icon",
            id: webhook.blocked ? "ban" : "check",
            size: 16,
            color: webhook.blocked ? "red" : "green"
        },
        // Use a dot badge to draw attention
        dot: true,
        // Semantic color for badge background
        color: webhook.blocked ? "error" : "success",
        showZero: true
    };
    // Compose data list items for each field
    const dataListItems = [
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "URL",
                    variant: "subtitle2",
                    color: "secondary"
                }
            ],
            value: {
                type: "Button",
                label: "Open",
                href: webhook.url,
                variant: "text",
                color: "info",
                size: "small"
            }
        },
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Token",
                    variant: "subtitle2",
                    color: "secondary"
                }
            ],
            value: {
                type: "Text",
                content: maskToken(webhook.token),
                variant: "body2",
                color: "gray"
            }
        },
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Created At",
                    variant: "subtitle2",
                    color: "secondary"
                }
            ],
            value: {
                type: "Text",
                content: formatDate(webhook.createdAt),
                variant: "body2",
                color: "gray"
            }
        },
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "API Version",
                    variant: "subtitle2",
                    color: "secondary"
                }
            ],
            value: {
                type: "Text",
                content: webhook.apiVersion,
                variant: "body2",
                color: "gray"
            }
        },
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Scopes",
                    variant: "subtitle2",
                    color: "secondary"
                }
            ],
            value: {
                type: "ChipGroup",
                childrenProps: scopeChips,
                maxItems: 5
            }
        }
    ];
    // If there are keywords, append them
    if (keywordChips.length > 0) {
        dataListItems.push({
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Keywords",
                    variant: "subtitle2",
                    color: "secondary"
                }
            ],
            value: {
                type: "ChipGroup",
                childrenProps: keywordChips,
                maxItems: 10
            }
        });
    }
    // If webhook has been blocked before, show last blocked timestamp
    if (webhook.lastBlockedAt) {
        dataListItems.push({
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Last Blocked At",
                    variant: "subtitle2",
                    color: "secondary"
                }
            ],
            value: {
                type: "Text",
                content: formatDate(webhook.lastBlockedAt),
                variant: "body2",
                color: "gray"
            }
        });
    }
    // Assemble the DataList
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems
    };
    // Build the card header with an icon and blocked badge
    const cardHeader = {
        type: "CardHeader",
        title: webhook.name,
        description: webhook.channelId
            ? `Channel: ${webhook.channelId}`
            : undefined,
        startElement: {
            type: "Icon",
            id: "link",
            size: 24,
            color: "blue"
        },
        endElement: blockedBadge
    };
    // Card content holds the data list
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Card footer with a primary action button
    const cardFooter = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "Visit Webhook",
            href: webhook.url,
            variant: "contained",
            color: "primary",
            size: "medium"
        }
    };
    // Return a vertical card assembling header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter]
    };
}
//# sourceMappingURL=279.js.map