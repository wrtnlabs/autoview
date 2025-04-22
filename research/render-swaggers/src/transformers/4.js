export function transform($input) {
    return visualizeData($input);
}
// Transform administrator invert data into an AutoView component
function visualizeData(input) {
    // Helper to format ISO timestamps to a user-friendly locale string
    const formatDate = (iso) => new Date(iso).toLocaleString();
    // Build a list of DataListItemProps for each piece of info
    const dataItems = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Admin ID",
                variant: "subtitle2",
                color: "gray",
            },
            value: {
                type: "Text",
                content: input.id,
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Registered",
                variant: "subtitle2",
                color: "gray",
            },
            value: {
                type: "Text",
                content: formatDate(input.created_at),
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Member",
                variant: "subtitle2",
                color: "gray",
            },
            // Highlight the nickname with a colored chip
            value: {
                type: "Chip",
                label: input.member.nickname,
                variant: "filled",
                size: "small",
                color: "teal",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Emails",
                variant: "subtitle2",
                color: "gray",
            },
            // Render each email as its own chip for compactness
            value: input.member.emails.map((email) => ({
                type: "Chip",
                label: email.value,
                variant: "outlined",
                size: "small",
                color: "blue",
            })),
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Channel",
                variant: "subtitle2",
                color: "gray",
            },
            value: {
                type: "Text",
                content: input.customer.channel.name,
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "IP Address",
                variant: "subtitle2",
                color: "gray",
            },
            value: {
                type: "Text",
                content: input.customer.ip,
                variant: "body1",
            },
        },
    ];
    // Optionally add referrer link if provided
    if (input.customer.referrer) {
        dataItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Referrer",
                variant: "subtitle2",
                color: "gray",
            },
            value: {
                type: "Markdown",
                // Render as clickable link
                content: `[${input.customer.referrer}](${input.customer.referrer})`,
            },
        });
    }
    // Add citizen verification info as chips
    dataItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Citizen",
            variant: "subtitle2",
            color: "gray",
        },
        value: [
            {
                type: "Chip",
                label: input.citizen.name,
                variant: "filled",
                size: "small",
                color: "violet",
            },
            {
                type: "Chip",
                label: input.citizen.mobile,
                variant: "outlined",
                size: "small",
                color: "indigo",
            },
        ],
    });
    // Create a visually distinctive card header
    const cardHeader = {
        type: "CardHeader",
        title: "Administrator Profile",
        startElement: {
            type: "Icon",
            id: "user-shield",
            color: "indigo",
            size: 32,
        },
    };
    // Wrap the list in a CardContent
    const cardContent = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataItems,
        },
    };
    // Return a responsive vertical card combining header and content
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
}
//# sourceMappingURL=4.js.map