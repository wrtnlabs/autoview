export function transform($input) {
    return visualizeData($input);
}
/**
 * Helper to map GitHub reaction content to FontAwesome icon IDs.
 */
function mapContentToIcon(content) {
    switch (content) {
        case "+1":
            return "thumbs-up";
        case "-1":
            return "thumbs-down";
        case "laugh":
            return "laugh";
        case "confused":
            return "confused";
        case "heart":
            return "heart";
        case "hooray":
            return "tada";
        case "rocket":
            return "rocket";
        case "eyes":
            return "eyes";
        default:
            return "question";
    }
}
/**
 * Simple "time ago" formatter for a date-time string.
 */
function timeAgo(dateTime) {
    const now = new Date().getTime();
    const past = new Date(dateTime).getTime();
    const diff = Math.max(0, now - past);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
    }
    else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
}
function visualizeData(input) {
    var _a, _b;
    // Safely handle a possibly null 'user'
    const user = input.user;
    const userLogin = (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : "Unknown user";
    const avatarSrc = (_b = user === null || user === void 0 ? void 0 : user.avatar_url) !== null && _b !== void 0 ? _b : "";
    // Avatar for the reacting user
    const avatar = {
        type: "Avatar",
        src: avatarSrc,
        name: userLogin,
        variant: "gray",
        size: 40,
    };
    // Icon representing the reaction content
    const reactionIconId = mapContentToIcon(input.content);
    const reactionIcon = {
        type: "Icon",
        id: reactionIconId,
        color: "blue",
        size: 24,
    };
    // Build a markdown block summarizing the reaction
    const markdownSummary = [
        `### Reaction Details`,
        ``,
        `- **User:** @${userLogin}`,
        `- **Reaction:** \`${input.content}\``,
        `- **Created:** ${new Date(input.created_at).toLocaleString()}`,
    ].join("\n");
    // Assemble a vertical card for a compact, mobile-friendly layout
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with avatar and identifier
            {
                type: "CardHeader",
                startElement: avatar,
                title: userLogin,
                description: timeAgo(input.created_at),
            },
            // Main content displaying the reaction icon and content
            {
                type: "CardContent",
                childrenProps: [
                    // Show the icon in context
                    {
                        type: "Chip",
                        label: `Reacted with "${input.content}"`,
                        startElement: reactionIcon,
                        color: "cyan",
                        size: "medium",
                        variant: "outlined",
                    },
                ],
            },
            // Footer with a markdown summary for richer text
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Markdown",
                    content: markdownSummary,
                },
            },
        ],
    };
}
//# sourceMappingURL=702.js.map