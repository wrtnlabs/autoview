export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Parse and format the creation date, fallback to raw string if invalid
    const createdDate = new Date(input.created_at);
    const formattedDate = isNaN(createdDate.getTime())
        ? input.created_at
        : createdDate.toLocaleString();
    // Determine if this is a deposit (1) or withdrawal (-1)
    const isDeposit = input.direction === 1;
    // Icon representing direction: down arrow for deposit, up arrow for withdrawal
    const directionIcon = {
        type: "Icon",
        id: isDeposit ? "arrow-down" : "arrow-up",
        color: isDeposit ? "green" : "red",
        size: 24,
    };
    // A chip summarizing the transaction type
    const directionChip = {
        type: "Chip",
        label: isDeposit ? "Deposit" : "Withdrawal",
        color: isDeposit ? "success" : "error",
        size: "small",
        variant: "filled",
        startElement: directionIcon,
    };
    // Helper to create a text component for labels and values
    const makeText = (content, variant = "body2", color) => ({
        type: "Text",
        content,
        variant,
        color,
    });
    // Build a data list of the key fields
    const dataList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: [makeText("ID", "caption", "tertiary")],
                value: makeText(input.id, "body2"),
            },
            {
                type: "DataListItem",
                label: [makeText("Source", "caption", "tertiary")],
                value: makeText(input.source, "body2"),
            },
            {
                type: "DataListItem",
                label: [makeText("Date", "caption", "tertiary")],
                value: makeText(formattedDate, "body2"),
            },
            {
                type: "DataListItem",
                label: [makeText("Type", "caption", "tertiary")],
                value: directionChip,
            },
        ],
    };
    // Compose a vertical card with a header and the data list content
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header shows the transaction code prominently
                type: "CardHeader",
                title: input.code,
                description: formattedDate,
                startElement: directionIcon,
            },
            {
                // Content holds the detailed list
                type: "CardContent",
                childrenProps: dataList,
            },
        ],
    };
    return card;
}
//# sourceMappingURL=10.js.map