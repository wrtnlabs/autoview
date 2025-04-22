export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to safely format the creation date
    const formattedDate = (() => {
        const date = new Date(input.created_at);
        // If invalid date, fallback to original string
        return isNaN(date.getTime())
            ? input.created_at
            : date.toLocaleString();
    })();
    // Prepare the markdown content based on the input format
    const markdownContent = (() => {
        switch (input.format) {
            case "md":
                // Already markdown
                return input.body;
            case "txt":
                // Wrap plain text in a code block for readability
                return "\n" + input.body + "\n```";
            case "html":
                // Show raw HTML inside a fenced code block to avoid unintended rendering
                return "```html\n" + input.body + "\n```";
            default:
                // Unknown format, treat as plain text
                return input.body;
        }
    })();
    // If there are attachments, build a DataList of download buttons
    const attachmentsList = Array.isArray(input.files) && input.files.length > 0
        ? {
            type: "DataList",
            childrenProps: input.files.map((file) => {
                // Construct display name with extension, handling null extension
                const displayName = file.name + (file.extension ? "." + file.extension : "");
                return {
                    type: "DataListItem",
                    // Label consisting of a file icon and the file name
                    label: [
                        {
                            type: "Icon",
                            id: "file", // generic file icon
                            color: "gray",
                            size: 20,
                        },
                        {
                            type: "Text",
                            content: displayName,
                        },
                    ],
                    // A "Download" button linking to the file URL
                    value: {
                        type: "Button",
                        label: "Download",
                        variant: "text",
                        color: "primary",
                        href: file.url,
                    },
                };
            }),
        }
        : undefined;
    // Build the card header with an icon and key metadata
    const header = {
        type: "CardHeader",
        title: `Comment ${input.id}`,
        description: formattedDate,
        startElement: {
            type: "Icon",
            id: "comment",
            color: "blue",
            size: 24,
        },
    };
    // Card content: the comment body as markdown and optionally the attachments
    const contentChildren = [
        {
            type: "Markdown",
            content: markdownContent,
        },
    ];
    if (attachmentsList) {
        contentChildren.push(attachmentsList);
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // If there are attachments, include a footer summarizing the count
    const footer = attachmentsList
        ? {
            type: "CardFooter",
            childrenProps: {
                type: "Text",
                content: `Attachments: ${input.files.length}`,
                variant: "body2",
                color: "tertiary",
            },
        }
        : undefined;
    // Compose the vertical card
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [
            header,
            content,
            // Only include footer if attachments exist
            ...(footer ? [footer] : []),
        ],
    };
    return verticalCard;
}
//# sourceMappingURL=142.js.map