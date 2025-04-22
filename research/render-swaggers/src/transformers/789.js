export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no label data, show a simple text placeholder.
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Text",
            // Using a body2 variant for slightly less prominent text on empty state
            variant: "body2",
            content: "No labels available",
        };
    }
    // Map each label into a ListItem component
    const items = input.map((label) => {
        // Build a multiline description: optional description + color hex code
        const descriptionLines = [];
        if (label.description) {
            descriptionLines.push(label.description);
        }
        // Always show the color hex code for quick visual reference
        descriptionLines.push(`Color: #${label.color}`);
        const description = descriptionLines.join("\n");
        // Start icon: a tag icon to represent "label"
        const startIcon = {
            type: "Icon",
            id: "tag",
            color: "blue",
            size: 20,
        };
        // End icons: a link icon always, and a check-circle if this is a default label
        const linkIcon = {
            type: "Icon",
            id: "link",
            color: "teal",
            size: 20,
        };
        const defaultIcon = label.default
            ? {
                type: "Icon",
                id: "check-circle",
                color: "green",
                size: 20,
            }
            : undefined;
        // Compose the endElement property: either a single icon or an array of icons
        const endElements = defaultIcon ? [linkIcon, defaultIcon] : linkIcon;
        // Return the ListItem representing this label
        return {
            type: "ListItem",
            title: label.name,
            description,
            startElement: startIcon,
            endElement: endElements,
            // Make the whole item clickable to navigate to the label's URL
            href: label.url,
        };
    });
    // Wrap all items in a responsive List component
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=789.js.map