export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no signed URL, inform the user via markdown (more engaging than plain text)
    if (!input.signedUrl) {
        return {
            type: "Markdown",
            content: "## No recording available\n\nThere is no recording URL provided."
        };
    }
    // When a signed URL is present, present a download/view button with an icon
    // Use a contained button for better visibility on both desktop and mobile
    return {
        type: "Button",
        variant: "contained",
        color: "primary",
        // The label is self-explanatory; Button supports string or string[] (for multi-line)
        label: "View Recording",
        // A leading icon to indicate action (FontAwesome 'play' icon)
        startElement: {
            type: "Icon",
            id: "play",
            size: 20
        },
        // Direct link to the signed URL; opens in a new tab in most UIs
        href: input.signedUrl
    };
}
//# sourceMappingURL=265.js.map