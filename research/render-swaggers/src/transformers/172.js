export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    const bot = input.bot;
    // Handle case when there's no bot data
    if (!bot) {
        return {
            type: "Text",
            content: "No bot data available",
            variant: "body1",
        };
    }
    // Format the creation timestamp to a human-readable string
    const createdDate = bot.createdAt
        ? new Date(bot.createdAt).toLocaleString()
        : "Unknown";
    // Choose an avatar image or fallback to an icon
    let startElement;
    if (bot.avatarUrl) {
        // Use the provided avatar URL
        startElement = {
            type: "Avatar",
            src: bot.avatarUrl,
            name: bot.name,
            size: 40,
        };
    }
    else {
        // Fallback icon when no avatar URL is available
        startElement = {
            type: "Icon",
            id: "robot",
            color: "gray",
            size: 40,
        };
    }
    // Build the card header containing the bot name and creation date
    const header = {
        type: "CardHeader",
        title: bot.name,
        description: `Created: ${createdDate}`,
        startElement,
    };
    // Build a list of key-value pairs: ID, Channel ID, and Color
    const listItems = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "ID",
                variant: "subtitle2",
                color: "tertiary",
            },
            value: {
                type: "Text",
                content: (_a = bot.id) !== null && _a !== void 0 ? _a : "N/A",
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Channel ID",
                variant: "subtitle2",
                color: "tertiary",
            },
            value: {
                type: "Text",
                content: (_b = bot.channelId) !== null && _b !== void 0 ? _b : "N/A",
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Color",
                variant: "subtitle2",
                color: "tertiary",
            },
            value: {
                type: "Chip",
                label: bot.color,
                variant: "outlined",
                size: "small",
            },
        },
    ];
    // Wrap the list items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Put the DataList inside the card content
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Compose a vertical card with header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=172.js.map