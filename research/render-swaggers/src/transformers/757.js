export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Icon indicating active status
    const statusIcon = input.active
        ? { type: "Icon", id: "check", color: "green", size: 20 }
        : { type: "Icon", id: "times", color: "red", size: 20 };
    // Chips for each subscribed event
    const eventChips = input.events.map((evt) => ({
        type: "Chip",
        label: evt,
        size: "small",
        variant: "outlined",
    }));
    // Helper to build a visit-button for URLs
    const makeVisitButton = (url) => ({
        type: "Button",
        label: "Visit",
        variant: "text",
        size: "small",
        href: url,
        color: "primary",
    });
    // Assemble data list items for the webhook properties
    const items = [
        // Active status
        {
            type: "DataListItem",
            label: { type: "Text", content: "Active", variant: "body2" },
            value: statusIcon,
        },
        // Events
        {
            type: "DataListItem",
            label: { type: "Text", content: "Events", variant: "body2" },
            value: { type: "ChipGroup", childrenProps: eventChips },
        },
        // Main payload URL
        {
            type: "DataListItem",
            label: { type: "Text", content: "Payload URL", variant: "body2" },
            value: makeVisitButton((_a = input.config.url) !== null && _a !== void 0 ? _a : input.url),
        },
        // Content type (if configured)
        ...(input.config.content_type
            ? [
                {
                    type: "DataListItem",
                    label: { type: "Text", content: "Content Type", variant: "body2" },
                    value: {
                        type: "Text",
                        content: input.config.content_type,
                        variant: "body2",
                    },
                },
            ]
            : []),
        // Insecure SSL flag
        ...(input.config.insecure_ssl != null
            ? [
                {
                    type: "DataListItem",
                    label: { type: "Text", content: "Insecure SSL", variant: "body2" },
                    value: {
                        type: "Text",
                        content: `${input.config.insecure_ssl}`,
                        variant: "body2",
                    },
                },
            ]
            : []),
        // Test URL
        {
            type: "DataListItem",
            label: { type: "Text", content: "Test URL", variant: "body2" },
            value: makeVisitButton(input.test_url),
        },
        // Ping URL
        {
            type: "DataListItem",
            label: { type: "Text", content: "Ping URL", variant: "body2" },
            value: makeVisitButton(input.ping_url),
        },
        // Optional deliveries URL
        ...(input.deliveries_url
            ? [
                {
                    type: "DataListItem",
                    label: { type: "Text", content: "Deliveries URL", variant: "body2" },
                    value: makeVisitButton(input.deliveries_url),
                },
            ]
            : []),
        // Last response summary as markdown
        {
            type: "DataListItem",
            label: { type: "Text", content: "Last Response", variant: "body2" },
            value: {
                type: "Markdown",
                content: `**Code:** ${(_b = input.last_response.code) !== null && _b !== void 0 ? _b : "N/A"}  \n` +
                    `**Status:** ${(_c = input.last_response.status) !== null && _c !== void 0 ? _c : "N/A"}  \n` +
                    `**Message:** ${(_d = input.last_response.message) !== null && _d !== void 0 ? _d : "N/A"}`,
            },
        },
    ];
    // Compose the data list
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Header with webhook name and ID
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        startElement: {
            type: "Icon",
            id: "link",
            size: 24,
            color: "blue",
        },
    };
    // Footer showing creation and update timestamps (human-friendly)
    const footer = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Text",
                content: `Created: ${new Date(input.created_at).toLocaleString()}`,
                variant: "caption",
                color: "gray",
            },
            {
                type: "Text",
                content: `Updated: ${new Date(input.updated_at).toLocaleString()}`,
                variant: "caption",
                color: "gray",
            },
        ],
    };
    // Put everything into a vertical card for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            { type: "CardContent", childrenProps: dataList },
            footer,
        ],
    };
}
//# sourceMappingURL=757.js.map