export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // 1. Compose the card header with user's avatar, username, and timestamp.
    const header = {
        type: "CardHeader",
        title: input.user.login,
        description: new Date(input.created_at).toLocaleString(), // localized timestamp
        startElement: {
            type: "Avatar",
            src: input.user.avatar_url,
            name: input.user.login,
            size: 36,
        },
    };
    // 2. Render the comment body using Markdown for rich content.
    //    Provide a fallback message if the body is empty or whitespace.
    const rawBody = (_a = input.body) !== null && _a !== void 0 ? _a : "";
    const markdownContent = rawBody.trim()
        ? rawBody
        : "_No content provided_";
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: markdownContent,
        },
    };
    // 3. Build a set of reaction badges from the reaction rollup.
    //    Each badge shows an icon and the count (only if count > 0).
    const reactions = input.reactions;
    const reactionBadges = [];
    if (reactions) {
        // Map reaction keys to FontAwesome icon names
        const iconMap = {
            "+1": "thumbs-up",
            "-1": "thumbs-down",
            laugh: "laugh",
            confused: "meh",
            heart: "heart",
            hooray: "tada",
            eyes: "eye",
            rocket: "rocket",
        };
        for (const key of Object.keys(iconMap)) {
            const count = reactions[key];
            if (typeof count === "number" && count > 0) {
                reactionBadges.push({
                    type: "Badge",
                    count,
                    childrenProps: {
                        type: "Icon",
                        id: iconMap[key],
                        size: 16,
                        color: "gray",
                    },
                });
            }
        }
    }
    // 4. Compose the card footer with reaction badges (if any).
    const footer = {
        type: "CardFooter",
        // If there are no reactions, childrenProps can be omitted or empty.
        childrenProps: reactionBadges.length ? reactionBadges : undefined,
    };
    // 5. Assemble the VerticalCard with header, content, and footer.
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=828.js.map