export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no history records, show a friendly message using markdown
    if (!input.data || input.data.length === 0) {
        return {
            type: "Markdown",
            content: "### No mileage history available"
        };
    }
    // Map each record to a DataListItemProps
    const items = input.data.map(record => {
        // Format the created_at timestamp in a locale-aware way
        const dateLabel = new Date(record.created_at).toLocaleString();
        // Choose direction icon and color based on positive/negative direction
        const directionIcon = {
            type: "Icon",
            id: record.mileage.direction === 1 ? "arrow-up" : "arrow-down",
            color: record.mileage.direction === 1 ? "green" : "red",
            size: 16
        };
        // Chip to visualize the change in mileage
        const changeChip = {
            type: "Chip",
            label: `${record.value > 0 ? "+" : ""}${record.value}`,
            color: record.value > 0 ? "green" : "red",
            variant: "filled",
            size: "small",
            startElement: directionIcon
        };
        // Text showing the resulting balance after the change
        const balanceText = {
            type: "Text",
            content: `Balance: ${record.balance}`,
            variant: "caption",
            color: "secondary"
        };
        // Text showing the citizen's name
        const nameText = {
            type: "Text",
            content: record.citizen.name,
            variant: "body1",
            color: "primary"
        };
        // Text showing the transaction code for reference
        const codeText = {
            type: "Text",
            content: record.mileage.code,
            variant: "body2",
            color: "gray"
        };
        return {
            type: "DataListItem",
            // Label section combines a calendar icon and the date text
            label: [
                {
                    type: "Icon",
                    id: "calendar",
                    size: 16,
                    color: "blue"
                },
                {
                    type: "Text",
                    content: dateLabel,
                    variant: "body2",
                    color: "gray"
                }
            ],
            // Value section shows name, change chip, balance, and transaction code
            value: [nameText, changeChip, balanceText, codeText]
        };
    });
    // Return a DataList of all items, suitable for responsive display
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=70.js.map