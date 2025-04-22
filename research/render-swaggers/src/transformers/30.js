export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format the writer field into a display string.
    const writerDisplay = (() => {
        if (typeof input.writer === "string")
            return input.writer;
        // Attempt to pull out a 'name' property if it's an object
        if (input.writer && typeof input.writer === "object" && "name" in input.writer && typeof input.writer.name === "string") {
            return input.writer.name;
        }
        // Fallback to JSON string
        try {
            return JSON.stringify(input.writer);
        }
        catch (_a) {
            return String(input.writer);
        }
    })();
    // Format creation timestamp in local representation
    const createdAtDisplay = (() => {
        const date = new Date(input.created_at);
        // If invalid date, return raw string
        return isNaN(date.getTime())
            ? input.created_at
            : date.toLocaleString();
    })();
    // If there are no snapshots, render an empty state
    if (!Array.isArray(input.snapshots) || input.snapshots.length === 0) {
        return {
            type: "VerticalCard",
            childrenProps: [
                {
                    type: "CardHeader",
                    title: writerDisplay,
                    description: createdAtDisplay,
                    startElement: {
                        type: "Icon",
                        id: "user",
                        size: 24,
                        color: "gray",
                    },
                },
                {
                    type: "CardContent",
                    childrenProps: [
                        {
                            type: "Text",
                            content: "No content available.",
                        },
                    ],
                },
            ],
        };
    }
    // Use the latest snapshot for display
    const latest = input.snapshots[input.snapshots.length - 1];
    // Prepare Markdown component for the body
    const markdownComponent = {
        type: "Markdown",
        content: latest.body,
    };
    // Prepare image attachments, if any
    const attachmentImages = (latest.files || []).map((file) => {
        // Build an alt text: name + extension
        const ext = file.extension ? `.${file.extension}` : "";
        const alt = file.name + ext;
        return {
            type: "Image",
            src: file.url,
            alt,
        };
    });
    // Assemble childrenProps for the card
    const cardChildren = [
        {
            type: "CardHeader",
            title: writerDisplay,
            description: createdAtDisplay,
            // Display a user icon in the header
            startElement: {
                type: "Icon",
                id: "user",
                size: 24,
                color: "gray",
            },
        },
        {
            type: "CardContent",
            // Show the markdown body first
            childrenProps: markdownComponent,
        },
    ];
    // Only add a footer with attachments if there are images
    if (attachmentImages.length > 0) {
        cardChildren.push({
            type: "CardFooter",
            childrenProps: attachmentImages,
        });
    }
    // Return a vertical card containing header, content, and optional footer
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
}
//# sourceMappingURL=30.js.map