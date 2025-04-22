export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure pagination and channel list
    const { pagination, data: channels } = input;
    const { current, pages } = pagination;
    // Build a DataListItemProps array for each shopping channel
    const listItems = channels.map((channel) => {
        // Avatar showing the first letter of channel name
        const avatar = {
            type: "Avatar",
            name: channel.name.charAt(0).toUpperCase(),
            variant: "primary",
            size: 32,
        };
        // Text component for full channel name
        const nameText = {
            type: "Text",
            content: channel.name,
            variant: "body1",
        };
        // Chip component for channel code
        const codeChip = {
            type: "Chip",
            label: channel.code,
            color: "secondary",
            variant: "filled",
            size: "small",
        };
        // Text component for creation date
        const dateText = {
            type: "Text",
            content: new Date(channel.created_at).toLocaleDateString(),
            variant: "caption",
            color: "#888888",
        };
        return {
            type: "DataListItem",
            // Label area: avatar + channel name
            label: [avatar, nameText],
            // Value area: code chip + creation date
            value: [codeChip, dateText],
        };
    });
    // DataList wrapping all items
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // CardHeader with an icon and pagination info
    const header = {
        type: "CardHeader",
        title: "Shopping Channels",
        description: `Page ${current} of ${pages}`,
        startElement: {
            type: "Icon",
            id: "shopping-cart",
            color: "blue",
            size: 24,
        },
    };
    // CardContent containing the data list
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Wrap in a vertical card for responsive display
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=162.js.map