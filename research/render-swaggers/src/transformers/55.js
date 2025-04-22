export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Build a user icon for the card header.
     */
    const userIcon = {
        type: "Icon",
        id: "user",
        color: "blue",
        size: 32,
    };
    /**
     * Attempt to format the ISO timestamp into a human‐readable locale string.
     * If parsing fails, fall back to the raw value.
     */
    let connectedAt = input.created_at;
    try {
        const d = new Date(input.created_at);
        if (!isNaN(d.getTime())) {
            connectedAt = d.toLocaleString();
        }
    }
    catch (_a) {
        // Keep original string if Date parsing fails
    }
    /**
     * Prepare a list of data items to display.
     * We use DataListItem for each field, preferring interactive or visual elements.
     */
    const listItems = [
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Channel", variant: "subtitle2" }],
            value: [
                {
                    type: "Text",
                    content: `${input.channel.name} (${input.channel.code})`,
                    variant: "body1",
                },
            ],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Connection URL", variant: "subtitle2" }],
            // Render as clickable link via Markdown
            value: [
                {
                    type: "Markdown",
                    content: `[Open Session](${input.href})`,
                },
            ],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Referrer", variant: "subtitle2" }],
            value: input.referrer
                ? [
                    {
                        type: "Markdown",
                        content: `[Go Back](${input.referrer})`,
                    },
                ]
                : [
                    {
                        type: "Text",
                        content: "N/A",
                        variant: "body2",
                    },
                ],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "IP Address", variant: "subtitle2" }],
            value: [
                {
                    type: "Text",
                    content: input.ip,
                    variant: "body1",
                },
            ],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Connected At", variant: "subtitle2" }],
            value: [
                {
                    type: "Text",
                    content: connectedAt,
                    variant: "body1",
                },
            ],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Member Status", variant: "subtitle2" }],
            value: [
                {
                    type: "Chip",
                    label: input.member ? "Member" : "Guest",
                    variant: "filled",
                    color: input.member ? "success" : "gray",
                    size: "small",
                },
            ],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "Citizen Verified", variant: "subtitle2" }],
            value: [
                {
                    type: "Chip",
                    label: input.citizen ? "Verified" : "Unverified",
                    variant: "filled",
                    color: input.citizen ? "success" : "error",
                    size: "small",
                },
            ],
        },
        {
            type: "DataListItem",
            label: [{ type: "Text", content: "External Service", variant: "subtitle2" }],
            value: [
                {
                    type: "Chip",
                    label: input.external_user ? "Connected" : "None",
                    variant: "outlined",
                    color: input.external_user ? "primary" : "gray",
                    size: "small",
                },
            ],
        },
    ];
    /**
     * Wrap our items in a DataList component.
     */
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    /**
     * Compose a VerticalCard containing a header and the data list.
     * This layout is mobile‐friendly and collapses naturally.
     */
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: `Customer ID: ${input.id}`,
                description: `Channel: ${input.channel.name}`,
                startElement: userIcon,
            },
            {
                type: "CardContent",
                childrenProps: dataList,
            },
        ],
    };
    return card;
}
//# sourceMappingURL=55.js.map