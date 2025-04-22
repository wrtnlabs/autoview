export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no comments, show a friendly markdown message
    if (!input.data || input.data.length === 0) {
        return {
            type: "Markdown",
            content: "**No comments available**"
        };
    }
    // Build a DataList of comments
    const items = input.data.map(comment => {
        // Use the last snapshot as the current content
        const snapshots = comment.snapshots || [];
        const latest = snapshots[snapshots.length - 1];
        // Derive a displayable writer name if possible, otherwise serialize
        let writerName;
        try {
            // assume writer may have a "name" property
            writerName = (comment.writer && (comment.writer.name || comment.writer.username))
                ? String(comment.writer.name || comment.writer.username)
                : JSON.stringify(comment.writer);
        }
        catch (_a) {
            writerName = String(comment.writer);
        }
        // Prepare the header label components: writer and timestamp
        const labelComponents = [
            {
                type: "Text",
                content: `Comment by ${writerName}`,
                variant: "subtitle2"
            },
            {
                type: "Text",
                content: comment.created_at,
                variant: "caption",
                color: "gray"
            }
        ];
        // Prepare the body content: markdown for the comment text
        const valueComponents = [];
        if (latest && typeof latest.body === "string") {
            valueComponents.push({
                type: "Markdown",
                content: latest.body
            });
        }
        // If there are attachments, show them as a group of chips
        if (latest && Array.isArray(latest.files) && latest.files.length > 0) {
            const chips = latest.files.map(file => {
                const ext = file.extension ? `.${file.extension}` : "";
                return {
                    type: "Chip",
                    label: `${file.name}${ext}`,
                    variant: "outlined",
                    startElement: {
                        type: "Icon",
                        id: "file",
                        size: 16,
                        color: "gray"
                    }
                };
            });
            valueComponents.push({
                type: "ChipGroup",
                childrenProps: chips
            });
        }
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents.length > 0 ? valueComponents : undefined
        };
    });
    // Return the complete DataList component
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=140.js.map