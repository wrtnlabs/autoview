export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Safely extract writer's name if available
    const writerName = input.writer && typeof input.writer.name === "string"
        ? input.writer.name
        : "Unknown";
    // Prepare a chip for the comment ID
    const idChip = {
        type: "Chip",
        label: `#${input.id}`,
        variant: "outlined",
        color: "primary",
        size: "small",
    };
    // Optionally prepare a chip for the parent ID if it exists
    const parentChip = input.parent_id
        ? {
            type: "Chip",
            label: `Parent: ${input.parent_id}`,
            variant: "outlined",
            color: "secondary",
            size: "small",
        }
        : undefined;
    // Build the header: show writer, creation time, and ID chips
    const header = Object.assign({ type: "CardHeader", title: writerName, description: `Created at: ${input.created_at}`, startElement: idChip }, (parentChip && { endElement: parentChip }));
    // Build the content: list snapshots if any, else show a placeholder text
    let contentChildren;
    if (input.snapshots.length === 0) {
        // No snapshots: show a friendly message
        contentChildren = {
            type: "Text",
            variant: "body2",
            content: "No revisions available.",
        };
    }
    else {
        // Transform each snapshot into a DataListItemProps
        const items = input.snapshots.map((snapshot, index) => {
            // Compose markdown content for body and attachments
            let md = snapshot.body;
            if (snapshot.files && snapshot.files.length > 0) {
                const attachmentsMd = snapshot.files
                    .map((f) => `- [${f.name}${f.extension ? "." + f.extension : ""}](${f.url})`)
                    .join("\n");
                md += `\n\n**Attachments:**\n${attachmentsMd}`;
            }
            return {
                type: "DataListItem",
                // Use Text components for label: snapshot index and timestamp
                label: [
                    {
                        type: "Text",
                        variant: "subtitle2",
                        content: `Revision ${index + 1} (${snapshot.id})`,
                    },
                    {
                        type: "Text",
                        variant: "caption",
                        content: `At: ${snapshot.created_at}`,
                    },
                ],
                // Render the snapshot content as markdown
                value: {
                    type: "Markdown",
                    content: md,
                },
            };
        });
        // Wrap the items array into a DataList component
        contentChildren = {
            type: "DataList",
            childrenProps: items,
        };
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Footer: show total number of snapshots
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Chip",
            label: `Revisions: ${input.snapshots.length}`,
            color: "info",
            size: "small",
        },
    };
    // Compose final VerticalCard to display the comment
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=98.js.map