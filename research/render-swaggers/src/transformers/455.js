export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare a list of DataListItem components based on available fields
    const items = [];
    // URL: render as a clickable button with the link
    if (input.url) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "URL", variant: "subtitle2" },
            value: {
                type: "Button",
                label: input.url,
                href: input.url,
                variant: "text",
                // Use a link icon at the end to indicate navigation
                endElement: { type: "Icon", id: "external-link-alt", color: "blue", size: 16 },
            },
        });
    }
    // Content-Type: show as a colored chip
    if (input.content_type) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Content Type", variant: "subtitle2" },
            value: {
                type: "Chip",
                label: input.content_type,
                color: "teal",
                variant: "filled",
            },
        });
    }
    // Secret: mask the secret for security
    if (input.secret) {
        // Mask up to 8 characters, then ellipsis if longer
        const maxMask = 8;
        const raw = input.secret;
        const masked = raw.length > maxMask
            ? "*".repeat(maxMask) + "..."
            : "*".repeat(raw.length);
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Secret", variant: "subtitle2" },
            value: {
                type: "Chip",
                label: masked,
                color: "gray",
                variant: "outlined",
                // Show a hidden/visibility-off icon
                startElement: { type: "Icon", id: "eye-slash", color: "gray", size: 16 },
            },
        });
    }
    // Insecure SSL: interpret "1" or 1 as enabled, otherwise disabled
    if (input.insecure_ssl !== undefined) {
        const flag = Number(input.insecure_ssl) === 1;
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Insecure SSL", variant: "subtitle2" },
            value: {
                type: "Chip",
                label: flag ? "Enabled" : "Disabled",
                color: flag ? "orange" : "green",
                variant: flag ? "filled" : "outlined",
                startElement: {
                    type: "Icon",
                    id: flag ? "exclamation-triangle" : "check-circle",
                    color: flag ? "orange" : "green",
                    size: 16,
                },
            },
        });
    }
    // If there are no items, show a markdown notice
    const contentComponent = items.length > 0
        ? // Use a DataList to display all configuration entries
            { type: "DataList", childrenProps: items }
        : // Fallback markdown message
            {
                type: "Markdown",
                content: "No configuration options provided. Please refer to the [documentation](https://docs.github.com/webhooks).",
            };
    // Compose a VerticalCard to hold the header and content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Webhook Configuration",
                description: input.url ? `Target: ${input.url}` : undefined,
                // Show a webhook icon on the header
                startElement: { type: "Icon", id: "rss", color: "blue", size: 24 },
            },
            // Wrap the DataList or Markdown inside CardContent
            {
                type: "CardContent",
                childrenProps: contentComponent,
            },
        ],
    };
}
//# sourceMappingURL=455.js.map