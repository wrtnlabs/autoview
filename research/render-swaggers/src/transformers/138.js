export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Attempt to parse and format the creation date; fallback to raw string if invalid
    const parsedDate = new Date(input.created_at);
    const formattedDate = isNaN(parsedDate.getTime())
        ? input.created_at
        : parsedDate.toLocaleString();
    // Choose a renderer for the body: Markdown for markup formats, Text for plain text
    const bodyComponent = input.format === "txt"
        ? {
            type: "Text",
            content: input.body,
            variant: "body1",
        }
        : {
            type: "Markdown",
            content: input.body,
        };
    // Build a DataListItem for each attachment: label is file name, value is a download button
    const attachmentItems = input.files.map((file) => {
        // Construct display name with extension if present
        const filename = file.extension
            ? `${file.name}.${file.extension}`
            : file.name || "(unnamed)";
        return {
            type: "DataListItem",
            // Show the file name
            label: {
                type: "Text",
                content: filename,
                variant: "body2",
            },
            // Provide a download link
            value: {
                type: "Button",
                label: "Download",
                variant: "text",
                size: "small",
                href: file.url,
            },
        };
    });
    // Compose the card: header with icon, content with body, and footer with attachments (if any)
    const cardChildren = [];
    // Header: show title and creation date, with a file icon
    cardChildren.push({
        type: "CardHeader",
        title: input.title,
        description: formattedDate,
        startElement: {
            type: "Icon",
            id: "file",
            color: "blue",
            size: 20,
        },
    });
    // Content: render the body
    cardChildren.push({
        type: "CardContent",
        childrenProps: [bodyComponent],
    });
    // Footer: show attachments list if there are any files
    if (attachmentItems.length > 0) {
        cardChildren.push({
            type: "CardFooter",
            childrenProps: {
                type: "DataList",
                childrenProps: attachmentItems,
            },
        });
    }
    // Return a VerticalCard that adapts well to mobile and desktop
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
}
//# sourceMappingURL=138.js.map