export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { url, enabled } = input;
    // Create a header with a lock icon and branch title
    const header = {
        type: "CardHeader",
        title: "Protected Branch Admin Enforced",
        description: url,
        startElement: {
            type: "Icon",
            id: "lock",
            color: "blue",
            size: 24,
        },
    };
    // Use markdown to render a clickable link and a chip to reflect the enforcement status
    const content = {
        type: "CardContent",
        childrenProps: [
            {
                type: "Markdown",
                // Emphasize the branch URL and render as a markdown link
                content: `**Branch URL:** [${url}](${url})`,
            },
            {
                type: "Chip",
                label: enabled ? "Enforced" : "Disabled",
                color: enabled ? "green" : "red",
                variant: "filled",
            },
        ],
    };
    // Footer with a button linking to the branch URL
    const footer = {
        type: "CardFooter",
        // Single childProps is allowed: presenting a button
        childrenProps: {
            type: "Button",
            label: "Open Branch",
            href: url,
            variant: "text",
            color: "primary",
            size: "small",
            startElement: {
                type: "Icon",
                id: "external-link-alt",
                color: "blue",
                size: 16,
            },
        },
    };
    // Compose into a vertical card for responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=636.js.map