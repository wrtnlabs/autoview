export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Format the creation date; fallback to raw string if invalid
    const createdDate = new Date(input.created_at);
    const formattedCreatedAt = isNaN(createdDate.getTime())
        ? input.created_at
        : createdDate.toLocaleString();
    // Card header with an icon to represent a shopping section
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Code: ${input.code}`,
        startElement: {
            type: "Icon",
            id: "store",
            color: "teal",
            size: 24,
        },
    };
    // Detail list of fields: ID and Created At
    const dataList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Identifier (ID)",
                    variant: "subtitle2",
                },
                value: {
                    type: "Text",
                    content: input.id,
                    variant: "body1",
                },
            },
            {
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Created At",
                    variant: "subtitle2",
                },
                value: {
                    type: "Text",
                    content: formattedCreatedAt,
                    variant: "body1",
                },
            },
        ],
    };
    // Wrap the list inside card content
    const content = {
        type: "CardContent",
        // Single component is acceptable, or you may provide an array
        childrenProps: dataList,
    };
    // Footer chip to highlight the section ID in a compact form
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Chip",
            label: input.id,
            color: "info",
            size: "small",
            variant: "outlined",
        },
    };
    // Compose the vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=47.js.map