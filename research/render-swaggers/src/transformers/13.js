export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { pagination, data } = input;
    // If there is no data, show a friendly message using Markdown
    if (!data || data.length === 0) {
        return {
            type: "Markdown",
            content: "**No shopping mileage records available.**"
        };
    }
    // Helper: format the ISO timestamp into a locale-aware string, falling back to raw string
    function formatDate(dateTime) {
        const d = new Date(dateTime);
        return isNaN(d.getTime()) ? dateTime : d.toLocaleString();
    }
    // Build a DataListItem for each record
    const listItems = data.map((record) => {
        const formattedDate = formatDate(record.created_at);
        const valueText = record.value != null ? record.value.toString() : "N/A";
        // Icon showing up/down depending on direction
        const directionIcon = {
            type: "Icon",
            id: record.direction === 1 ? "arrow-up" : "arrow-down",
            color: record.direction === 1 ? "green" : "red",
            size: 16
        };
        // Text showing the numeric value (or "N/A")
        const valueLabel = {
            type: "Text",
            content: [valueText],
            variant: "body1"
        };
        return {
            type: "DataListItem",
            // Label area: code (highlighted) and date below it
            label: [
                {
                    type: "Text",
                    content: [record.code],
                    variant: "subtitle1"
                },
                {
                    type: "Text",
                    content: [formattedDate],
                    variant: "caption",
                    color: "gray"
                }
            ],
            // Value area: arrow icon + the numeric value
            value: [directionIcon, valueLabel]
        };
    });
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems
    };
    // Card header with pagination info
    const cardHeader = {
        type: "CardHeader",
        title: `Page ${pagination.current} of ${pagination.pages}`,
        description: `Total records: ${pagination.records}`
    };
    // Card content wrapping the DataList
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Return a VerticalCard that contains the header and the data list
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent]
    };
}
//# sourceMappingURL=13.js.map