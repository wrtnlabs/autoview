export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Safely extract the bots array, defaulting to empty if undefined
    const bots = (_a = input.bots) !== null && _a !== void 0 ? _a : [];
    // If there are no bots, render a friendly markdown message
    if (bots.length === 0) {
        return {
            type: "Markdown",
            content: "### No bots available\n\nThere are no bots to display. Create or invite bots to see them here.",
        };
    }
    // Helper to format timestamps into user‐friendly dates
    function formatDate(ts) {
        if (!ts)
            return "";
        try {
            return new Date(ts).toLocaleDateString();
        }
        catch (_a) {
            return "";
        }
    }
    // Build a list item for each bot
    const listItems = bots.map((bot) => {
        var _a;
        // Prepare avatar props: prefer an explicit URL, fallback to initials if absent
        const avatar = {
            type: "Avatar",
            // Use the provided avatarUrl; if missing, omit src so Avatar falls back to initials
            src: bot.avatarUrl,
            name: bot.name,
            size: 40,
        };
        // Description: use the bot's own description or show its creation date
        const descriptionText = ((_a = bot.description) === null || _a === void 0 ? void 0 : _a.trim()) ||
            (bot.createdAt
                ? `Created on ${formatDate(bot.createdAt)}`
                : undefined);
        // If the bot is AI‐powered, show a robot icon at the end
        const aiBadge = bot.ai
            ? {
                type: "Icon",
                id: "robot",
                color: "gray",
                size: 20,
            }
            : undefined;
        return Object.assign(Object.assign(Object.assign(Object.assign({ type: "ListItem", title: bot.name }, (descriptionText ? { description: descriptionText } : {})), { startElement: avatar }), (bot.id ? { href: `/bots/${encodeURIComponent(bot.id)}` } : {})), (aiBadge ? { endElement: aiBadge } : {}));
    });
    // Return a responsive list component with all bots
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=223.js.map