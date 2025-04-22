export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format dates in locale string
    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Determine writer display (fallback to JSON string)
    let writerInfo;
    if (input.writer && typeof input.writer === "object") {
        writerInfo =
            // @ts-ignore
            input.writer.name ||
                // @ts-ignore
                input.writer.id ||
                JSON.stringify(input.writer);
    }
    else {
        writerInfo = String(input.writer);
    }
    // Sort snapshots chronologically and pick the latest
    const snapshots = [...input.snapshots].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    const latestSnapshot = snapshots.length > 0
        ? snapshots[snapshots.length - 1]
        : { id: "", created_at: "", format: "txt", body: "", files: [] };
    // Compute number of edits (initial snapshot excluded)
    const editCount = Math.max(0, snapshots.length - 1);
    // Build CardHeader: shows comment ID, creation time, and writer info
    const header = {
        type: "CardHeader",
        title: `Comment #${input.id}`,
        description: formatDate(input.created_at),
        startElement: {
            type: "Icon",
            id: "user",
            color: "blue",
            size: 24,
        },
        endElement: {
            type: "Text",
            content: writerInfo,
            variant: "body2",
            color: "secondary",
            lineClamp: 1,
        },
    };
    // Build CardContent: markdown body plus attachment buttons
    const contentChildren = [];
    // Render the latest snapshot body as markdown
    contentChildren.push({
        type: "Markdown",
        content: latestSnapshot.body,
    });
    // Render attachments (if any) as text buttons with a file icon
    latestSnapshot.files.forEach((file) => {
        const filename = file.extension
            ? `${file.name}.${file.extension}`
            : file.name;
        contentChildren.push({
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            label: filename,
            href: file.url,
            startElement: {
                type: "Icon",
                id: "file",
                size: 16,
                color: "gray",
            },
        });
    });
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Build CardFooter: chip indicating edit status
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Chip",
            label: editCount > 0 ? `Edited ${editCount} times` : "New",
            variant: "outlined",
            color: editCount > 0 ? "warning" : "success",
            size: "small",
        },
    };
    // Assemble a responsive vertical card
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=96.js.map