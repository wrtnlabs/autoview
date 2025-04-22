export function transform($input) {
    return visualizeData($input);
}
// Transforms a GitHub team discussion into a responsive, icon-rich VerticalCard layout.
function visualizeData(input) {
    var _a, _b;
    // Helper: format ISO timestamp to a locale-sensitive string
    const formatDate = (iso) => new Date(iso).toLocaleString();
    // Build a human-readable description string, including number, dates, and flags
    const descriptionParts = [];
    // Discussion number
    descriptionParts.push(`#${input.number}`);
    // Creation timestamp
    descriptionParts.push(`created ${formatDate(input.created_at)}`);
    // Last updated timestamp (if changed)
    if (input.updated_at && input.updated_at !== input.created_at) {
        descriptionParts.push(`updated ${formatDate(input.updated_at)}`);
    }
    // Pinned and private indicators
    if (input.pinned) {
        descriptionParts.push("📌 Pinned");
    }
    if (input.private) {
        descriptionParts.push("🔒 Private");
    }
    const headerDescription = descriptionParts.join(" · ");
    // Build footer metrics: comments count and +1 reactions
    const commentCount = input.comments_count;
    const upvotes = (_b = (_a = input.reactions) === null || _a === void 0 ? void 0 : _a["+1"]) !== null && _b !== void 0 ? _b : 0;
    // Compose the VerticalCard with header, markdown content, and footer with icons
    return {
        type: "VerticalCard",
        childrenProps: [
            Object.assign({ type: "CardHeader", title: input.title, description: headerDescription }, (input.author && {
                startElement: {
                    type: "Avatar",
                    src: input.author.avatar_url,
                    name: input.author.login,
                },
            })),
            // Content: render the body as Markdown for rich formatting
            {
                type: "CardContent",
                childrenProps: [
                    {
                        type: "Markdown",
                        content: input.body,
                    },
                ],
            },
            // Footer: icon + count for comments and upvotes
            {
                type: "CardFooter",
                childrenProps: [
                    // Comments icon and count
                    {
                        type: "Icon",
                        id: "comments",
                        color: "gray",
                        size: 16,
                    },
                    {
                        type: "Text",
                        content: String(commentCount),
                        variant: "body2",
                    },
                    // Upvote icon and count
                    {
                        type: "Icon",
                        id: "thumbs-up",
                        color: "gray",
                        size: 16,
                    },
                    {
                        type: "Text",
                        content: String(upvotes),
                        variant: "body2",
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=537.js.map