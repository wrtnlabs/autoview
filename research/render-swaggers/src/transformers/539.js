export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Format creation date for display
    const formattedDate = new Date(input.created_at).toLocaleString();
    // Build the CardHeader: show title, author and date, and pinned flag if any
    const header = {
        type: "CardHeader",
        title: input.title,
        // If author exists, show login and date, else just date
        description: `${(_b = (_a = input.author) === null || _a === void 0 ? void 0 : _a.login) !== null && _b !== void 0 ? _b : "Unknown author"} · ${formattedDate}`,
        // Show avatar if author available
        startElement: input.author
            ? {
                type: "Avatar",
                src: input.author.avatar_url,
                name: (_c = input.author.name) !== null && _c !== void 0 ? _c : input.author.login,
            }
            : undefined,
        // If discussion is pinned, show a chip
        endElement: input.pinned
            ? {
                type: "Chip",
                label: "Pinned",
                startElement: { type: "Icon", id: "thumbtack" },
                color: "warning",
                variant: "filled",
            }
            : undefined,
    };
    // Build the CardContent: render body text as markdown for better readability
    const content = {
        type: "CardContent",
        childrenProps: [
            {
                type: "Markdown",
                content: input.body,
            },
        ],
    };
    // Build a badge for the number of comments
    const commentsBadge = {
        type: "Badge",
        count: input.comments_count,
        // Use comment icon
        childrenProps: { type: "Icon", id: "comment" },
        // Show zero if count is zero
        showZero: true,
        maxCount: 999,
    };
    // Build reaction chips if any
    const reactionChips = [];
    if (input.reactions) {
        // Map each reaction field to an icon id
        const reactionMap = {
            url: "link",
            total_count: "hashtag",
            "+1": "thumbs-up",
            "-1": "thumbs-down",
            laugh: "laugh",
            confused: "confused",
            heart: "heart",
            hooray: "hands-clapping",
            eyes: "eye",
            rocket: "rocket",
        };
        // Only include numeric reactions (skip url and total_count)
        for (const key of Object.keys(input.reactions)) {
            if (key === "url" || key === "total_count")
                continue;
            const count = input.reactions[key];
            if (count > 0) {
                reactionChips.push({
                    type: "Chip",
                    label: String(count),
                    startElement: { type: "Icon", id: reactionMap[key] },
                    variant: "outlined",
                    size: "small",
                });
            }
        }
    }
    // Build the CardFooter: include the comments badge and reactions if any
    const footerChildren = [
        commentsBadge,
    ];
    if (reactionChips.length > 0) {
        footerChildren.push({
            type: "ChipGroup",
            childrenProps: reactionChips,
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Compose the vertical card with header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=539.js.map