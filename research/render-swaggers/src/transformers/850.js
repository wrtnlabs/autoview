export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure name and markdown body from input
    const { name, body } = input;
    // Determine if the body contains meaningful markdown
    const hasContent = typeof body === "string" && body.trim().length > 0;
    // Compose the card header with an icon to make the release visually distinct
    const header = {
        type: "CardHeader",
        title: name,
        // Use a tag icon to represent a release; blue color for visibility
        startElement: {
            type: "Icon",
            id: "tag",
            color: "blue",
            size: 20,
        },
    };
    // If there's markdown content, render it via a Markdown component.
    // Otherwise, render a fallback text message.
    const contentChild = hasContent
        ? {
            type: "Markdown",
            content: body,
        }
        : {
            type: "Text",
            content: "No release notes available.",
            variant: "body2",
            color: "gray",
        };
    // Wrap the markdown or fallback text in a CardContent for consistent styling
    const content = {
        type: "CardContent",
        childrenProps: contentChild,
    };
    // Finally, stack header and content in a vertical card for a responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=850.js.map