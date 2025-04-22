export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Safely extract author information, falling back to placeholders when necessary.
    const author = input.author;
    const authorName = (_a = author === null || author === void 0 ? void 0 : author.login) !== null && _a !== void 0 ? _a : "Unknown";
    // Format the creation date for display; if invalid, fall back to the raw string.
    const createdAt = (() => {
        try {
            return new Date(input.created_at).toLocaleString();
        }
        catch (_a) {
            return input.created_at;
        }
    })();
    // Build a list of reaction chips using FontAwesome icon names.
    // Only include reactions with a count greater than zero.
    const reactionChips = [];
    if (input.reactions) {
        const iconMap = {
            "+1": "thumbs-up",
            "-1": "thumbs-down",
            laugh: "laugh",
            confused: "frown",
            heart: "heart",
            hooray: "tada",
            eyes: "eye",
            rocket: "rocket",
        };
        // Iterate through known reaction keys
        Object.keys(iconMap).forEach((key) => {
            const count = input.reactions[key];
            if (count > 0) {
                reactionChips.push({
                    type: "Chip",
                    label: String(count),
                    startElement: {
                        type: "Icon",
                        id: iconMap[key],
                        size: 16,
                    },
                });
            }
        });
    }
    // Compose the card's header, content, and optional footer
    const cardChildren = [
        {
            type: "CardHeader",
            title: authorName,
            description: createdAt,
            // Show the author's avatar when available
            startElement: {
                type: "Avatar",
                src: author === null || author === void 0 ? void 0 : author.avatar_url,
                name: authorName,
            },
        },
        {
            type: "CardContent",
            // Render the comment body as markdown for richer formatting
            childrenProps: {
                type: "Markdown",
                content: input.body,
            },
        },
    ];
    // If there are any reactions, append a footer containing a chip group
    if (reactionChips.length > 0) {
        cardChildren.push({
            type: "CardFooter",
            childrenProps: {
                type: "ChipGroup",
                childrenProps: reactionChips,
            },
        });
    }
    // Return the assembled vertical card
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
}
//# sourceMappingURL=912.js.map