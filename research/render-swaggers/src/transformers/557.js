export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Compose the card header with avatar, title, note and archived state indicator
    const header = {
        type: "CardHeader",
        // Title with identifier
        title: `Card #${input.id}`,
        // Use note as a subtitle if present
        description: (_a = input.note) !== null && _a !== void 0 ? _a : undefined,
        // Show the creator's avatar if available
        startElement: input.creator
            ? {
                type: "Avatar",
                src: input.creator.avatar_url,
                name: input.creator.login,
                variant: "primary",
                size: 32,
            }
            : undefined,
        // If archived, show a red chip
        endElement: input.archived
            ? {
                type: "Chip",
                label: "Archived",
                color: "error",
                size: "small",
                variant: "filled",
            }
            : undefined,
    };
    // Build a list of metadata items: column, project, dates
    const metadataItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Column", variant: "caption" },
            value: {
                type: "Text",
                content: (_b = input.column_name) !== null && _b !== void 0 ? _b : "—",
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Project URL", variant: "caption" },
            // Link rendered as a button-like chip for clarity
            value: {
                type: "Chip",
                label: "Open",
                color: "primary",
                variant: "outlined",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created", variant: "caption" },
            value: {
                type: "Text",
                // Format date to locale string
                content: new Date(input.created_at).toLocaleString(),
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated", variant: "caption" },
            value: {
                type: "Text",
                content: new Date(input.updated_at).toLocaleString(),
                variant: "body2",
            },
        },
    ];
    // If content_url exists, add it to metadata as a button
    if (input.content_url) {
        metadataItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Content", variant: "caption" },
            value: {
                type: "Chip",
                label: "View",
                color: "secondary",
                variant: "outlined",
                size: "small",
            },
        });
    }
    // Card content: use a data list to present metadata cleanly
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: metadataItems,
        },
    };
    // Card footer: action buttons for navigating to URLs
    const footerButtons = [
        {
            type: "Button",
            label: "View Card",
            variant: "contained",
            color: "primary",
            href: input.url,
            size: "medium",
        },
        {
            type: "Button",
            label: "Open Project",
            variant: "outlined",
            color: "primary",
            href: input.project_url,
            size: "medium",
        },
    ];
    // Add content button if exists
    if (input.content_url) {
        footerButtons.push({
            type: "Button",
            label: "View Content",
            variant: "outlined",
            color: "secondary",
            href: input.content_url,
            size: "medium",
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerButtons,
    };
    // Assemble as a vertical card for mobile-friendly responsiveness
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=557.js.map