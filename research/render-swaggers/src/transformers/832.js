export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no comments, render a placeholder text
    if (!input || input.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: "No review comments available.",
        };
    }
    // Transform each Pull Request Review Comment into a VerticalCard
    const commentCards = input.map((comment) => {
        var _a, _b, _c, _d, _e;
        // Format the creation date for display
        const createdAt = new Date(comment.created_at).toLocaleString();
        // Determine the file location (path and line number)
        const lineNumber = (_c = (_b = (_a = comment.line) !== null && _a !== void 0 ? _a : comment.position) !== null && _b !== void 0 ? _b : comment.original_line) !== null && _c !== void 0 ? _c : "";
        const location = comment.path && lineNumber
            ? `${comment.path}:${lineNumber}`
            : comment.path || "";
        // Reaction badge: show total count of reactions with a heart icon
        const reactionBadge = {
            type: "Badge",
            count: (_e = (_d = comment.reactions) === null || _d === void 0 ? void 0 : _d.total_count) !== null && _e !== void 0 ? _e : 0,
            color: "pink",
            // Use a heart icon to indicate reactions
            childrenProps: {
                type: "Icon",
                id: "heart",
                color: "red",
                size: 16,
            },
        };
        // Build the card header with avatar, user login, and timestamp/location
        const header = {
            type: "CardHeader",
            title: comment.user.login,
            description: [location, createdAt].filter((s) => !!s).join(" • "),
            startElement: {
                type: "Avatar",
                src: comment.user.avatar_url,
                name: comment.user.login,
                variant: "primary",
                size: 40,
            },
        };
        // Build the card content, rendering the comment body via Markdown
        const content = {
            type: "CardContent",
            childrenProps: {
                type: "Markdown",
                content: comment.body,
            },
        };
        // Build the card footer with the reactions badge
        const footer = {
            type: "CardFooter",
            childrenProps: reactionBadge,
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer],
        };
    });
    // If there's only one comment, return the single card directly
    if (commentCards.length === 1) {
        return commentCards[0];
    }
    // Otherwise, render all comment cards in a carousel for mobile-friendly navigation
    const carousel = {
        type: "Carousel",
        autoPlay: false,
        infinite: false,
        navControls: true,
        indicators: true,
        gutter: 16,
        effect: "slide",
        childrenProps: commentCards,
    };
    return carousel;
}
//# sourceMappingURL=832.js.map