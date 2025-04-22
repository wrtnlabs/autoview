export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Extract and sort emoji keys for consistent ordering
    const names = Object.keys(input).sort();
    // Handle case of no emojis
    if (names.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: "No emojis available."
        };
    }
    // Build DataListItem for each emoji: label shows the name, value shows the image
    const items = names.map((name) => ({
        type: "DataListItem",
        // Display the emoji name as text
        label: {
            type: "Text",
            variant: "body2",
            content: name
        },
        // Render the emoji image
        value: {
            type: "Image",
            src: input[name],
            alt: name
        }
    }));
    // Wrap items in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Card header with title and count
    const header = {
        type: "CardHeader",
        title: "Emoji Gallery",
        description: `${names.length} items`
    };
    // Card content holding the DataList
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Compose a vertical card with header and content for a clean, responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=330.js.map