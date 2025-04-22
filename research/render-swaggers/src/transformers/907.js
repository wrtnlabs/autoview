export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare the avatar or fallback icon for the author
    const authorElement = input.author && input.author.avatar_url
        ? {
            type: "Avatar",
            src: input.author.avatar_url,
            name: input.author.login,
            variant: "primary",
            size: 32
        }
        : {
            type: "Icon",
            id: "user",
            color: "gray",
            size: 32
        };
    // Header component displaying title, number, and pinned status
    const header = {
        type: "CardHeader",
        title: input.title,
        description: `#${input.number} • ${input.private ? "Private" : "Public"}`,
        startElement: authorElement,
        endElement: {
            type: "Chip",
            label: input.pinned ? "Pinned" : "Discussion",
            variant: "filled",
            color: input.pinned ? "info" : "gray",
            size: "small"
        }
    };
    // Convert the body (plain markdown) to a markdown component
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.body
        }
    };
    // Helper to format ISO date-time strings for display
    function formatDateTime(value) {
        try {
            return new Date(value).toLocaleString();
        }
        catch (_a) {
            return value;
        }
    }
    // Data list of metadata: comments, created and updated timestamps
    const metaList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Comments", variant: "body2" }],
                value: {
                    type: "Badge",
                    count: input.comments_count,
                    childrenProps: {
                        type: "Icon",
                        id: "comment",
                        color: "blue",
                        size: 16
                    }
                }
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Created", variant: "body2" }],
                value: { type: "Text", content: formatDateTime(input.created_at), variant: "caption" }
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Updated", variant: "body2" }],
                value: { type: "Text", content: input.updated_at ? formatDateTime(input.updated_at) : "—", variant: "caption" }
            }
        ]
    };
    // Footer wraps the metadata list
    const footer = {
        type: "CardFooter",
        childrenProps: metaList
    };
    // Compose a vertical card that stacks header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
    return card;
}
//# sourceMappingURL=907.js.map