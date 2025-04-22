export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { id, created_at, format, body, files } = input;
    // Format creation timestamp into a human-readable form; fall back to raw if invalid
    let formattedDate;
    const parsed = new Date(created_at);
    if (!isNaN(parsed.getTime())) {
        formattedDate = parsed.toLocaleString();
    }
    else {
        formattedDate = created_at;
    }
    // Card header with a comment icon, truncated ID, and timestamp
    const header = {
        type: "CardHeader",
        title: `Comment ${id.slice(0, 8)}`,
        description: `Created at ${formattedDate}`,
        startElement: {
            type: "Icon",
            id: "comment",
            color: "blue",
            size: 24,
        },
    };
    // Pick Markdown for markdown-format bodies, otherwise plain text
    const bodyComponent = format === "md"
        ? {
            type: "Markdown",
            content: body,
        }
        : {
            type: "Text",
            content: body,
            variant: "body1",
        };
    const content = {
        type: "CardContent",
        childrenProps: [bodyComponent],
    };
    // If attachments exist, render a DataList of download buttons
    let footerComponent;
    if (files && files.length > 0) {
        const listItems = files.map((file) => {
            // Build display name including extension
            const name = file.extension ? `${file.name}.${file.extension}` : file.name;
            return {
                type: "DataListItem",
                label: [
                    {
                        type: "Icon",
                        id: "file",
                        color: "gray",
                        size: 20,
                    },
                    {
                        type: "Text",
                        content: name,
                        variant: "body1",
                    },
                ],
                value: {
                    type: "Button",
                    label: "Download",
                    href: file.url,
                    variant: "text",
                },
            };
        });
        footerComponent = {
            type: "CardFooter",
            childrenProps: {
                type: "DataList",
                childrenProps: listItems,
            },
        };
    }
    // Assemble into a vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: footerComponent
            ? [header, content, footerComponent]
            : [header, content],
    };
    return card;
}
//# sourceMappingURL=149.js.map