export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each shopping section into a DataListItem:
    const items = input.data.map((section) => {
        // Format the creation date for display; fallback to raw string if invalid
        let formattedDate = section.created_at;
        const timestamp = Date.parse(section.created_at);
        if (!isNaN(timestamp)) {
            formattedDate = new Date(timestamp).toLocaleDateString();
        }
        // Build the label using Markdown to emphasize the section name and code
        const labelMarkdown = {
            type: "Markdown",
            content: `**${section.name}**  \`${section.code}\``,
        };
        // Build the value as an icon + text pair for the creation date
        const dateIcon = {
            type: "Icon",
            id: "calendar",
            color: "gray",
            size: 16,
        };
        const dateText = {
            type: "Text",
            content: formattedDate,
            variant: "body2",
            color: "gray",
        };
        return {
            type: "DataListItem",
            label: labelMarkdown,
            // childrenProps of DataListItem.value can be an array of PresentationComponentProps
            value: [dateIcon, dateText],
        };
    });
    // If there are no sections, show a friendly markdown message
    if (items.length === 0) {
        return {
            type: "Markdown",
            content: "_No shopping sections available._",
        };
    }
    // Compose the list inside a card with a header showing pagination info
    const header = {
        type: "CardHeader",
        title: "Shopping Sections",
        description: `Page ${input.pagination.current} of ${input.pagination.pages}`,
    };
    // Wrap the DataList into a CardContent component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Return a vertical card containing the header and the list
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=48.js.map