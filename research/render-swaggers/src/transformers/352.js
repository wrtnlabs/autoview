export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no gists to display, render a simple markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No gists to display\n\nThere are no public gists available at the moment."
        };
    }
    // Map each gist to a ListItem component.
    const listItems = input.map((gist) => {
        var _a, _b;
        // Prepare a human‐friendly title: use description if present, otherwise fallback to ID.
        const titleText = ((_a = gist.description) === null || _a === void 0 ? void 0 : _a.trim()) || gist.id || "Untitled Gist";
        // Format creation date in ISO form (the consumer can render it nicely).
        const createdDate = gist.created_at
            ? new Date(gist.created_at).toISOString().split("T")[0]
            : "Unknown date";
        // Build the avatar or an icon as the leading element.
        const startElement = ((_b = gist.owner) === null || _b === void 0 ? void 0 : _b.avatar_url)
            ? {
                type: "Avatar",
                src: gist.owner.avatar_url,
                size: 40,
                variant: "primary"
            }
            : {
                type: "Icon",
                id: "file-code", // FontAwesome icon key for code or file
                size: 24,
                color: "gray"
            };
        // If an HTML URL is available, attach a "View" button as the trailing element.
        const endElement = gist.html_url
            ? {
                type: "Button",
                label: "View",
                href: gist.html_url,
                variant: "outlined",
                color: "primary",
                size: "small"
            }
            : undefined;
        return {
            type: "ListItem",
            title: titleText,
            description: `Created: ${createdDate}`,
            startElement,
            endElement
        };
    });
    // Wrap everything in a List component for easy scrolling on mobile devices.
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=352.js.map