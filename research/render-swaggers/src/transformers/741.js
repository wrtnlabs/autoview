export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare a friendly date string, if created_at is provided
    let createdAtLabel;
    if (input.created_at) {
        try {
            const date = new Date(input.created_at);
            // Use locale representation for readability
            createdAtLabel = isNaN(date.getTime())
                ? input.created_at
                : date.toLocaleString();
        }
        catch (_a) {
            // Fallback to raw value on parse error
            createdAtLabel = input.created_at;
        }
    }
    // Build an array of DataListItem props, one per field
    const listItems = [];
    // Key ID
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Key ID" },
        value: { type: "Text", content: input.key_id },
    });
    // Optional numeric record ID
    if (input.id !== undefined) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Record ID" },
            value: { type: "Text", content: String(input.id) },
        });
    }
    // Creation timestamp
    if (createdAtLabel) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Created At" },
            value: { type: "Text", content: createdAtLabel },
        });
    }
    // Public URL, displayed as a button for easy tapping
    if (input.url) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "URL" },
            value: {
                type: "Button",
                label: "Open Link",
                href: input.url,
                variant: "text",
            },
        });
    }
    // The raw Base64 public key, shown in a scrollable code block via Markdown
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Public Key (Base64)" },
        value: {
            type: "Markdown",
            content: [
                "text",
                input.key,
                "```",
            ].join("\n"),
        },
    });
    // Assemble the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Card header with an icon for visual context
    const cardHeader = {
        type: "CardHeader",
        // Use the provided title if available, else fall back to key ID
        title: input.title || `Public Key: ${input.key_id}`,
        // Show the raw URL as description if no createdAtLabel
        description: createdAtLabel ? undefined : input.url,
        startElement: {
            type: "Icon",
            id: "key",
            color: "teal",
            size: 32,
        },
    };
    // Card content wrapping the DataList
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Card footer with a quick action to copy the public key link (if URL exists)
    const footerChildren = [];
    if (input.url) {
        footerChildren.push({
            type: "Button",
            label: "View in Browser",
            href: input.url,
            variant: "outlined",
        });
    }
    // If no actions, omit the footer entirely
    const cardFooter = footerChildren.length > 0
        ? { type: "CardFooter", childrenProps: footerChildren }
        : undefined;
    // Compose the final vertical card with header, content, and optional footer
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: cardFooter
            ? [cardHeader, cardContent, cardFooter]
            : [cardHeader, cardContent],
    };
    return verticalCard;
}
//# sourceMappingURL=741.js.map