export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { pagination, data } = input;
    // Card header displaying section overview with an icon
    const header = {
        type: "CardHeader",
        title: "Shopping Sections",
        description: `${pagination.records} total • Page ${pagination.current}/${pagination.pages}`,
        startElement: {
            type: "Icon",
            id: "store", // store icon to represent sections
            size: 24,
            color: "blue",
        },
    };
    // Transform each section into a DataListItem component
    const items = data.map((section) => {
        // Format the creation date for readability
        const createdAt = new Date(section.created_at).toLocaleDateString();
        return {
            type: "DataListItem",
            // Use the section name as the label
            label: [
                {
                    type: "Text",
                    variant: "subtitle1",
                    content: section.name,
                },
            ],
            // Show the code as a secondary piece of information
            value: [
                {
                    type: "Text",
                    variant: "body2",
                    color: "gray",
                    content: section.code,
                },
            ],
            // Display creation date on the right
            endElement: {
                type: "Text",
                variant: "caption",
                color: "darkGray",
                content: createdAt,
            },
        };
    });
    // Wrap the items into a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Card content containing the list of sections
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Final vertical card assembling header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=115.js.map