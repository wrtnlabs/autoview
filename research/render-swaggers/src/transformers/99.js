export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // 1. Compose the card header: show a comment icon and identifier & timestamp
    const header = {
        type: "CardHeader",
        title: `Comment ${input.id}`,
        // Render a human‐friendly timestamp
        description: new Date(input.created_at).toLocaleString(),
        startElement: {
            type: "Icon",
            id: "comment",
            color: "blue",
            size: 24,
        },
    };
    // 2. Render the comment body: prefer Markdown if format is markdown
    let bodyComponent;
    if (input.format === "md") {
        bodyComponent = {
            type: "Markdown",
            content: input.body,
        };
    }
    else {
        // For HTML or plain text, fall back to a Text component
        bodyComponent = {
            type: "Text",
            content: input.body,
            variant: "body1",
        };
    }
    // 3. Collect children for the card content
    const contentChildren = [bodyComponent];
    // 4. If there are attachments, render them as a DataList of download buttons
    if (input.files && input.files.length > 0) {
        // Divider before attachments for visual separation
        contentChildren.push({
            type: "Divider",
            orientation: "horizontal",
            color: "#e0e0e0",
        });
        // Map each file to a DataListItem
        const dataListItems = input.files.map((file) => {
            // Build a filename with extension if present
            const filename = file.extension ? `${file.name}.${file.extension}` : file.name;
            // Label showing the filename
            const labelText = {
                type: "Text",
                content: filename,
                variant: "body2",
            };
            // Download button with icon
            const downloadButton = {
                type: "Button",
                variant: "text",
                color: "teal",
                startElement: {
                    type: "Icon",
                    id: "download",
                    color: "teal",
                    size: 16,
                },
                label: "Download",
                href: file.url,
            };
            return {
                type: "DataListItem",
                label: labelText,
                value: downloadButton,
            };
        });
        // Assemble the DataList component
        const attachmentsList = {
            type: "DataList",
            childrenProps: dataListItems,
        };
        contentChildren.push(attachmentsList);
    }
    // Wrap the body and optional attachments in CardContent
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // 5. Footer: show the format of the comment in a colored chip
    const formatColorMap = {
        html: "orange",
        md: "green",
        txt: "gray",
    };
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Chip",
            label: input.format.toUpperCase(),
            color: formatColorMap[input.format] || "gray",
            variant: "outlined",
            size: "small",
        },
    };
    // 6. Assemble into a VerticalCard for a responsive, stacked layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=99.js.map