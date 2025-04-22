export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Convert ISO timestamp to a localized string for display
    const formattedDate = new Date(input.created_at).toLocaleString();
    // Determine icon direction and color based on mileage direction
    const directionIcon = {
        type: "Icon",
        id: input.direction === 1 ? "arrow-up" : "arrow-down",
        color: input.direction === 1 ? "green" : "red",
        size: 24,
    };
    // Represent the mileage value; fallback to a neutral Chip if null
    const mileageValueComponent = input.value !== null
        ? {
            type: "Text",
            variant: "body1",
            // Use the number directly as content
            content: input.value.toString(),
        }
        : {
            type: "Chip",
            label: "N/A",
            variant: "outlined",
            color: "gray",
            size: "small",
        };
    // Build a DataList to show Source and Value fields
    const detailsList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                // Label rendered as Text component
                label: [
                    {
                        type: "Text",
                        variant: "body2",
                        content: "Source",
                    },
                ],
                // Value rendered similarly
                value: [
                    {
                        type: "Text",
                        variant: "body1",
                        content: input.source,
                    },
                ],
            },
            {
                type: "DataListItem",
                label: [
                    {
                        type: "Text",
                        variant: "body2",
                        content: "Value",
                    },
                ],
                value: mileageValueComponent,
            },
        ],
    };
    // Compose a VerticalCard to visually present the mileage record
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with code and creation date, with an icon indicating direction
                type: "CardHeader",
                title: input.code,
                description: formattedDate,
                startElement: directionIcon,
            },
            {
                // Main content area containing our details list
                type: "CardContent",
                childrenProps: [detailsList],
            },
        ],
    };
    return card;
}
//# sourceMappingURL=12.js.map