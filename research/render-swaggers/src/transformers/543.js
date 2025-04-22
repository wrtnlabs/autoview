export function transform($input) {
    return visualizeData($input);
}
// Transforms a team discussion comment into a visual card representation.
function visualizeData(input) {
    var _a;
    // HEADER: show author avatar or fallback icon, plus timestamps
    const author = input.author;
    const headerStart = author
        ? {
            type: "Avatar",
            src: author.avatar_url,
            name: author.login,
            size: 32,
            variant: "primary",
        }
        : {
            type: "Icon",
            id: "user-secret",
            size: 32,
            color: "gray",
        };
    const createdAt = new Date(input.created_at).toLocaleString();
    const editedAt = input.last_edited_at != null
        ? ` (edited at ${new Date(input.last_edited_at).toLocaleString()})`
        : "";
    const header = {
        type: "CardHeader",
        startElement: headerStart,
        title: (_a = author === null || author === void 0 ? void 0 : author.login) !== null && _a !== void 0 ? _a : "Unknown user",
        description: `Posted at ${createdAt}${editedAt}`,
    };
    // CONTENT: render the comment body using Markdown for better readability
    const content = {
        type: "CardContent",
        childrenProps: [
            {
                type: "Markdown",
                content: input.body,
            },
        ],
    };
    // FOOTER: display reaction counts as chips, skipping zero-count reactions
    let footer;
    if (input.reactions) {
        // Map each reaction key to a FontAwesome icon name
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
        const chips = [];
        Object.keys(iconMap).forEach((key) => {
            var _a;
            // @ts-ignore: dynamic access to reaction properties
            const count = (_a = input.reactions) === null || _a === void 0 ? void 0 : _a[key];
            if (count > 0) {
                chips.push({
                    type: "Chip",
                    label: count.toString(),
                    variant: "outlined",
                    startElement: {
                        type: "Icon",
                        id: iconMap[key],
                        size: 16,
                        color: "gray",
                    },
                });
            }
        });
        if (chips.length > 0) {
            footer = {
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "ChipGroup",
                        childrenProps: chips,
                    },
                ],
            };
        }
    }
    // ASSEMBLE: create a vertical card with header, body, and optional footer
    const cardChildren = [header, content];
    if (footer) {
        cardChildren.push(footer);
    }
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
}
//# sourceMappingURL=543.js.map