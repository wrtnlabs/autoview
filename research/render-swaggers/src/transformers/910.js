export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Sort comments by newest first to show recent activity at the top
    const sortedComments = [...input].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    // Map each comment to a DataListItem with rich visual components
    const items = sortedComments.map((comment) => {
        // Fallback values if author is missing
        const author = comment.author;
        const authorName = (author === null || author === void 0 ? void 0 : author.login) || (author === null || author === void 0 ? void 0 : author.name) || "Unknown";
        const avatarSrc = author === null || author === void 0 ? void 0 : author.avatar_url;
        // Avatar with user's picture or initials
        const avatar = {
            type: "Avatar",
            src: avatarSrc,
            name: authorName,
            size: 40,
        };
        // Author name and timestamp
        const nameText = {
            type: "Text",
            content: authorName,
            variant: "subtitle1",
            color: "primary",
        };
        const dateText = {
            type: "Text",
            content: new Date(comment.created_at).toLocaleString(),
            variant: "caption",
            color: "secondary",
        };
        // Main body rendered as markdown for better readability
        const bodyMarkdown = {
            type: "Markdown",
            content: comment.body,
        };
        // Reaction rollup: map GitHub reaction counts to icon chips
        const reactions = comment.reactions;
        const reactionMap = [
            ["+1", "thumbs-up"],
            ["-1", "thumbs-down"],
            ["laugh", "laugh"],
            ["confused", "question"],
            ["heart", "heart"],
            ["hooray", "trophy"],
            ["eyes", "eye"],
            ["rocket", "rocket"],
        ];
        const reactionChips = [];
        if (reactions) {
            for (const [key, iconId] of reactionMap) {
                const count = reactions[key];
                if (count > 0) {
                    reactionChips.push({
                        type: "Chip",
                        label: String(count),
                        variant: "outlined",
                        size: "small",
                        // Display an icon before the count
                        startElement: {
                            type: "Icon",
                            id: iconId,
                            size: 12,
                            color: "gray",
                        },
                    });
                }
            }
        }
        // Group all reaction chips into a horizontal list
        const reactionGroup = {
            type: "ChipGroup",
            childrenProps: reactionChips,
        };
        return {
            type: "DataListItem",
            // Left side: avatar, name, and date
            label: [avatar, nameText, dateText],
            // Right side: comment body and reactions
            value: [bodyMarkdown, reactionGroup],
        };
    });
    // Return a DataList containing all comment items
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=910.js.map