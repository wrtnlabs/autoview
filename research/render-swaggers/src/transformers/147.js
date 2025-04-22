export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure pagination and comment list from input
    const { pagination, data: comments } = input;
    // Helper to format ISO date strings into human-readable form
    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Build a DataListItemProps for each comment
    const listItems = comments.map(comment => {
        const { writer, created_at, snapshots } = comment;
        // Attempt to extract a display name from writer object
        const name = writer && typeof writer === "object" && "name" in writer && typeof writer.name === "string"
            ? writer.name
            : "Unknown";
        // Build label: avatar (if available) or a user icon + name and timestamp
        const labelElements = [];
        if (writer &&
            typeof writer === "object" &&
            "avatarUrl" in writer &&
            typeof writer.avatarUrl === "string") {
            // Use an Avatar component if the writer provided an avatar URL
            labelElements.push({
                type: "Avatar",
                src: writer.avatarUrl,
                name,
            });
        }
        else {
            // Fallback to a generic user icon
            labelElements.push({
                type: "Icon",
                id: "user",
                size: 24,
                color: "gray",
            });
        }
        // Append the writer name and creation timestamp
        labelElements.push({
            type: "Text",
            variant: "subtitle2",
            content: [`${name} • ${formatDate(created_at)}`],
        });
        // Pick the most recent snapshot for display
        const lastSnapshot = snapshots && snapshots.length > 0
            ? snapshots[snapshots.length - 1]
            : { body: "No content available", files: [] };
        // Build value: markdown body + any attachments as images
        const valueElements = [
            {
                type: "Markdown",
                content: lastSnapshot.body,
            },
        ];
        if (Array.isArray(lastSnapshot.files) && lastSnapshot.files.length > 0) {
            lastSnapshot.files.forEach(file => {
                // Each attachment rendered as an image
                valueElements.push({
                    type: "Image",
                    src: file.url,
                    alt: file.name,
                });
            });
        }
        return {
            type: "DataListItem",
            label: labelElements,
            value: valueElements,
        };
    });
    // Compose the main data list of comments
    const commentList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Wrap the list in a vertical card with header and footer for context
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Comments",
                description: `Page ${pagination.current} of ${pagination.pages}`,
            },
            {
                type: "CardContent",
                // Nest the comment list; childrenProps accepts a single PresentationComponent
                childrenProps: commentList,
            },
            {
                type: "CardFooter",
                // Show total record count in a caption text
                childrenProps: {
                    type: "Text",
                    variant: "caption",
                    content: [`Total comments: ${pagination.records}`],
                },
            },
        ],
    };
    return card;
}
//# sourceMappingURL=147.js.map