export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare individual DataList items with icons and text for each field
    const idItem = {
        type: "DataListItem",
        // Use hashtag icon to denote an identifier
        label: [
            { type: "Icon", id: "hashtag", color: "gray", size: 20 },
            { type: "Text", content: "ID", variant: "body2", color: "tertiary" }
        ],
        // Display the raw id string
        value: { type: "Text", content: input.id, variant: "body1" }
    };
    const quantityItem = {
        type: "DataListItem",
        // Plus icon to denote supplemented quantity
        label: [
            { type: "Icon", id: "plus", color: "green", size: 20 },
            { type: "Text", content: "Supplemented", variant: "body2", color: "tertiary" }
        ],
        // Show the numeric value; convert to string
        value: { type: "Text", content: String(input.value), variant: "body1", color: input.value > 0 ? "success" : "error" }
    };
    const createdAtItem = {
        type: "DataListItem",
        // Calendar icon to denote timestamp
        label: [
            { type: "Icon", id: "calendar-alt", color: "blue", size: 20 },
            { type: "Text", content: "Created At", variant: "body2", color: "tertiary" }
        ],
        // Display the raw timestamp; could be ISO or other format
        value: { type: "Text", content: input.created_at, variant: "body1" }
    };
    // Aggregate the fields into a DataList for a clear tabular-like layout
    const detailsList = {
        type: "DataList",
        childrenProps: [idItem, quantityItem, createdAtItem]
    };
    // Compose the entire view as a vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // Title summarizing the record type
                title: "Stock Supplement",
                // Subtitle to highlight the record number
                description: `#${input.id}`,
                // Leading icon to visually denote supplementation
                startElement: { type: "Icon", id: "boxes", color: "indigo", size: 24 }
            },
            {
                type: "CardContent",
                // Embed the details list inside the card content
                childrenProps: detailsList
            }
        ]
    };
}
//# sourceMappingURL=157.js.map