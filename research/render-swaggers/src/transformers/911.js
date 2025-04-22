export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Mapping of GitHub reaction names to FontAwesome icon IDs
    const reactionIconMap = {
        "+1": "thumbs-up",
        "-1": "thumbs-down",
        laugh: "laugh",
        confused: "confused",
        heart: "heart",
        hooray: "tada",
        eyes: "eyes",
        rocket: "rocket",
    };
    // Build reaction badges, only include those with a positive count
    const reactionBadges = [];
    if (input.reactions) {
        for (const key of Object.keys(reactionIconMap)) {
            const count = input.reactions[key];
            if (typeof count === "number" && count > 0) {
                reactionBadges.push({
                    type: "Badge",
                    count,
                    // Use a simple gray icon; adjust size/color as needed
                    childrenProps: {
                        type: "Icon",
                        id: reactionIconMap[key],
                        size: 16,
                        color: "gray",
                    },
                });
            }
        }
    }
    // Determine the author element: avatar if available, otherwise fallback icon
    let authorElement;
    if (input.author && input.author.avatar_url) {
        authorElement = {
            type: "Avatar",
            src: input.author.avatar_url,
            name: (_a = input.author.name) !== null && _a !== void 0 ? _a : input.author.login,
            size: 40,
            variant: "primary",
        };
    }
    else {
        authorElement = {
            type: "Icon",
            id: "user-secret", // fallback icon
            size: 40,
            color: "gray",
        };
    }
    // Format creation date with locale string, append "(edited)" if updated
    const createdAt = new Date(input.created_at).toLocaleString();
    const description = input.last_edited_at
        ? `${createdAt} (edited)`
        : createdAt;
    // Compose CardHeader
    const header = {
        type: "CardHeader",
        startElement: authorElement,
        title: (_c = (_b = input.author) === null || _b === void 0 ? void 0 : _b.login) !== null && _c !== void 0 ? _c : "Unknown",
        description,
    };
    // Compose CardContent with markdown rendering of the comment body
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.body,
        },
    };
    // Optionally compose CardFooter if there are any reaction badges
    const footer = reactionBadges.length > 0
        ? {
            type: "CardFooter",
            childrenProps: reactionBadges,
        }
        : undefined;
    // Return a vertical card containing header, content, and optional footer
    const card = {
        type: "VerticalCard",
        childrenProps: footer
            ? [header, content, footer]
            : [header, content],
    };
    return card;
}
//# sourceMappingURL=911.js.map