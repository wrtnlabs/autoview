export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { usageItems } = input;
    // If there's no data, show a simple message
    if (!usageItems || usageItems.length === 0) {
        return {
            type: "Text",
            content: "No usage data available",
            variant: "body1",
        };
    }
    // Build a markdown table representing each usage line item
    const tableHeader = "| Date | Product | SKU | Quantity | Unit | Price/unit | Net Amount | Repo | Org |";
    const tableSeparator = "| --- | --- | --- | --- | --- | --- | --- | --- | --- |";
    const tableRows = usageItems.map((item) => {
        var _a;
        const date = item.date;
        const product = item.product;
        const sku = item.sku;
        const quantity = item.quantity.toString();
        const unit = item.unitType;
        const price = item.pricePerUnit.toFixed(2);
        const net = item.netAmount.toFixed(2);
        const repo = (_a = item.repositoryName) !== null && _a !== void 0 ? _a : "-";
        const org = item.organizationName;
        return `| ${date} | ${product} | ${sku} | ${quantity} | ${unit} | ${price} | ${net} | ${repo} | ${org} |`;
    });
    const markdownContent = [tableHeader, tableSeparator, ...tableRows].join("\n");
    // Compute aggregate totals
    const totals = usageItems.reduce((acc, item) => {
        acc.gross += item.grossAmount;
        acc.discount += item.discountAmount;
        acc.net += item.netAmount;
        return acc;
    }, { gross: 0, discount: 0, net: 0 });
    // Prepare chips to show summary totals
    const summaryChips = [
        {
            type: "Chip",
            label: `Total Net: ${totals.net.toFixed(2)}`,
            color: "success",
            variant: "filled",
        },
        {
            type: "Chip",
            label: `Discount: ${totals.discount.toFixed(2)}`,
            color: "warning",
            variant: "outlined",
        },
        {
            type: "Chip",
            label: `Gross: ${totals.gross.toFixed(2)}`,
            color: "info",
            variant: "outlined",
        },
    ];
    // Compose the final UI as a vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with icon, title, and item count
                type: "CardHeader",
                title: "Billing Usage Report",
                description: `${usageItems.length} items`,
                startElement: {
                    type: "Icon",
                    id: "chart-bar",
                    size: 24,
                    color: "blue",
                },
            },
            {
                // Main content: render the table via markdown
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: markdownContent,
                },
            },
            {
                // Footer: show total/gross/discount as chips
                type: "CardFooter",
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: summaryChips,
                },
            },
        ],
    };
}
//# sourceMappingURL=373.js.map