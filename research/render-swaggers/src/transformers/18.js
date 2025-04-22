export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input fields for easier access
    const { id, value, reason, created_at, administrator, citizen } = input;
    const member = administrator.member;
    const channel = administrator.customer.channel;
    // Format the timestamp into a human-readable string; fallback to raw if invalid
    const dateObj = new Date(created_at);
    const formattedDate = isNaN(dateObj.getTime())
        ? created_at
        : dateObj.toLocaleString();
    // Build the card header:
    // - Show the donation reason as title
    // - Show the timestamp as description
    // - Use an avatar for the citizen (initials from name)
    // - Use a badge with a gift icon to highlight the donated value
    const header = {
        type: "CardHeader",
        title: reason,
        description: formattedDate,
        startElement: {
            type: "Avatar",
            name: citizen.name,
            variant: "primary",
            size: 32,
        },
        endElement: {
            type: "Badge",
            count: value,
            maxCount: 999999,
            showZero: false,
            color: "teal",
            childrenProps: {
                type: "Icon",
                id: "gift",
                color: "teal",
                size: 16,
            },
        },
    };
    // Create a DataList of key details for the donation
    const dataListItems = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Transaction ID",
                variant: "subtitle2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: id,
                variant: "body2",
                color: "secondary",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Member Nickname",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: member.nickname,
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Citizen Name",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: citizen.name,
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Channel",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: channel.name,
                variant: "body2",
            },
        },
    ];
    // Wrap the DataList inside CardContent for structured display
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems,
        },
    };
    // Assemble a vertical card with header and content for responsive UI
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=18.js.map