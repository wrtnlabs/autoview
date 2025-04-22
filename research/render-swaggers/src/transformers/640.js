export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No data to display**",
        };
    }
    // Transform each string into a DataListItem with an icon and text
    const items = input.map((text, index) => {
        // Use a small circle icon as a bullet
        const bulletIcon = {
            type: "Icon",
            id: "circle",
            size: 8,
            color: "gray",
        };
        const textComponent = {
            type: "Text",
            content: text,
            variant: "body1",
        };
        return {
            type: "DataListItem",
            // Label is an array of presentation components: [icon, text]
            label: [bulletIcon, textComponent],
        };
    });
    // Compose the DataList to display all items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=640.js.map