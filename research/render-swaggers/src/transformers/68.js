export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure for easier access
    const { citizen, deposit, source_id, value, balance, created_at } = input;
    // Format the timestamp into a human-readable string
    const formattedDate = new Date(created_at).toLocaleString();
    // Determine sign and formatting for the amount
    const amountLabel = deposit.direction === 1 ? 'Credit' : 'Debit';
    const amountColor = deposit.direction === 1 ? 'success' : 'error';
    const formattedValue = `${deposit.direction === 1 ? '+' : '-'}$${Math.abs(value).toFixed(2)}`;
    return {
        // Use a vertical card to stack header, content, and footer
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with avatar for the citizen and a chip indicating credit/debit
                type: "CardHeader",
                title: citizen.name,
                description: `${deposit.source} (${deposit.code})`,
                startElement: {
                    type: "Avatar",
                    name: citizen.name,
                    variant: "info",
                },
                endElement: {
                    type: "Chip",
                    label: amountLabel,
                    color: amountColor,
                    size: "small",
                    variant: "filled",
                },
            },
            {
                // Card content: a data list showing key fields
                type: "CardContent",
                childrenProps: [
                    {
                        type: "DataList",
                        childrenProps: [
                            {
                                type: "DataListItem",
                                // Label for the row
                                label: {
                                    type: "Text",
                                    content: "Amount",
                                    variant: "subtitle2",
                                },
                                // Visualize the transaction amount with color coding
                                value: {
                                    type: "Text",
                                    content: formattedValue,
                                    color: amountColor,
                                    variant: "body1",
                                },
                            },
                            {
                                type: "DataListItem",
                                label: {
                                    type: "Text",
                                    content: "Balance",
                                    variant: "subtitle2",
                                },
                                value: {
                                    type: "Text",
                                    content: `$${balance.toFixed(2)}`,
                                    variant: "body1",
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
                                    content: formattedDate,
                                    variant: "body2",
                                },
                            },
                            {
                                type: "DataListItem",
                                label: {
                                    type: "Text",
                                    content: "Source ID",
                                    variant: "subtitle2",
                                },
                                value: {
                                    type: "Text",
                                    content: source_id,
                                    variant: "body2",
                                },
                            },
                        ],
                    },
                ],
            },
            {
                // Card footer: show citizen's mobile with an icon
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Icon",
                        id: "phone",
                        color: "gray",
                        size: 16,
                    },
                    {
                        type: "Text",
                        content: citizen.mobile,
                        variant: "body2",
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=68.js.map