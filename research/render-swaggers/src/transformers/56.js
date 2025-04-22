export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Format creation date for display
    const createdAt = (() => {
        try {
            return new Date(input.created_at).toLocaleString();
        }
        catch (_a) {
            // Fallback to raw string if parsing fails
            return input.created_at;
        }
    })();
    // Build key–value pairs for the DataList
    const listItems = [
        // Unique record ID
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "hashtag", size: 16, color: "gray" },
                { type: "Text", content: "ID", variant: "subtitle2" }
            ],
            value: { type: "Text", content: input.id, variant: "body2" }
        },
        // Channel information
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "tag", size: 16, color: "cyan" },
                { type: "Text", content: "Channel", variant: "subtitle2" }
            ],
            value: {
                type: "Text",
                content: `${input.channel.name} (${input.channel.code})`,
                variant: "body2"
            }
        },
        // Client URL (clickable via markdown)
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "link", size: 16, color: "blue" },
                { type: "Text", content: "URL", variant: "subtitle2" }
            ],
            value: {
                type: "Markdown",
                content: `[Open link](${input.href})`
            }
        },
        // Referrer address (may be empty)
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "arrow-left", size: 16, color: "orange" },
                { type: "Text", content: "Referrer", variant: "subtitle2" }
            ],
            value: input.referrer
                ? { type: "Markdown", content: `[${input.referrer}](${input.referrer})` }
                : { type: "Text", content: "None", variant: "body2" }
        },
        // IP address
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "globe", size: 16, color: "teal" },
                { type: "Text", content: "IP", variant: "subtitle2" }
            ],
            value: { type: "Text", content: input.ip, variant: "body2" }
        },
        // Timestamp
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "clock", size: 16, color: "gray" },
                { type: "Text", content: "Connected At", variant: "subtitle2" }
            ],
            value: { type: "Text", content: createdAt, variant: "body2" }
        }
    ];
    // Status chips for membership, verification, and external origin
    const statusChips = [];
    // Membership status
    if (input.member) {
        statusChips.push({
            type: "Chip",
            label: "Member",
            color: "primary",
            variant: "filled"
        });
    }
    else {
        statusChips.push({
            type: "Chip",
            label: "Guest",
            color: "gray",
            variant: "filled"
        });
    }
    // Real-name verification status
    if (input.citizen) {
        statusChips.push({
            type: "Chip",
            label: "Verified",
            color: "success",
            variant: "filled"
        });
    }
    else {
        statusChips.push({
            type: "Chip",
            label: "Unverified",
            color: "warning",
            variant: "outlined"
        });
    }
    // External user origin
    if (input.external_user) {
        statusChips.push({
            type: "Chip",
            label: "External",
            color: "info",
            variant: "outlined"
        });
    }
    // Compose the full UI as a vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with summary
            {
                type: "CardHeader",
                title: `Connection Record`,
                description: `Channel: ${input.channel.name}`,
                startElement: {
                    type: "Icon",
                    id: "server",
                    size: 24,
                    color: "indigo"
                }
            },
            // Content: key–value list
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: listItems
                }
            },
            // Footer: status chips
            {
                type: "CardFooter",
                childrenProps: statusChips
            }
        ]
    };
}
//# sourceMappingURL=56.js.map