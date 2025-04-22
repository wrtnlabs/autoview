export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Determine a display name for the writer (fallback to JSON if unknown)
    const writerName = (() => {
        const w = input.writer;
        if (w == null)
            return "Unknown";
        if (typeof w === "string")
            return w;
        if (typeof w === "object") {
            if (typeof w.name === "string")
                return w.name;
            if (typeof w.username === "string")
                return w.username;
        }
        // Fallback to stringify the object
        try {
            return JSON.stringify(w);
        }
        catch (_a) {
            return String(w);
        }
    })();
    // Format the creation timestamp in a locale‐sensitive way (fallback to raw string)
    const createdAtLabel = (() => {
        try {
            return new Date(input.created_at).toLocaleString();
        }
        catch (_a) {
            return input.created_at;
        }
    })();
    // Pick the latest snapshot for display (or empty stub)
    const snapshots = input.snapshots || [];
    const latestSnapshot = snapshots[snapshots.length - 1];
    const bodyContent = (_a = latestSnapshot === null || latestSnapshot === void 0 ? void 0 : latestSnapshot.body) !== null && _a !== void 0 ? _a : "_No content_";
    // Build an attachments list if there are any files in the snapshot
    let attachmentsList;
    if ((_b = latestSnapshot === null || latestSnapshot === void 0 ? void 0 : latestSnapshot.files) === null || _b === void 0 ? void 0 : _b.length) {
        attachmentsList = {
            type: "DataList",
            childrenProps: latestSnapshot.files.map((file) => {
                const filename = file.extension
                    ? `${file.name}.${file.extension}`
                    : file.name;
                const item = {
                    type: "DataListItem",
                    // Show file name in bold via Markdown
                    label: {
                        type: "Markdown",
                        content: `**${filename}**`,
                    },
                    // Provide a text button with an attachment icon linking to the file URL
                    value: {
                        type: "Button",
                        variant: "text",
                        label: filename,
                        href: file.url,
                        startElement: {
                            type: "Icon",
                            id: "paperclip",
                            size: 16,
                        },
                    },
                };
                return item;
            }),
        };
    }
    // Compose the CardContent children: main Markdown and optional attachments
    const cardContentChildren = [
        {
            type: "Markdown",
            content: bodyContent,
        },
    ];
    if (attachmentsList) {
        cardContentChildren.push(attachmentsList);
    }
    // Header showing writer and timestamp
    const cardHeader = {
        type: "CardHeader",
        title: writerName,
        description: createdAtLabel,
    };
    // Main body of the comment
    const cardContent = {
        type: "CardContent",
        childrenProps: cardContentChildren,
    };
    // Footer indicating edit count if more than one snapshot
    const cardFooter = snapshots.length > 1
        ? {
            type: "CardFooter",
            childrenProps: {
                type: "Text",
                content: [`Edited ${snapshots.length} times`],
            },
        }
        : undefined;
    // Assemble a vertical card with header, content, and optional footer
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: cardFooter
            ? [cardHeader, cardContent, cardFooter]
            : [cardHeader, cardContent],
    };
    return verticalCard;
}
//# sourceMappingURL=89.js.map