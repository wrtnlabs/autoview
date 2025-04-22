export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Format timestamp for user-friendly display
    const deliveredAt = new Date(input.delivered_at).toLocaleString();
    // Pretty-print JSON payloads for markdown rendering
    const requestPayload = JSON.stringify((_a = input.request.payload) !== null && _a !== void 0 ? _a : {}, null, 2);
    const responsePayload = JSON.stringify((_b = input.response.payload) !== null && _b !== void 0 ? _b : '', null, 2);
    // Build a list of key/value DataListItem components
    const dataListItems = [
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "hashtag", size: 16, color: "gray" },
                { type: "Text", content: ["ID"] }
            ],
            value: { type: "Text", content: [`${input.id}`] }
        },
        {
            type: "DataListItem",
            label: { type: "Icon", id: "fingerprint", size: 16, color: "gray" },
            value: { type: "Text", content: [`${input.guid}`] }
        },
        {
            type: "DataListItem",
            label: { type: "Icon", id: "calendar-alt", size: 16, color: "gray" },
            value: { type: "Text", content: [deliveredAt] }
        },
        {
            type: "DataListItem",
            label: { type: "Icon", id: "clock", size: 16, color: "gray" },
            value: { type: "Text", content: [`${input.duration} ms`] }
        }
    ];
    // Optionally include installation and repository IDs
    if (input.installation_id != null) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Installation ID"] },
            value: { type: "Text", content: [`${input.installation_id}`] }
        });
    }
    if (input.repository_id != null) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Repository ID"] },
            value: { type: "Text", content: [`${input.repository_id}`] }
        });
    }
    // Status code as a colored badge
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: ["Status Code"] },
        value: {
            type: "Badge",
            count: input.status_code,
            color: input.status_code >= 400 ? "error" : "success",
            childrenProps: { type: "Icon", id: "shield-alt", size: 16, color: "gray" }
        }
    });
    // Include throttled timestamp if present
    if (input.throttled_at) {
        const throttledAt = new Date(input.throttled_at).toLocaleString();
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Throttled At"] },
            value: { type: "Text", content: [throttledAt] }
        });
    }
    // Build the main card
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with event name and action, plus a redelivery chip if applicable
            {
                type: "CardHeader",
                title: `Event: ${input.event}`,
                description: (_c = input.action) !== null && _c !== void 0 ? _c : "No action",
                startElement: { type: "Icon", id: "bolt", size: 24, color: "blue" },
                endElement: input.redelivery
                    ? {
                        type: "Chip",
                        label: "Redelivery",
                        color: "warning",
                        size: "small",
                        variant: "outlined"
                    }
                    : undefined
            },
            // Core details as a DataList
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems
                }
            },
            // Show the raw JSON payloads in a collapsible markdown view
            {
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: "### Request Payload\n" +
                        "json\n" +
                        requestPayload +
                        "\n```\n\n" +
                        "### Response Payload\n" +
                        "```json\n" +
                        responsePayload +
                        "\n```"
                }
            },
            // Footer with a link button if a URL is provided
            {
                type: "CardFooter",
                childrenProps: input.url
                    ? {
                        type: "Button",
                        label: ["View Target URL"],
                        href: input.url,
                        variant: "outlined",
                        startElement: { type: "Icon", id: "external-link-alt", size: 16, color: "blue" }
                    }
                    : []
            }
        ]
    };
}
//# sourceMappingURL=314.js.map