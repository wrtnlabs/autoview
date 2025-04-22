export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Destructure input fields for easier reference
    const { id, name, active, events, config, created_at, updated_at, url, test_url, ping_url, deliveries_url, last_response, } = input;
    // Helper to create a simple text component
    const makeText = (text) => ({
        type: "Text",
        content: text,
    });
    // Header icon representing a webhook (using RSS icon)
    const headerIcon = {
        type: "Icon",
        id: "rss",
        color: active ? "green" : "gray",
        size: 24,
    };
    // Status chip showing active/inactive
    const statusChip = {
        type: "Chip",
        label: active ? "Active" : "Inactive",
        color: active ? "green" : "gray",
        variant: "filled",
    };
    // Build event chips for each event type
    const eventChips = events.map((evt) => ({
        type: "Chip",
        label: evt,
        color: "info",
        size: "small",
        variant: "outlined",
    }));
    // Build configuration items as data-list entries, skipping undefined values.
    const configItems = [];
    if (config.url !== undefined) {
        configItems.push({
            type: "DataListItem",
            label: makeText("Config URL"),
            value: makeText(config.url),
        });
    }
    if (config.content_type !== undefined) {
        configItems.push({
            type: "DataListItem",
            label: makeText("Content Type"),
            value: makeText(config.content_type),
        });
    }
    if (config.secret !== undefined) {
        // Mask secret for security
        const masked = config.secret.replace(/./g, "•");
        configItems.push({
            type: "DataListItem",
            label: makeText("Secret"),
            value: makeText(masked),
        });
    }
    if (config.insecure_ssl !== undefined) {
        configItems.push({
            type: "DataListItem",
            label: makeText("Insecure SSL"),
            value: makeText(String(config.insecure_ssl)),
        });
    }
    // Build endpoints markdown list: primary, test, ping, and optional deliveries
    const endpointsMdLines = [`- [Primary URL](${url})`, `- [Test URL](${test_url})`, `- [Ping URL](${ping_url})`];
    if (deliveries_url) {
        endpointsMdLines.push(`- [Deliveries URL](${deliveries_url})`);
    }
    const endpointsMd = {
        type: "Markdown",
        content: endpointsMdLines.join("\n"),
    };
    // Last response info
    const responseText = `**Status**: ${(_a = last_response.status) !== null && _a !== void 0 ? _a : "N/A"}  
**Code**: ${last_response.code !== null ? last_response.code : "N/A"}  
**Message**: ${(_b = last_response.message) !== null && _b !== void 0 ? _b : "—"}`;
    // Assemble data list items
    const dataListItems = [
        {
            type: "DataListItem",
            label: makeText("Webhook ID"),
            value: makeText(`#${id}`),
        },
        {
            type: "DataListItem",
            label: makeText("Events"),
            // Use a chip group for events
            value: {
                type: "ChipGroup",
                childrenProps: eventChips,
            },
        },
        {
            type: "DataListItem",
            label: makeText("Endpoints"),
            value: endpointsMd,
        },
        {
            type: "DataListItem",
            label: makeText("Created At"),
            value: makeText(new Date(created_at).toLocaleString()),
        },
        {
            type: "DataListItem",
            label: makeText("Updated At"),
            value: makeText(new Date(updated_at).toLocaleString()),
        },
        // Spread the configuration items, if any
        ...configItems,
        {
            type: "DataListItem",
            label: makeText("Last Response"),
            value: {
                type: "Markdown",
                content: responseText,
            },
        },
    ];
    // Card header with icon and status chip
    const cardHeader = {
        type: "CardHeader",
        title: name,
        description: `Hook Type: ${input.type}`,
        startElement: headerIcon,
        endElement: statusChip,
    };
    // Card content wrapping the data list
    const cardContent = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems,
        },
    };
    // Return a vertical card containing header and content
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
}
//# sourceMappingURL=759.js.map