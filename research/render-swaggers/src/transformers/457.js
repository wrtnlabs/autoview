export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to create a text component with consistent styling
    const createText = (content, variant = "body2") => ({
        type: "Text",
        content: [content],
        variant,
    });
    // Determine the status icon based on HTTP status code
    const statusIcon = {
        type: "Icon",
        id: input.status_code >= 400 ? "exclamation-triangle" : "check-circle",
        color: input.status_code >= 400 ? "red" : "green",
        size: 20,
    };
    // Build a list of key/value pairs for core delivery properties
    const dataListItems = [
        {
            type: "DataListItem",
            label: createText("Delivered At"),
            value: createText(new Date(input.delivered_at).toLocaleString()),
        },
        {
            type: "DataListItem",
            label: createText("Redelivery"),
            // Use an icon rather than text for boolean
            value: {
                type: "Icon",
                id: input.redelivery ? "redo" : "times-circle",
                color: input.redelivery ? "teal" : "gray",
                size: 16,
            },
        },
        {
            type: "DataListItem",
            label: createText("Duration"),
            value: createText(`${input.duration.toFixed(2)}ms`),
        },
        {
            type: "DataListItem",
            label: createText("Event"),
            value: createText(input.event),
        },
    ];
    // Conditionally add optional fields if present
    if (input.action !== null) {
        dataListItems.push({
            type: "DataListItem",
            label: createText("Action"),
            value: createText(input.action),
        });
    }
    if (input.installation_id !== null) {
        dataListItems.push({
            type: "DataListItem",
            label: createText("App Installation ID"),
            value: createText(input.installation_id.toString()),
        });
    }
    if (input.repository_id !== null) {
        dataListItems.push({
            type: "DataListItem",
            label: createText("Repository ID"),
            value: createText(input.repository_id.toString()),
        });
    }
    if (input.throttled_at !== undefined && input.throttled_at !== null) {
        dataListItems.push({
            type: "DataListItem",
            label: createText("Throttled At"),
            value: createText(new Date(input.throttled_at).toLocaleString()),
        });
    }
    if (input.url) {
        dataListItems.push({
            type: "DataListItem",
            label: createText("Delivery URL"),
            // Use a text-button combo to link
            value: {
                type: "Button",
                variant: "text",
                color: "primary",
                startElement: { type: "Icon", id: "link", color: "blue", size: 16 },
                label: [input.url],
                href: input.url,
            },
        });
    }
    // Prepare markdown blocks for JSON payloads, if any
    const markdownBlocks = [];
    if (input.request.payload !== null && Object.keys(input.request.payload || {}).length > 0) {
        markdownBlocks.push({
            type: "Markdown",
            content: "#### Request Payload\njson\n" +
                JSON.stringify(input.request.payload, null, 2) +
                "\n```",
        });
    }
    if (input.response.payload !== null) {
        markdownBlocks.push({
            type: "Markdown",
            content: "#### Response Payload\n```json\n" +
                JSON.stringify(input.response.payload, null, 2) +
                "\n```",
        });
    }
    // Compose the final vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with event name and status icon
            {
                type: "CardHeader",
                title: input.event,
                description: `Status: ${input.status} (${input.status_code})`,
                startElement: statusIcon,
            },
            // Main content: a data list plus any JSON payloads
            {
                type: "CardContent",
                childrenProps: [
                    {
                        type: "DataList",
                        childrenProps: dataListItems,
                    },
                    // Spread in markdown blocks below the data list
                    ...markdownBlocks,
                ],
            },
            // Footer shows the unique delivery GUID
            {
                type: "CardFooter",
                childrenProps: createText(`Delivery GUID: ${input.guid}`, "caption"),
            },
        ],
    };
}
//# sourceMappingURL=457.js.map