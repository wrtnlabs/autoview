export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to format numbers as currency (assuming USD; adjust as needed)
    const formatCurrency = (value) => `$${value.toLocaleString()}`;
    // Destructure the price breakdown
    const { cash, deposit, mileage, ticket: couponDiscount, nominal, real, ticket_payments } = input;
    // Build a list of DataListItem components for each non-zero payment method
    const items = [];
    // Mapping of payment methods to icon metadata
    const methods = [
        {
            amount: cash,
            key: 'cash',
            label: 'Cash',
            icon: { type: 'Icon', id: 'dollar-sign', color: 'green', size: 20 },
        },
        {
            amount: deposit,
            key: 'deposit',
            label: 'Deposit',
            icon: { type: 'Icon', id: 'credit-card', color: 'blue', size: 20 },
        },
        {
            amount: mileage,
            key: 'mileage',
            label: 'Mileage',
            icon: { type: 'Icon', id: 'road', color: 'orange', size: 20 },
        },
        {
            amount: couponDiscount,
            key: 'couponDiscount',
            label: 'Coupon Discount',
            icon: { type: 'Icon', id: 'ticket-alt', color: 'violet', size: 20 },
        },
    ];
    for (const method of methods) {
        if (method.amount != null && method.amount > 0) {
            items.push({
                type: 'DataListItem',
                // combine icon + text into the label
                label: [
                    method.icon,
                    { type: 'Text', content: method.label, variant: 'body2' },
                ],
                // show the formatted amount as the value
                value: {
                    type: 'Text',
                    content: formatCurrency(method.amount),
                    variant: 'body2',
                },
            });
        }
    }
    // If any coupon tickets were applied, show the count
    if (ticket_payments && ticket_payments.length > 0) {
        items.push({
            type: 'DataListItem',
            label: [
                { type: 'Icon', id: 'ticket-alt', color: 'pink', size: 20 },
                { type: 'Text', content: 'Coupons Used', variant: 'body2' },
            ],
            value: {
                type: 'Text',
                content: `${ticket_payments.length}`,
                variant: 'body2',
            },
        });
    }
    // Compose the main DataList component
    const breakdownList = {
        type: 'DataList',
        childrenProps: items,
    };
    // Prepare markdown footer showing nominal vs real price
    let footerMarkdown = `**Total Paid:** ${formatCurrency(real)}`;
    if (nominal != null && nominal > real) {
        footerMarkdown += `\n\n**Original Price:** ~~${formatCurrency(nominal)}~~`;
    }
    // Build the VerticalCard with header, content (breakdown), and footer
    const card = {
        type: 'VerticalCard',
        childrenProps: [
            {
                type: 'CardHeader',
                title: 'Order Price Summary',
                // Use an icon to visually represent the section
                startElement: { type: 'Icon', id: 'receipt', color: 'blue', size: 24 },
            },
            {
                type: 'CardContent',
                childrenProps: breakdownList,
            },
            {
                type: 'CardFooter',
                childrenProps: [
                    {
                        type: 'Markdown',
                        content: footerMarkdown,
                    },
                ],
            },
        ],
    };
    return card;
}
//# sourceMappingURL=84.js.map