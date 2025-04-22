export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Create a store icon to visually represent the shopping section
    const storeIcon = {
        type: "Icon",
        id: "store", // Use FontAwesome "store" icon
        size: 24, // Medium size for header
        color: "blue", // Emphasize with a primary color
    };
    // Header of the card: shows the section name and its code
    const header = {
        type: "CardHeader",
        title: input.name, // Section name, e.g., "Fruit Corner"
        description: input.code, // Identifier code
        startElement: storeIcon, // Leading icon for better UX
    };
    // Helper to format ISO date to a more user-friendly representation
    const formatDate = (iso) => {
        const date = new Date(iso);
        if (isNaN(date.getTime())) {
            // Fallback for invalid dates
            return iso;
        }
        return date.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    // Build a list of key/value pairs for detailed metadata
    const dataListItems = [
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    variant: "subtitle2",
                    content: "ID",
                },
            ],
            value: [
                {
                    type: "Text",
                    variant: "body2",
                    content: input.id,
                },
            ],
        },
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    variant: "subtitle2",
                    content: "Created",
                },
            ],
            value: [
                {
                    type: "Text",
                    variant: "body2",
                    content: formatDate(input.created_at),
                },
            ],
        },
    ];
    // DataList to display the metadata in a structured way
    const details = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Content section of the card wrapping the metadata list
    const content = {
        type: "CardContent",
        childrenProps: details,
    };
    // Assemble a vertical card: header + content, responsive on mobile
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=167.js.map