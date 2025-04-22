export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Choose the latest snapshot to display (most recent edit)
    const latestSnapshot = input.snapshots[input.snapshots.length - 1];
    // Format creation date for display
    const formattedDate = new Date(input.created_at).toLocaleString();
    // Build the "startElement" for the header:
    // Try to use writer.avatarUrl & writer.name if available, else fall back to a user icon
    let startElement;
    if (input.writer &&
        typeof input.writer === "object" &&
        typeof input.writer.avatarUrl === "string") {
        startElement = {
            type: "Avatar",
            src: input.writer.avatarUrl,
            name: (_a = input.writer.name) !== null && _a !== void 0 ? _a : undefined,
            variant: "primary",
            size: 40,
        };
    }
    else {
        startElement = {
            type: "Icon",
            id: "user",
            size: 32,
            color: "gray",
        };
    }
    // Build CardHeader: shows writer name, date, and a "Reply" chip if this is a reply
    const header = Object.assign({ type: "CardHeader", startElement, title: (_b = input.writer.name) !== null && _b !== void 0 ? _b : "Anonymous", description: formattedDate }, (input.parent_id && {
        endElement: {
            type: "Chip",
            label: "Reply",
            variant: "outlined",
            color: "info",
        },
    }));
    // Build CardContent children: markdown body plus any images from attachments
    const contentChildren = [];
    // Render the comment body as markdown for rich text support
    contentChildren.push({
        type: "Markdown",
        content: latestSnapshot
            ? latestSnapshot.body
            : "_No content available_",
    });
    // If there are attached files, render each as an image below the markdown
    if (latestSnapshot &&
        Array.isArray(latestSnapshot.files) &&
        latestSnapshot.files.length > 0) {
        for (const file of latestSnapshot.files) {
            // Skip if url is invalid
            if (!file.url)
                continue;
            contentChildren.push({
                type: "Image",
                src: file.url,
                alt: file.name
                    ? `${file.name}${file.extension ? "." + file.extension : ""}`
                    : undefined,
            });
        }
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Wrap the comment in a vertical card for responsive display on all devices
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=139.js.map