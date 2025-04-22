export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare DataList items for each ordered good
    const orderItems = (input.goods || []).map((good) => {
        // Good title from the sale snapshot content
        const title = good.commodity.sale.content.title;
        // Price real already includes volume multiplication (per ISummary)
        const priceLabel = `$${good.price.real.toFixed(2)}`;
        return {
            type: "DataListItem",
            // Use Text component to render the item title
            label: {
                type: "Text",
                content: title,
                variant: "body1",
            },
            // Use Text component to render the price
            value: {
                type: "Text",
                content: priceLabel,
                variant: "body1",
            },
        };
    });
    // If there are no items, display a placeholder markdown
    const contentComponent = orderItems.length > 0
        ? {
            type: "DataList",
            childrenProps: orderItems,
        }
        : {
            type: "Markdown",
            content: "## No items in this order",
        };
    // Calculate total order price
    const totalPrice = input.price.real.toFixed(2);
    // Format creation timestamp for display
    const createdAt = new Date(input.created_at).toLocaleString();
    // Assemble the vertical card with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // Order name as title, and ID as description
                title: input.name,
                description: `Order ID: ${input.id}`,
                // Shopping cart icon
                startElement: {
                    type: "Icon",
                    id: "shopping-cart",
                    size: 28,
                    color: "blue",
                },
            },
            {
                type: "CardContent",
                // Embed the DataList or a markdown placeholder
                childrenProps: contentComponent,
            },
            {
                type: "CardFooter",
                // Show total and creation date in the footer using Text components
                childrenProps: [
                    {
                        type: "Text",
                        content: `**Total:** $${totalPrice}`,
                        variant: "subtitle1",
                    },
                    {
                        type: "Text",
                        content: `Created: ${createdAt}`,
                        variant: "caption",
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=80.js.map