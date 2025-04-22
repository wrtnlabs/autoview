export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: Format the created_at timestamp into a human-readable string
    const formattedDate = (() => {
        try {
            const date = new Date(input.created_at);
            // Fallback to raw string if invalid
            return isNaN(date.getTime())
                ? input.created_at
                : date.toLocaleString();
        }
        catch (_a) {
            return input.created_at;
        }
    })();
    // Helper: Map file format to an appropriate icon name
    const formatIconMap = {
        html: "file-code",
        md: "file-alt",
        txt: "file-alt",
    };
    const formatIconId = formatIconMap[input.format] || "file-alt";
    // Build the CardHeader with an icon chip for the format and timestamp in description
    const header = {
        type: "CardHeader",
        title: `Comment ID: ${input.id}`,
        description: `Created: ${formattedDate}`,
        // Show the format as a chip with an icon
        startElement: {
            type: "Chip",
            label: input.format.toUpperCase(),
            size: "small",
            variant: "outlined",
            // Prepend an icon inside the chip
            startElement: {
                type: "Icon",
                id: formatIconId,
                size: 16,
                color: "gray",
            },
        },
    };
    // Build the CardContent, selecting markdown when possible
    let contentComponent;
    if (input.format === "md" || input.format === "html") {
        // Use Markdown renderer for markdown or HTML content
        contentComponent = {
            type: "Markdown",
            content: input.body || "_No content provided_",
        };
    }
    else {
        // Fall back to plain text for other formats
        contentComponent = {
            type: "Text",
            variant: "body2",
            content: input.body || "No content provided.",
        };
    }
    const content = {
        type: "CardContent",
        childrenProps: contentComponent,
    };
    // Build the CardFooter with attachment buttons if any
    let footer;
    if (Array.isArray(input.files) && input.files.length > 0) {
        const buttons = input.files.map((file) => {
            // Compose a label including extension if present
            const filename = file.extension
                ? `${file.name}.${file.extension}`
                : file.name || "file";
            return {
                type: "Button",
                variant: "text",
                size: "small",
                color: "primary",
                label: filename,
                href: file.url,
                startElement: {
                    type: "Icon",
                    id: "file",
                    size: 16,
                    color: "gray",
                },
            };
        });
        footer = {
            type: "CardFooter",
            // Render each attachment as a button
            childrenProps: buttons,
        };
    }
    // Assemble the VerticalCard with header, content, and optional footer
    const card = {
        type: "VerticalCard",
        childrenProps: footer
            ? [header, content, footer]
            : [header, content],
    };
    return card;
}
//# sourceMappingURL=26.js.map