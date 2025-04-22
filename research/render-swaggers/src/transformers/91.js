export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Safely extract a displayable writer name
    let writerName = "User";
    const w = input.writer;
    if (typeof w === "string") {
        writerName = w;
    }
    else if (typeof (w === null || w === void 0 ? void 0 : w.name) === "string") {
        writerName = w.name;
    }
    else if (typeof (w === null || w === void 0 ? void 0 : w.id) === "string") {
        writerName = w.id;
    }
    // Choose the latest snapshot; fallback to a placeholder if none
    const snapshots = Array.isArray(input.snapshots) ? input.snapshots : [];
    const latestSnapshot = snapshots.length
        ? snapshots.reduce((prev, cur) => prev.created_at > cur.created_at ? prev : cur)
        : null;
    const bodyContent = latestSnapshot
        ? latestSnapshot.body
        : "_No content available._";
    // Build a list of attachment items if there are any files
    let attachmentsList;
    if (latestSnapshot && Array.isArray(latestSnapshot.files) && latestSnapshot.files.length > 0) {
        const items = latestSnapshot.files.map((file) => {
            // Compose a filename with extension
            const ext = file.extension ? `.${file.extension}` : "";
            const filename = `${file.name}${ext}`;
            const labelText = {
                type: "Text",
                content: filename,
                variant: "body2",
            };
            const downloadButton = {
                type: "Button",
                label: "Download",
                variant: "text",
                size: "small",
                href: file.url,
            };
            return {
                type: "DataListItem",
                label: labelText,
                value: downloadButton,
            };
        });
        attachmentsList = {
            type: "DataList",
            childrenProps: items,
        };
    }
    // Optional chip to show parent comment linkage
    let replyChip;
    if (typeof input.parent_id === "string" && input.parent_id.length > 0) {
        replyChip = {
            type: "Chip",
            label: `Reply to ${input.parent_id}`,
            variant: "outlined",
            size: "small",
            color: "secondary",
        };
    }
    // Card header with an icon for the user
    const header = {
        type: "CardHeader",
        title: `Comment by ${writerName}`,
        description: new Date(input.created_at).toLocaleString(),
        startElement: {
            type: "Icon",
            id: "user",
            size: 24,
            color: "blue",
        },
        endElement: replyChip,
    };
    // Card content: markdown of body + attachments list if any
    const contentChildren = [
        {
            type: "Markdown",
            content: bodyContent,
        },
    ];
    if (attachmentsList) {
        contentChildren.push(attachmentsList);
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Assemble into a vertical card for responsive display
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=91.js.map