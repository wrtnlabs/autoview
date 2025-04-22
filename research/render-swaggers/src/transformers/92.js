export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // 1. Format the timestamp for human readability
    let formattedDate;
    try {
        formattedDate = new Date(input.created_at).toLocaleString();
    }
    catch (_a) {
        // Fallback to raw string if parsing fails
        formattedDate = input.created_at;
    }
    // 2. Build the card header with an icon and the timestamp
    const header = {
        type: "CardHeader",
        title: `Snapshot ${input.id}`,
        description: formattedDate,
        startElement: {
            type: "Icon",
            id: "comment", // FontAwesome comment icon
            color: "gray",
            size: 24
        }
    };
    // 3. Build the body content:
    //    - Use Markdown for markdown-formatted input
    //    - Fall back to plain Text for HTML or plain text
    let contentComponent;
    if (input.format === "md") {
        contentComponent = {
            type: "Markdown",
            content: input.body
        };
    }
    else {
        contentComponent = {
            type: "Text",
            variant: "body1",
            content: input.body
        };
    }
    const content = {
        type: "CardContent",
        childrenProps: contentComponent
    };
    // 4. Build the attachments list (if any)
    let attachmentsComponent;
    if (Array.isArray(input.files) && input.files.length > 0) {
        const items = input.files.map(file => {
            // Compose the filename with extension if present
            const name = file.extension != null && file.extension !== ""
                ? `${file.name}.${file.extension}`
                : file.name;
            // Label: the filename
            const label = {
                type: "Text",
                variant: "body2",
                content: name
            };
            // Value: a download button linking to the file
            const downloadButton = {
                type: "Button",
                variant: "text",
                color: "primary",
                size: "small",
                label: "Download",
                href: file.url
            };
            return {
                type: "DataListItem",
                label,
                value: downloadButton
            };
        });
        attachmentsComponent = {
            type: "DataList",
            childrenProps: items
        };
    }
    else {
        // No files: show a simple notice
        attachmentsComponent = {
            type: "Text",
            variant: "body2",
            content: "No attachments"
        };
    }
    const footer = {
        type: "CardFooter",
        childrenProps: attachmentsComponent
    };
    // 5. Combine header, content, and footer into a vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
    return card;
}
//# sourceMappingURL=92.js.map