export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare the card header, showing project name, number, state, and creator avatar or default icon.
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `#${input.number} · ${input.state}`,
        startElement: input.creator
            ? {
                type: "Avatar",
                // Use the creator's GitHub avatar
                src: input.creator.avatar_url,
                name: input.creator.login,
                variant: "primary",
                size: 40,
            }
            : {
                // Fallback icon if no creator
                type: "Icon",
                id: "folder-open",
                color: "gray",
                size: 40,
            },
    };
    // Helper to format ISO datetime strings into a more readable form
    function formatDateTime(dt) {
        try {
            return new Date(dt).toLocaleString();
        }
        catch (_a) {
            return dt;
        }
    }
    // Build a list of key/value details about the project
    const details = [
        {
            type: "DataListItem",
            // Left side label
            label: { type: "Text", content: "ID", variant: "subtitle2" },
            // Right side value
            value: { type: "Text", content: input.id.toString(), variant: "body2" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "State", variant: "subtitle2" },
            // Color-code the state with a Chip
            value: {
                type: "Chip",
                label: input.state,
                color: input.state === "open" ? "success" : "error",
                variant: "filled",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At", variant: "subtitle2" },
            value: { type: "Text", content: formatDateTime(input.created_at), variant: "body2" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated At", variant: "subtitle2" },
            value: { type: "Text", content: formatDateTime(input.updated_at), variant: "body2" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Project URL", variant: "subtitle2" },
            // Provide a link button to the project HTML URL
            value: {
                type: "Button",
                variant: "text",
                label: "View on GitHub",
                href: input.html_url,
                startElement: { type: "Icon", id: "external-link", size: 16, color: "blue" },
            },
        },
    ];
    // If the project has a body, show it as markdown content for richer formatting
    const bodyComponent = input.body !== null && input.body.trim() !== ""
        ? {
            type: "Markdown",
            content: input.body,
        }
        : null;
    // Compose the card content: details list and optional markdown body
    const contentChildren = [
        {
            type: "DataList",
            childrenProps: details,
        },
    ];
    if (bodyComponent) {
        contentChildren.push(bodyComponent);
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Card footer with a button to the project owner (if available)
    const footerButton = {
        type: "Button",
        variant: "outlined",
        label: input.creator ? input.creator.login : "Owner Unknown",
        href: input.owner_url,
        startElement: { type: "Icon", id: "user", size: 16, color: "gray" },
    };
    const footer = {
        type: "CardFooter",
        childrenProps: footerButton,
    };
    // Wrap everything in a vertical card for a responsive, stacked layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=564.js.map