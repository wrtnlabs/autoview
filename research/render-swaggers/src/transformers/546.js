export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Helper: map reaction content to an icon id and color
     */
    const contentIconMap = {
        "+1": { id: "thumbs-up", color: "green" },
        "-1": { id: "thumbs-down", color: "red" },
        laugh: { id: "laugh", color: "orange" },
        confused: { id: "meh", color: "gray" },
        heart: { id: "heart", color: "red" },
        hooray: { id: "tada", color: "blue" },
        rocket: { id: "rocket", color: "indigo" },
        eyes: { id: "eye", color: "teal" },
    };
    /**
     * Helper: format an ISO timestamp into a relative time string.
     * e.g. "5m ago", "2h ago", "3d ago", or fallback to local date.
     */
    function formatTime(iso) {
        const then = new Date(iso).getTime();
        const now = Date.now();
        const delta = Math.max(0, now - then) / 1000; // seconds
        if (delta < 60)
            return "just now";
        if (delta < 3600)
            return `${Math.floor(delta / 60)}m ago`;
        if (delta < 86400)
            return `${Math.floor(delta / 3600)}h ago`;
        if (delta < 604800)
            return `${Math.floor(delta / 86400)}d ago`;
        // fallback: local date string for older events
        return new Date(iso).toLocaleDateString();
    }
    // If there are no reactions, render a friendly markdown notice.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No reactions available"
        };
    }
    // Sort reactions by creation time descending
    const sorted = [...input].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    // Build list items for each reaction
    const items = sorted.map((reaction) => {
        const user = reaction.user;
        // Avatar: use user's avatar or a fallback icon
        const avatar = user
            ? {
                type: "Avatar",
                src: user.avatar_url,
                name: user.login,
                size: 32
            }
            : {
                type: "Avatar",
                name: "?",
                size: 32
            };
        // Map reaction content to an icon
        const iconInfo = contentIconMap[reaction.content] || { id: "question", color: "gray" };
        const reactionIcon = {
            type: "Icon",
            id: iconInfo.id,
            color: iconInfo.color,
            size: 20
        };
        // Timestamp text
        const timeText = {
            type: "Text",
            content: formatTime(reaction.created_at),
            variant: "caption",
            color: "gray"
        };
        // Title: prefer user's name, then login, then node_id
        const title = user ? (user.name || user.login) : reaction.node_id;
        return {
            type: "ListItem",
            title,
            // show avatar on the left
            startElement: avatar,
            // show reaction icon and timestamp on the right
            endElement: [reactionIcon, timeText]
        };
    });
    // Compose the overall List UI
    const listProps = {
        type: "List",
        childrenProps: items
    };
    return listProps;
}
//# sourceMappingURL=546.js.map