export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper to create a simple text component
    const mkText = (content, variant = "body2") => ({
        type: "Text",
        content,
        variant,
    });
    // Helper to create a chip for highlighting statuses
    const mkChip = (label, color = "primary", variant = "filled", size = "small") => ({
        type: "Chip",
        label,
        color,
        variant,
        size,
    });
    // Format date-time strings to readable form
    const formatDate = (iso) => {
        if (!iso)
            return "—";
        const d = new Date(iso);
        return isNaN(d.getTime()) ? iso : d.toLocaleString();
    };
    // Build key/value pairs for the main fields (excluding payloads)
    const items = [
        {
            type: "DataListItem",
            label: mkText("ID"),
            value: mkText(String(input.id)),
        },
        {
            type: "DataListItem",
            label: mkText("Event"),
            value: mkText(input.event),
        },
        {
            type: "DataListItem",
            label: mkText("Status"),
            value: mkText(`${input.status} (${input.status_code})`),
        },
        {
            type: "DataListItem",
            label: mkText("Delivered At"),
            value: mkText(formatDate(input.delivered_at)),
        },
        {
            type: "DataListItem",
            label: mkText("Duration"),
            value: mkText(`${input.duration} ms`),
        },
        {
            type: "DataListItem",
            label: mkText("Redelivery"),
            value: mkChip(input.redelivery ? "Yes" : "No", input.redelivery ? "warning" : "success"),
        },
        {
            type: "DataListItem",
            label: mkText("Action"),
            value: mkText((_a = input.action) !== null && _a !== void 0 ? _a : "—"),
        },
    ];
    // Optional fields
    if (input.installation_id !== null) {
        items.push({
            type: "DataListItem",
            label: mkText("Installation ID"),
            value: mkText(String(input.installation_id)),
        });
    }
    if (input.repository_id !== null) {
        items.push({
            type: "DataListItem",
            label: mkText("Repository ID"),
            value: mkText(String(input.repository_id)),
        });
    }
    if (input.throttled_at != null) {
        items.push({
            type: "DataListItem",
            label: mkText("Throttled At"),
            value: mkText(formatDate(input.throttled_at)),
        });
    }
    if (input.url) {
        // Use markdown link for clickable URL
        const mdLink = `[# Open Target URL](${input.url})`;
        items.push({
            type: "DataListItem",
            label: mkText("Target URL"),
            value: { type: "Markdown", content: mdLink },
        });
    }
    // Prepare JSON code blocks for request/response
    const renderJsonBlock = (label, obj) => {
        const jsonStr = obj != null ? JSON.stringify(obj, null, 2) : "null";
        return [
            mkText(label, "subtitle2"),
            {
                type: "Markdown",
                content: "json\n" + jsonStr + "\n```",
            },
        ];
    };
    // Assemble the card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with title, subtitle and redelivery badge
                type: "CardHeader",
                title: `Delivery #${input.id}`,
                description: input.event,
                startElement: {
                    type: "Icon",
                    id: "exchange-alt", // generic delivery icon
                    color: "blue",
                    size: 24,
                },
                endElement: mkChip(input.redelivery ? "Redelivery" : "First delivery", input.redelivery ? "warning" : "success"),
            },
            {
                // Main content: data list + separators + raw payloads
                type: "CardContent",
                childrenProps: [
                    // Structured key/value list
                    {
                        type: "DataList",
                        childrenProps: items,
                    },
                    // Divider
                    {
                        type: "Divider",
                        orientation: "horizontal",
                        color: "#eeeeee",
                    },
                    // Request section
                    ...renderJsonBlock("📥 Request Headers & Payload", {
                        headers: input.request.headers,
                        payload: input.request.payload,
                    }),
                    // Divider between request and response
                    {
                        type: "Divider",
                        orientation: "horizontal",
                        color: "#eeeeee",
                    },
                    // Response section
                    ...renderJsonBlock("📤 Response Headers & Payload", {
                        headers: input.response.headers,
                        payload: input.response.payload,
                    }),
                ],
            },
        ],
    };
    return card;
}
//# sourceMappingURL=763.js.map