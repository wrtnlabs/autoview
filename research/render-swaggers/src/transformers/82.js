export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Build the primary list of price information
    const priceItems = [];
    // 1. Total paid
    priceItems.push({
        type: "DataListItem",
        label: [
            { type: "Text", content: "Total Paid", variant: "body2" }
        ],
        value: [
            { type: "Text", content: `$${input.real.toLocaleString()}`, variant: "body1", color: "green" }
        ]
    });
    // 2. Original nominal price (strike-through if there's a discount)
    if (input.nominal > input.real) {
        priceItems.push({
            type: "DataListItem",
            label: [
                { type: "Text", content: "Original Price", variant: "body2", color: "gray" }
            ],
            // Use Markdown to render a strikethrough
            value: {
                type: "Markdown",
                content: `~~$${input.nominal.toLocaleString()}~~`
            }
        });
    }
    // 3. Breakdown by payment type, with icons
    const breakdown = [
        { key: "cash", label: "Cash", iconId: "money-bill-wave", color: "green", amount: input.cash },
        { key: "deposit", label: "Deposit", iconId: "piggy-bank", color: "blue", amount: input.deposit },
        { key: "mileage", label: "Mileage Points", iconId: "star", color: "orange", amount: input.mileage },
        { key: "ticket", label: "Ticket Discount", iconId: "ticket", color: "violet", amount: input.ticket },
    ];
    for (const { label, iconId, color, amount } of breakdown) {
        if (amount > 0) {
            priceItems.push({
                type: "DataListItem",
                label: [
                    { type: "Icon", id: iconId, color, size: 16 },
                    { type: "Text", content: label, variant: "body2" }
                ],
                value: [
                    { type: "Text", content: `$${amount.toLocaleString()}`, variant: "body1" }
                ]
            });
        }
    }
    // Build the DataList for the main price summary
    const priceList = {
        type: "DataList",
        childrenProps: priceItems
    };
    // If there are coupon ticket payments, render a separate section
    const children = [priceList];
    if (input.ticket_payments && input.ticket_payments.length > 0) {
        // Section heading
        children.push({
            type: "Markdown",
            content: "### Coupon Ticket Payments"
        });
        // Build a DataList for each payment record
        const couponItems = input.ticket_payments.map(payment => ({
            type: "DataListItem",
            label: [
                { type: "Text", content: payment.id, variant: "body2" }
            ],
            value: [
                {
                    type: "Text",
                    // Format ISO timestamp into a locale date
                    content: new Date(payment.created_at).toLocaleDateString(),
                    variant: "body2",
                    color: "gray"
                }
            ]
        }));
        children.push({
            type: "DataList",
            childrenProps: couponItems
        });
    }
    // Wrap everything in a vertical card for a neat, responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Order Price Summary"
            },
            {
                type: "CardContent",
                childrenProps: children
            }
        ]
    };
}
//# sourceMappingURL=82.js.map