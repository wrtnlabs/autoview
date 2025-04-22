export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Create a card header displaying the Code of Conduct name and key,
    // with an icon to visually represent a document.
    const header = {
        type: "CardHeader",
        title: input.name,
        description: input.key,
        startElement: {
            // Use a file icon to indicate the document nature of the Code of Conduct
            type: "Icon",
            id: "file-alt",
            color: "blue",
            size: 24,
        },
    };
    // If the body is provided, render it as markdown for rich formatting,
    // otherwise omit the content section entirely.
    const contentSection = input.body
        ? {
            type: "CardContent",
            childrenProps: {
                type: "Markdown",
                content: input.body,
            },
        }
        : null;
    // Provide a footer with a button linking to the full Code of Conduct URL.
    // Prefer html_url if available; otherwise fall back to the raw url.
    const targetUrl = (_a = input.html_url) !== null && _a !== void 0 ? _a : input.url;
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View Code of Conduct",
            href: targetUrl,
            variant: "text",
            startElement: {
                // External link icon to denote navigation
                type: "Icon",
                id: "external-link-alt",
                color: "blue",
                size: 16,
            },
        },
    };
    // Assemble the vertical card, filtering out any null sections.
    const children = [
        header,
        ...(contentSection ? [contentSection] : []),
        footer,
    ];
    return {
        type: "VerticalCard",
        childrenProps: children,
    };
}
//# sourceMappingURL=329.js.map