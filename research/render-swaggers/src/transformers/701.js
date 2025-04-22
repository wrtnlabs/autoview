export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no reactions, show a simple text message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No reactions yet",
            variant: "body1",
            color: "gray",
        };
    }
    // Map GitHub reaction content to FontAwesome icon name and a color
    const iconMap = {
        "+1": { id: "thumbs-up", color: "green" },
        "-1": { id: "thumbs-down", color: "red" },
        laugh: { id: "laugh-beam", color: "yellow" },
        confused: { id: "confused", color: "orange" },
        heart: { id: "heart", color: "red" },
        hooray: { id: "tada", color: "blue" },
        rocket: { id: "rocket", color: "violet" },
        eyes: { id: "eye", color: "gray" },
    };
    // Sort reactions by creation date descending
    const sorted = [...input].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    // Build a list item for each reaction
    const items = sorted.map((reaction) => {
        var _a, _b;
        const user = reaction.user;
        // Fallback values if user is null
        const login = (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : "Unknown";
        const avatarUrl = (_b = user === null || user === void 0 ? void 0 : user.avatar_url) !== null && _b !== void 0 ? _b : "";
        // Format creation date for display
        const dateLabel = new Date(reaction.created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        // Lookup icon and color
        const iconInfo = iconMap[reaction.content] || { id: "question-circle", color: "gray" };
        // Start element: user avatar
        const avatar = {
            type: "Avatar",
            src: avatarUrl,
            name: login,
            variant: "primary",
            size: 32,
        };
        // End elements: reaction icon and date text
        const reactionIcon = {
            type: "Icon",
            id: iconInfo.id,
            color: iconInfo.color,
            size: 20,
        };
        const dateText = {
            type: "Text",
            content: dateLabel,
            variant: "caption",
            color: "tertiary",
        };
        return {
            type: "ListItem",
            title: login,
            description: `Reacted with "${reaction.content}"`,
            startElement: avatar,
            endElement: [reactionIcon, dateText],
        };
    });
    // Compose the final list component
    const list = {
        type: "List",
        childrenProps: items,
    };
    return list;
}
//# sourceMappingURL=701.js.map