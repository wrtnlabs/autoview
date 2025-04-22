export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Attempt to format the creation date into a human-friendly string
    let formattedDate;
    try {
        formattedDate = new Date(input.created_at).toLocaleString();
    }
    catch (_a) {
        // Fallback to raw value if parsing fails
        formattedDate = input.created_at;
    }
    // Build a list of DataListItemProps for each field we want to display
    const dataListItems = [
        {
            type: "DataListItem",
            label: [
                { type: "Text", content: ["ID"], variant: "subtitle2" }
            ],
            value: [
                { type: "Text", content: [input.id], variant: "body2" }
            ]
        },
        {
            type: "DataListItem",
            label: [
                { type: "Text", content: ["Code"], variant: "subtitle2" }
            ],
            value: [
                { type: "Text", content: [input.code], variant: "body2" }
            ]
        },
        {
            type: "DataListItem",
            label: [
                { type: "Text", content: ["Created At"], variant: "subtitle2" }
            ],
            value: [
                { type: "Text", content: [formattedDate], variant: "body2" }
            ]
        },
        {
            type: "DataListItem",
            label: [
                { type: "Text", content: ["Parent"], variant: "subtitle2" }
            ],
            // If there's a parent, display it as a chip; otherwise show 'None'
            value: input.parent
                ? {
                    type: "Chip",
                    label: input.parent.name || "Unknown",
                    variant: "outlined",
                    // Use an icon to indicate hierarchy
                    startElement: {
                        type: "Icon",
                        id: "arrow-up",
                        color: "gray",
                        size: 16
                    }
                }
                : {
                    type: "Text",
                    content: ["None"],
                    variant: "body2"
                }
        }
    ];
    // Compose the final vertical card component
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with a folder icon, category name, and code
                type: "CardHeader",
                title: input.name,
                description: input.code,
                startElement: {
                    type: "Icon",
                    id: "folder",
                    color: "blue",
                    size: 24
                }
            },
            {
                // Main content: a structured data list
                type: "CardContent",
                childrenProps: [
                    {
                        type: "DataList",
                        childrenProps: dataListItems
                    }
                ]
            }
        ]
    };
    return card;
}
//# sourceMappingURL=41.js.map