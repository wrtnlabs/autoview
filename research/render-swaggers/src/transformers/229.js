export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to map backend colorVariant to AutoView chip color
    const mapColor = (variant) => {
        switch (variant) {
            case "red": return "red";
            case "orange": return "orange";
            case "yellow": return "yellow";
            case "olive": return "lime";
            case "green": return "green";
            case "cobalt": return "blue";
            case "purple": return "violet";
            case "pink": return "pink";
            case "navy": return "indigo";
            default: return "gray";
        }
    };
    // If no tags provided or empty, show a friendly markdown message
    const tagsList = input.chatTags;
    if (!tagsList || tagsList.length === 0) {
        return {
            type: "Markdown",
            content: "**No tags available**",
        };
    }
    // Compose each tag into a DataListItem: label is a colored chip, value is description or key
    const items = tagsList.map((tag) => {
        // Chip for the tag name
        const chip = {
            type: "Chip",
            label: tag.name,
            color: mapColor(tag.colorVariant),
            size: "small",
            variant: "filled",
        };
        // Description or fallback to key, using markdown for richer styling if description exists
        const valueComponent = tag.description
            ? {
                type: "Markdown",
                content: tag.description,
            }
            : {
                type: "Text",
                content: tag.key,
                variant: "body2",
                color: "gray",
            };
        return {
            type: "DataListItem",
            label: chip,
            value: valueComponent,
        };
    });
    // Wrap items in a DataList for display
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=229.js.map