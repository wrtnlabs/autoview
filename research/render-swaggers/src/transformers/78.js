export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Format order creation date for display
    const orderDate = new Date(input.created_at).toLocaleString();
    // Card header: shows order name, ID, and a shopping-cart icon
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Order ID: ${input.id}`,
        startElement: {
            type: "Icon",
            id: "shopping-cart",
            color: "blue",
            size: 32,
        },
        endElement: {
            type: "Text",
            content: orderDate,
            variant: "caption",
            color: "tertiary",
        },
    };
    // Customer information rendered as markdown for better readability
    const customerInfoMarkdown = [
        "### Customer Information",
        "",
        `- **ID**: ${input.customer.id}`,
        `- **Name**: ${((_a = input.customer.citizen) === null || _a === void 0 ? void 0 : _a.name) || "Anonymous"}`,
        `- **Channel**: ${input.customer.channel.name}`,
        `- **Referrer**: ${input.customer.referrer || "N/A"}`,
    ].join("\n");
    const customerBlock = {
        type: "Markdown",
        content: customerInfoMarkdown,
    };
    // Build a data list of ordered goods
    const goodsList = {
        type: "DataList",
        childrenProps: input.goods.map((good) => {
            // Extract sale title
            const title = good.commodity.sale.content.title;
            // Create chips for quantity and per-item price
            const volumeChip = {
                type: "Chip",
                label: `${good.volume} pcs`,
                color: "secondary",
                size: "small",
            };
            const priceChip = {
                type: "Chip",
                label: `$${good.price.real.toFixed(2)}`,
                color: "success",
                size: "small",
            };
            const chipGroup = {
                type: "ChipGroup",
                childrenProps: [volumeChip, priceChip],
                maxItems: 2,
            };
            // Label is the product title
            const label = {
                type: "Text",
                content: title,
                variant: "subtitle1",
                color: "primary",
            };
            return {
                type: "DataListItem",
                label,
                value: chipGroup,
            };
        }),
    };
    // Wrap customer info and goods list into card content
    const content = {
        type: "CardContent",
        childrenProps: [customerBlock, goodsList],
    };
    // Summary of payment, including a prominent chip for the total
    const totalChip = {
        type: "Chip",
        label: `Total: $${input.price.real.toFixed(2)}`,
        color: "primary",
        size: "medium",
    };
    const summaryMarkdown = [
        "### Order Summary",
        "",
        `- **Nominal Total**: $${input.price.nominal.toFixed(2)}`,
        `- **Cash Payment**: $${input.price.cash.toFixed(2)}`,
        `- **Deposit Payment**: $${input.price.deposit.toFixed(2)}`,
        `- **Mileage Payment**: $${input.price.mileage.toFixed(2)}`,
        `- **Ticket Payment**: $${input.price.ticket.toFixed(2)}`,
    ].join("\n");
    const summaryBlock = {
        type: "Markdown",
        content: summaryMarkdown,
    };
    const footer = {
        type: "CardFooter",
        childrenProps: [totalChip, summaryBlock],
    };
    // Compose everything into a vertical card for responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=78.js.map