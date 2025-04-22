export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Determine a displayable label for the writer
    // If `writer.id` exists, use it; otherwise fallback to a generic "User"
    const writerLabel = typeof input.writer === "object" && input.writer !== null && "id" in input.writer && typeof input.writer.id === "string"
        ? input.writer.id
        : "User";
    // Grab the latest snapshot for display (most recent edit)
    const latestSnapshot = input.snapshots[input.snapshots.length - 1];
    // Prepare a list of attachment items (if any) to show as a DataList
    const attachmentItems = Array.isArray(latestSnapshot.files) && latestSnapshot.files.length > 0
        ? latestSnapshot.files.map((file) => {
            // Compose a filename with extension
            const filename = file.extension ? `${file.name}.${file.extension}` : file.name;
            return {
                type: "DataListItem",
                // Use a Text component for the filename label
                label: {
                    type: "Text",
                    variant: "body2",
                    content: filename,
                },
                // A button to download or open the file
                value: {
                    type: "Button",
                    variant: "text",
                    label: "Download",
                    href: file.url,
                },
            };
        })
        : [];
    // If there are attachments, wrap them in a DataList component
    const attachmentsDataList = attachmentItems.length > 0
        ? {
            type: "DataList",
            childrenProps: attachmentItems,
        }
        : undefined;
    return {
        // Use a vertical card to lay out the comment cleanly and responsively
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with the writer's label and creation timestamp
                type: "CardHeader",
                title: writerLabel,
                description: `Posted: ${new Date(input.created_at).toLocaleString()}`,
                startElement: {
                    // A simple user icon
                    type: "Icon",
                    id: "user",
                    color: "gray",
                    size: 24,
                },
            },
            {
                // Main content of the card: the body rendered as markdown
                type: "CardContent",
                childrenProps: [
                    {
                        type: "Markdown",
                        content: latestSnapshot.body,
                    },
                    // Include attachments list if any
                    ...(attachmentsDataList ? [attachmentsDataList] : []),
                ],
            },
            {
                // Footer showing number of revisions (snapshots)
                type: "CardFooter",
                childrenProps: {
                    type: "Chip",
                    label: `Revisions: ${input.snapshots.length}`,
                    color: "info",
                    size: "small",
                    variant: "outlined",
                },
            },
        ],
    };
}
//# sourceMappingURL=148.js.map