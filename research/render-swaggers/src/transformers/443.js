export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Compose the header of the card with an icon and copy button for quick access
    const header = {
        type: "CardHeader",
        title: "Dependabot Public Key",
        description: input.key_id, // show the key identifier
        startElement: {
            type: "Icon",
            id: "key", // use the "key" icon to represent a public key
            color: "teal",
            size: 24,
        },
        endElement: {
            type: "IconButton",
            icon: "clipboard", // affordance for copying the public key
            variant: "outlined",
            color: "primary",
            size: "small",
        },
    };
    // Render the raw Base64 public key inside a markdown code block for better readability
    const publicKeyMarkdown = {
        type: "Markdown",
        content: [
            "**Public Key**",
            "",
            "base64",
            input.key,
            "```",
        ].join("\n"),
    };
    // Wrap the markdown into a card content section
    const content = {
        type: "CardContent",
        childrenProps: publicKeyMarkdown,
    };
    // Return a vertical card combining header and content. This layout is responsive
    // and stacks nicely on mobile devices.
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=443.js.map