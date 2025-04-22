export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no comments, show a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "*No comments to display.*",
        };
    }
    // Map each commit comment to a VerticalCard
    const cards = input.map(comment => {
        var _a;
        // Safely extract user info; user can be null
        const user = comment.user;
        const login = (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : "Unknown";
        const avatarSrc = user === null || user === void 0 ? void 0 : user.avatar_url;
        // Avatar showing the commenter's profile picture
        const avatar = {
            type: "Avatar",
            src: avatarSrc,
            name: login,
            variant: "gray",
            size: 40,
        };
        // CardHeader with avatar, username, timestamp, and association chip
        const header = {
            type: "CardHeader",
            title: login,
            // Format ISO date to a locale string for readability
            description: new Date(comment.created_at).toLocaleString(),
            startElement: avatar,
            endElement: {
                type: "Chip",
                label: comment.author_association,
                variant: "outlined",
                size: "small",
                color: "primary",
            },
        };
        // CardContent using a Markdown renderer for the comment body
        const content = {
            type: "CardContent",
            childrenProps: {
                type: "Markdown",
                content: comment.body,
            },
        };
        // If reactions exist, turn each non-zero reaction into a small Chip
        let footer;
        if (comment.reactions) {
            const reactionChips = [];
            // Map reaction keys to emoji shortcuts for quick recognition
            const reactionMap = {
                "+1": "👍",
                "-1": "👎",
                laugh: "😄",
                confused: "😕",
                heart: "❤️",
                hooray: "🎉",
                eyes: "👀",
                rocket: "🚀",
            };
            // Only include those reactions where the count is greater than zero
            ["+1", "-1", "laugh", "confused", "heart", "hooray", "eyes", "rocket"]
                .forEach(key => {
                const count = comment.reactions[key];
                if (count > 0) {
                    reactionChips.push({
                        type: "Chip",
                        label: `${reactionMap[key]} ${count}`,
                        variant: "outlined",
                        size: "small",
                    });
                }
            });
            if (reactionChips.length > 0) {
                footer = {
                    type: "CardFooter",
                    childrenProps: reactionChips,
                };
            }
        }
        // Assemble the VerticalCard with its sub-components
        const children = [header, content];
        if (footer) {
            children.push(footer);
        }
        return {
            type: "VerticalCard",
            childrenProps: children,
        };
    });
    // Wrap all cards in a swipeable, responsive carousel
    const carousel = {
        type: "Carousel",
        infinite: false,
        navControls: true,
        indicators: true,
        gutter: 16,
        // Each comment is displayed as a VerticalCard slide
        childrenProps: cards,
    };
    return carousel;
}
//# sourceMappingURL=698.js.map