export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Determine if this is an incoming deposit or an outgoing withdrawal
    const isDeposit = input.direction === 1;
    // Format the timestamp into a human-readable local string.
    // If the date is invalid, this will produce "Invalid Date".
    const formattedDate = new Date(input.created_at).toLocaleString();
    // Choose icon and color based on direction
    const directionIcon = {
        type: "Icon",
        id: isDeposit ? "arrow-up" : "arrow-down",
        color: isDeposit ? "green" : "red",
        size: 24,
    };
    // Build a chip that clearly labels deposit vs withdrawal
    const directionChip = {
        type: "Chip",
        label: isDeposit ? "Deposit" : "Withdrawal",
        color: isDeposit ? "green" : "red",
        variant: "filled",
    };
    // A data list item for each piece of data
    const dataItems = [
        {
            type: "DataListItem",
            // Label with a subtle subtitle style
            label: {
                type: "Text",
                content: "ID",
                variant: "subtitle2",
            },
            // Value rendered as icon + text
            value: {
                type: "Text",
                content: [
                    { type: "Icon", id: "fingerprint", color: "gray", size: 16 },
                    " ",
                    input.id,
                ],
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Date",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: [
                    { type: "Icon", id: "calendar", color: "gray", size: 16 },
                    " ",
                    formattedDate,
                ],
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Source",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: [
                    { type: "Icon", id: "database", color: "gray", size: 16 },
                    " ",
                    input.source,
                ],
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Direction",
                variant: "subtitle2",
            },
            // Render our chip to show deposit vs withdrawal
            value: directionChip,
        },
    ];
    // Wrap the list items into a DataList component
    const detailsList = {
        type: "DataList",
        childrenProps: dataItems,
    };
    // Build card header with code as title and date as a subtitle
    const header = {
        type: "CardHeader",
        title: input.code,
        description: formattedDate,
        startElement: directionIcon,
    };
    // Card content holds our details list
    const content = {
        type: "CardContent",
        childrenProps: detailsList,
    };
    // Card footer shows the direction chip again for quick action context
    const footer = {
        type: "CardFooter",
        childrenProps: directionChip,
    };
    // A vertical card is responsive and stacks nicely on mobile
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=11.js.map