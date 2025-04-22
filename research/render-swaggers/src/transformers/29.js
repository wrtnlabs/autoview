export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure pagination and comments list
    const { pagination: { current, pages, records }, data: comments, } = input;
    // Helper: extract latest snapshot from a comment
    function getLatestSnapshot(comment) {
        const { snapshots } = comment;
        if (!Array.isArray(snapshots) || snapshots.length === 0)
            return null;
        return snapshots[snapshots.length - 1];
    }
    // Build DataListItemProps for each comment
    const dataListItems = comments.map((comment) => {
        // Safely derive a display name for the writer
        let writerName = "Anonymous";
        try {
            if (comment.writer && typeof comment.writer === "object") {
                const w = comment.writer;
                writerName = w.name || w.id || JSON.stringify(w);
            }
            else if (comment.writer != null) {
                writerName = String(comment.writer);
            }
        }
        catch (_a) {
            /* fallback to Anonymous */
        }
        // Prepare an icon for the user
        const userIcon = {
            type: "Icon",
            id: "user", // FontAwesome "user" icon
            size: 20,
            color: "gray",
        };
        // Text component for writer
        const writerText = {
            type: "Text",
            content: writerName,
            variant: "body1",
            color: "primary",
        };
        const latest = getLatestSnapshot(comment);
        // If there's no snapshot, show placeholder text
        const bodyContent = latest
            ? latest.body
            : "_No content available_";
        // Use markdown renderer for comment body, allowing rich formatting
        const bodyMarkdown = {
            type: "Markdown",
            content: bodyContent,
        };
        // Compose DataListItemProps: label shows writer, value shows the comment body
        const item = {
            type: "DataListItem",
            // label can be an array of presentational components
            label: [userIcon, writerText],
            // value can also be an array; here a single markdown component
            value: [bodyMarkdown],
        };
        return item;
    });
    // If there are no comments, show a simple Text notification
    const contentComponent = {
        type: "CardContent",
        childrenProps: dataListItems.length > 0
            ? {
                type: "DataList",
                childrenProps: dataListItems,
            }
            : {
                type: "Text",
                content: "_No comments to display_",
                variant: "body2",
                color: "disabled",
            },
    };
    // Card header summarizing pagination
    const headerComponent = {
        type: "CardHeader",
        title: `Comments (Page ${current}/${pages})`,
        description: `${records} total`,
        startElement: {
            type: "Icon",
            id: "comments",
            size: 24,
            color: "blue",
        },
    };
    // Compose a vertical card wrapping header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [headerComponent, contentComponent],
    };
    return card;
}
//# sourceMappingURL=29.js.map