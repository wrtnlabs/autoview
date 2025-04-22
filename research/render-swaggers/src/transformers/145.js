export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format ISO date to a readable string
    const formattedDate = (() => {
        try {
            const d = new Date(input.created_at);
            // Fallback to the raw string if invalid
            return isNaN(d.getTime()) ? input.created_at : d.toLocaleString();
        }
        catch (_a) {
            return input.created_at;
        }
    })();
    // Build the card header
    const header = {
        type: "CardHeader",
        title: input.title,
        // Show creation date in description
        description: `Created: ${formattedDate}`,
        // Show an icon to represent the article
        startElement: {
            type: "Icon",
            id: "file-alt", // fontawesome file icon
            size: 24,
            color: "blue",
        },
        // Show format (html/md/txt) as a chip on the right
        endElement: {
            type: "Chip",
            label: input.format.toUpperCase(),
            variant: "outlined",
            color: input.format === "html" ? "blue"
                : input.format === "md" ? "teal"
                    : "gray",
            size: "small",
        },
    };
    // Build the main content: use Markdown component for flexibility
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.body || "",
        },
    };
    // If there are files, build a DataList in the footer
    let footer;
    if (Array.isArray(input.files) && input.files.length > 0) {
        const items = input.files.map((file) => {
            // Compose file name with extension
            const fileName = file.extension ? `${file.name}.${file.extension}` : file.name;
            return {
                type: "DataListItem",
                // Label: file name
                label: {
                    type: "Text",
                    content: fileName,
                    variant: "body2",
                },
                // Value: download button
                value: {
                    type: "Button",
                    variant: "text",
                    size: "small",
                    href: file.url,
                    startElement: {
                        type: "Icon",
                        id: "download",
                        size: 16,
                        color: "green",
                    },
                    label: "Download",
                },
            };
        });
        footer = {
            type: "CardFooter",
            childrenProps: {
                type: "DataList",
                childrenProps: items,
            },
        };
    }
    // Assemble the vertical card with header, content, and optional footer
    const card = {
        type: "VerticalCard",
        childrenProps: footer ? [header, content, footer] : [header, content],
    };
    return card;
}
//# sourceMappingURL=145.js.map