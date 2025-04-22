export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Handle missing bot gracefully
    const bot = input.bot;
    if (!bot) {
        // Display a simple message when there's no data
        return {
            type: "Text",
            content: "No bot data available.",
            variant: "body1",
        };
    }
    // Helper to create a DataListItem entry
    const makeItem = (labelText, valueComponent) => ({
        type: "DataListItem",
        label: {
            type: "Text",
            content: labelText,
            variant: "subtitle2",
            color: "tertiary",
        },
        value: valueComponent,
    });
    // Build the list of bot properties to display
    const dataListItems = [
        makeItem("ID", {
            type: "Text",
            content: (_a = bot.id) !== null && _a !== void 0 ? _a : "-",
            variant: "body2",
        }),
        makeItem("Channel", {
            type: "Text",
            content: (_b = bot.channelId) !== null && _b !== void 0 ? _b : "-",
            variant: "body2",
        }),
        makeItem("Created At", {
            type: "Text",
            // Format timestamp into a human-readable string
            content: bot.createdAt
                ? new Date(bot.createdAt).toLocaleString()
                : "-",
            variant: "body2",
        }),
        makeItem("Color", {
            type: "Text",
            content: bot.color,
            variant: "body2",
        }),
        makeItem("AI Enabled", bot.ai
            ? {
                type: "Icon",
                id: "robot",
                color: "blue",
                size: 20,
            }
            : {
                type: "Text",
                content: "No",
                variant: "body2",
            }),
    ];
    // Build the header with avatar (if available), name, and description
    const header = {
        type: "CardHeader",
        title: bot.name,
        description: bot.description,
        startElement: bot.avatarUrl
            ? {
                type: "Avatar",
                src: bot.avatarUrl,
                name: bot.name,
                size: 64,
            }
            : undefined,
    };
    // The main content section with a DataList of bot fields
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems,
        },
    };
    // Footer: show an "AI Bot" chip if AI is enabled
    const footer = {
        type: "CardFooter",
        childrenProps: bot.ai
            ? {
                type: "ChipGroup",
                childrenProps: [
                    {
                        type: "Chip",
                        label: "AI Bot",
                        variant: "filled",
                        color: "info",
                    },
                ],
            }
            : undefined,
    };
    // Compose a vertical card that is responsive and visually engaging
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=224.js.map