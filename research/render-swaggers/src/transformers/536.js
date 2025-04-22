export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No discussions available.",
            variant: "body1",
            color: "gray",
        };
    }
    // Build a list of DataListItemProps for each discussion
    const childrenProps = input.map((discussion) => {
        // Determine avatar or fallback icon if no author
        const authorAvatar = discussion.author
            ? {
                type: "Avatar",
                src: discussion.author.avatar_url,
                name: discussion.author.login,
                variant: "info",
                size: 32,
            }
            : {
                type: "Icon",
                id: "user",
                color: "gray",
                size: 32,
            };
        // Format creation date into a human-friendly string
        const createdAt = new Date(discussion.created_at);
        const dateString = createdAt.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        // Generate a short preview of the discussion body
        const raw = discussion.body || "";
        const preview = raw.length > 140 ? raw.slice(0, 140).trim() + "…" : raw;
        // If reactions are present, show a chip with a heart icon
        const reactionChip = discussion.reactions != null
            ? {
                type: "Chip",
                label: String(discussion.reactions.total_count),
                variant: "outlined",
                color: "pink",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "heart",
                    color: "pink",
                    size: 16,
                },
            }
            : null;
        // Assemble the label area: avatar + title + date
        const labelComponents = [
            authorAvatar,
            {
                type: "Text",
                content: discussion.title,
                variant: "h6",
                color: "primary",
                lineClamp: 1, // prevent overflow
            },
            {
                type: "Text",
                content: dateString,
                variant: "caption",
                color: "gray",
            },
        ];
        // Assemble the value area: body preview + optional reactions chip
        const valueComponents = [
            {
                type: "Text",
                content: preview,
                variant: "body2",
                lineClamp: 3, // clamp long text
            },
        ];
        if (reactionChip) {
            valueComponents.push(reactionChip);
        }
        // Return the DataListItemProps for this discussion
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Wrap all items in a DataList for responsive display
    return {
        type: "DataList",
        childrenProps: childrenProps,
    };
}
//# sourceMappingURL=536.js.map