export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // We choose a VerticalCard to group header (with icon and copy button)
    // and content (the actual public key in a code block).
    // Using Markdown for code formatting improves readability and ensures mobile responsiveness.
    // Compose the card header with an icon, title, and key identifier.
    const header = {
        type: "CardHeader",
        title: "Dependabot Public Key",
        // Display the key_id as a subtitle
        description: input.key_id,
        // Visual cue: a key icon
        startElement: {
            type: "Icon",
            id: "key",
            color: "blue",
            size: 20
        },
        // A copy button hinting at user action (copying the key)
        endElement: {
            type: "IconButton",
            icon: "clipboard",
            variant: "outlined",
            color: "primary",
            size: "small"
        }
    };
    // Compose the card content, embedding the raw public key in a fenced code block.
    const content = {
        type: "CardContent",
        // Use Markdown to render the key with monospace and proper scroll on small screens.
        childrenProps: [
            {
                type: "Markdown",
                content: [
                    "text",
                    input.key,
                    "```"
                ].join("\n")
            }
        ]
    };
    // Return a vertical card with the header and code content.
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=718.js.map