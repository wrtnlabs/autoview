export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Format the creation timestamp into a human-readable string.
    // Fallback to raw string if invalid date.
    let formattedDate;
    const date = new Date(input.created_at);
    if (isNaN(date.getTime())) {
        formattedDate = input.created_at;
    }
    else {
        formattedDate = date.toLocaleString();
    }
    // Build the card header: show a comment icon, snapshot ID and creation time.
    const header = {
        type: "CardHeader",
        title: `Snapshot #${input.id}`,
        description: formattedDate,
        startElement: {
            type: "Icon",
            id: "comment",
            color: "gray",
            size: 24,
        },
    };
    // Build the card content: render the body using Markdown for better formatting.
    // Even if the format is html or txt, Markdown component will display plain text if no markdown syntax.
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.body,
        },
    };
    // If there are attachments, render them as a labeled DataList with download buttons.
    let footer;
    if (Array.isArray(input.files) && input.files.length > 0) {
        // Header label for attachments
        const attachmentLabel = {
            type: "Text",
            variant: "subtitle2",
            content: "Attachments",
        };
        // Transform each file into a DataListItem with a download button
        const items = input.files.map((file) => {
            // Compose the display name: omit dot if extension is null
            const nameWithExt = file.extension
                ? `${file.name}.${file.extension}`
                : file.name;
            const labelText = {
                type: "Text",
                variant: "body1",
                content: nameWithExt || "(unnamed)",
            };
            // Download button with a file icon
            const downloadButton = {
                type: "Button",
                variant: "text",
                color: "primary",
                size: "small",
                label: "Download",
                startElement: {
                    type: "Icon",
                    id: "download",
                    color: "blue",
                    size: 16,
                },
                href: file.url,
            };
            return {
                type: "DataListItem",
                label: labelText,
                value: downloadButton,
            };
        });
        const dataList = {
            type: "DataList",
            childrenProps: items,
        };
        footer = {
            type: "CardFooter",
            childrenProps: [attachmentLabel, dataList],
        };
    }
    // Assemble the vertical card with header, content, and optional footer.
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: footer
            ? [header, content, footer]
            : [header, content],
    };
    return verticalCard;
}
//# sourceMappingURL=31.js.map