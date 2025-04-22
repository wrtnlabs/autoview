export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Extract bot list, guard against undefined
    const bots = (_a = input.bots) !== null && _a !== void 0 ? _a : [];
    // If no bots, render a simple markdown message
    if (bots.length === 0) {
        return {
            type: "Markdown",
            content: "#### 🤖 No bots found.",
        };
    }
    // Sort bots alphabetically by name for consistent ordering
    const sortedBots = bots.slice().sort((a, b) => a.name.localeCompare(b.name));
    // Map each bot into a ListItem component
    const childrenProps = sortedBots.map((bot) => {
        var _a;
        // Use avatarUrl if provided, else fallback to a text avatar with the bot's name initials
        const startElement = bot.avatarUrl
            ? { type: "Avatar", src: bot.avatarUrl, name: bot.name }
            : { type: "Avatar", name: bot.name };
        // Format creation timestamp into a human‐readable string if available
        const description = bot.createdAt != null
            ? new Date(bot.createdAt).toLocaleString()
            : undefined;
        // Use channelId or id as a small chip label
        const label = (_a = bot.channelId) !== null && _a !== void 0 ? _a : bot.id;
        const endElement = label
            ? {
                type: "Chip",
                label,
                size: "small",
                variant: "outlined",
            }
            : undefined;
        return Object.assign({ type: "ListItem", title: bot.name, description,
            startElement }, (endElement && { endElement }));
    });
    // Wrap all items in a responsive List component
    return {
        type: "List",
        childrenProps,
    };
}
//# sourceMappingURL=171.js.map