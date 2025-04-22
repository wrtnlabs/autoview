export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no errors, display a friendly success message
    if (!input.errors || input.errors.length === 0) {
        return {
            type: "Text",
            content: "🎉 No CODEOWNERS errors found!",
            variant: "body1",
            color: "success",
        };
    }
    // Map each error to a list item with an icon, message, file chip, location, and optional suggestion tooltip
    const items = input.errors.map(error => {
        // Base list item with the main error message
        const listItem = {
            type: "ListItem",
            // The human-readable error message
            title: error.message,
            // Show the kind of error as the description
            description: `Kind: ${error.kind}`,
            // Leading icon to indicate an error
            startElement: {
                type: "Icon",
                id: "exclamation-circle", // FontAwesome icon
                color: "red",
                size: 20,
            },
            // We'll build up the trailing elements below
            endElement: [],
        };
        // 1) Add a chip for the file path
        listItem.endElement.push({
            type: "Chip",
            label: error.path,
            variant: "outlined",
            size: "small",
            color: "gray",
        });
        // 2) Show line and column as a small text
        listItem.endElement.push({
            type: "Text",
            content: `${error.line}:${error.column}`,
            variant: "caption",
            color: "gray",
        });
        // 3) If a suggestion is provided, offer it via a tooltip on an info icon
        if (error.suggestion) {
            listItem.endElement.push({
                type: "Tooltip",
                message: error.suggestion,
                childrenProps: {
                    type: "Icon",
                    id: "info-circle",
                    color: "teal",
                    size: 16,
                },
            });
        }
        return listItem;
    });
    // Compose the list of errors; the UI will be responsive on mobile by default
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=685.js.map