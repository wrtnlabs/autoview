export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to safely format ISO datetime strings to locale strings.
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        // Fall back to the raw string if parsing fails
        return isNaN(date.getTime())
            ? isoString
            : date.toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
    };
    // DataListItem for creation timestamp
    const createdItem = {
        type: "DataListItem",
        // Use an icon + text for the label to make it visually engaging
        label: [
            {
                type: "Icon",
                id: "calendar-day", // FontAwesome calendar icon
                color: "blue",
                size: 16,
            },
            {
                type: "Text",
                content: "Created At",
                variant: "subtitle2",
                color: "gray",
            },
        ],
        // Show the formatted timestamp as a responsive text
        value: {
            type: "Text",
            content: formatDateTime(input.created_at),
            variant: "body2",
            color: "primary",
        },
    };
    // DataListItem for update timestamp
    const updatedItem = {
        type: "DataListItem",
        label: [
            {
                type: "Icon",
                id: "history", // FontAwesome history icon
                color: "green",
                size: 16,
            },
            {
                type: "Text",
                content: "Updated At",
                variant: "subtitle2",
                color: "gray",
            },
        ],
        value: {
            type: "Text",
            content: formatDateTime(input.updated_at),
            variant: "body2",
            color: "primary",
        },
    };
    // The core list visualizing the timestamps
    const timestampList = {
        type: "DataList",
        childrenProps: [createdItem, updatedItem],
    };
    // The card header with a lock icon and the secret name
    const header = {
        type: "CardHeader",
        title: input.name,
        description: "GitHub Actions Secret",
        startElement: {
            type: "Icon",
            id: "lock",
            color: "red",
            size: 20,
        },
    };
    // The card content wrapping our DataList
    const content = {
        type: "CardContent",
        childrenProps: timestampList,
    };
    // Compose everything into a vertical card for responsive rendering
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=742.js.map