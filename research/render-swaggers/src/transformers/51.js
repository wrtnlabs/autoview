export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure relevant fields for easier reference
    const { id, channel, created_at, href, referrer, ip, token } = input;
    /**
     * Helper to build a DataListItemProps entry.
     * Wraps label and value in Text components for consistency.
     */
    function createItem(label, value) {
        return {
            type: "DataListItem",
            // Labels rendered in a muted style
            label: [
                {
                    type: "Text",
                    content: label,
                    variant: "subtitle2",
                    color: "gray"
                }
            ],
            // Values rendered prominently
            value: [
                {
                    type: "Text",
                    content: value,
                    variant: "body1"
                }
            ]
        };
    }
    // Fallback for missing referrer
    const referrerText = referrer && referrer.length ? referrer : "N/A";
    // Build a VerticalCard to organize the information
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header: Customer identity
            {
                type: "CardHeader",
                title: id,
                description: channel.name,
                startElement: {
                    type: "Icon",
                    id: "user",
                    size: 32,
                    color: "blue"
                }
            },
            // Main content: data list and token details
            {
                type: "CardContent",
                childrenProps: [
                    // List of key connection attributes
                    {
                        type: "DataList",
                        childrenProps: [
                            createItem("Channel Code", channel.code),
                            createItem("Channel Created At", channel.created_at),
                            createItem("Connection Created At", created_at),
                            createItem("IP Address", ip),
                            createItem("Referrer", referrerText),
                            createItem("Current URL", href)
                        ]
                    },
                    // Visual separator
                    {
                        type: "Divider",
                        orientation: "horizontal",
                        color: "#e0e0e0"
                    },
                    // Token information in markdown for code formatting
                    {
                        type: "Markdown",
                        content: [
                            "### Token Information",
                            `- **Access**: \`${token.access}\``,
                            `- **Refresh**: \`${token.refresh}\``,
                            `- **Expires At**: ${token.expired_at}`,
                            `- **Refreshable Until**: ${token.refreshable_until}`
                        ].join("\n")
                    }
                ]
            }
        ]
    };
}
//# sourceMappingURL=51.js.map