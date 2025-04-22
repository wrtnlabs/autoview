export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Sort snapshots chronologically and pick the latest
    const sortedSnapshots = [...input.snapshots].sort((a, b) => a.created_at.localeCompare(b.created_at));
    const latestSnapshot = sortedSnapshots[sortedSnapshots.length - 1];
    // Helper to render attachment list if files are present
    function renderAttachments() {
        if (!latestSnapshot || !latestSnapshot.files || latestSnapshot.files.length === 0) {
            return undefined;
        }
        return {
            type: "DataList",
            childrenProps: latestSnapshot.files.map((file) => {
                // Compose a button linking to the file URL, labeled by its full name
                const fileName = file.extension ? `${file.name}.${file.extension}` : file.name;
                return {
                    type: "DataListItem",
                    label: {
                        type: "Icon",
                        id: "file",
                        color: "gray",
                        size: 20
                    },
                    value: {
                        type: "Button",
                        variant: "text",
                        label: fileName,
                        href: file.url
                    }
                };
            })
        };
    }
    // Build the list of children for the card content
    const contentChildren = [];
    if (latestSnapshot) {
        // Use Markdown component for the body (supports md, txt, html)
        contentChildren.push({
            type: "Markdown",
            content: latestSnapshot.body
        });
        // Push attachments list if any
        const attachmentsList = renderAttachments();
        if (attachmentsList) {
            contentChildren.push(attachmentsList);
        }
    }
    else {
        // Fallback text if there is no snapshot
        contentChildren.push({
            type: "Text",
            content: "No content available.",
            variant: "body2"
        });
    }
    // Main UI: a vertical card showing writer, timestamp, content, and attachments
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // Display writer identity as the title (fallback to string conversion)
                title: String(input.writer),
                // Show creation time of the comment
                description: `Posted at ${new Date(input.created_at).toLocaleString()}`,
                // Use an avatar with the writer's name initials
                startElement: {
                    type: "Avatar",
                    name: String(input.writer),
                    variant: "gray",
                    size: 32
                }
            },
            {
                type: "CardContent",
                childrenProps: contentChildren
            }
        ]
    };
}
//# sourceMappingURL=28.js.map