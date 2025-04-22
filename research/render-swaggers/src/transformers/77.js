export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Helper to format numbers as currency.
     * Adjust currency code or formatting options as needed.
     */
    const formatCurrency = (value) => 
    // Using "$" for simplicity; for production consider Intl.NumberFormat
    `$${value.toLocaleString()}`;
    // Build the list items for deposit and mileage with icons for visual appeal.
    const listItems = [
        {
            type: "ListItem",
            title: "Deposit",
            // Use a wallet icon to represent deposit
            startElement: {
                type: "Icon",
                id: "wallet",
                color: "blue",
                size: 24,
            },
            // Display the deposit amount as text
            endElement: {
                type: "Text",
                content: formatCurrency(input.deposit),
                variant: "body1",
            },
        },
        {
            type: "ListItem",
            title: "Mileage",
            // Use a tachometer icon to represent mileage
            startElement: {
                type: "Icon",
                id: "tachometer-alt",
                color: "green",
                size: 24,
            },
            endElement: {
                type: "Text",
                content: input.mileage.toLocaleString(),
                variant: "body1",
            },
        },
    ];
    if (Array.isArray(input.combinations) && input.combinations.length > 0) {
        // For each discount combination, show a list item with chips summarizing details.
        input.combinations.forEach((comb, index) => {
            // Chips for coupon count, ticket count, entry count
            const detailChips = [
                {
                    type: "Chip",
                    label: `${comb.coupons.length} Coupon${comb.coupons.length !== 1 ? "s" : ""}`,
                    color: "primary",
                    size: "small",
                    variant: "outlined",
                },
                {
                    type: "Chip",
                    label: `${comb.tickets.length} Ticket${comb.tickets.length !== 1 ? "s" : ""}`,
                    color: "secondary",
                    size: "small",
                    variant: "outlined",
                },
                {
                    type: "Chip",
                    label: `${comb.entries.length} Entry${comb.entries.length !== 1 ? "ies" : "y"}`,
                    color: "info",
                    size: "small",
                    variant: "outlined",
                },
            ];
            listItems.push({
                type: "ListItem",
                // Title as combination index
                title: `Combination ${index + 1}`,
                // Show a layers icon for grouping
                startElement: {
                    type: "Icon",
                    id: "layer-group",
                    color: "violet",
                    size: 24,
                },
                // Show the total amount saved by this combination
                description: `Saved ${formatCurrency(comb.amount)}`,
                // Display the detail chips on the right
                endElement: detailChips /* ChipProps[] is allowed here */,
            });
        });
    }
    else {
        // If no combinations, show a subheader with a markdown note.
        listItems.push({
            type: "ListSubheader",
            stickToTop: false,
            childrenProps: {
                type: "Markdown",
                content: "**No discount combinations available.**",
            },
        });
    }
    // Return the composed List component.
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=77.js.map