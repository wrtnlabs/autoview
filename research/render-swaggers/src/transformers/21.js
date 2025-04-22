export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format a number as currency (US Dollars shown here; adjust locale as needed).
    const formatCurrency = (value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    // If there are no sale records, display a friendly markdown message.
    if (!input.data || input.data.length === 0) {
        return {
            type: "Markdown",
            content: "### No sales found."
        };
    }
    // Transform each sale summary into a DataListItem component.
    const items = input.data.map((sale) => {
        // Compose the title and subtitle for the label area.
        const titleText = {
            type: "Text",
            variant: "h6",
            content: sale.content.title
        };
        const subtitleParts = [
            sale.section.name,
            sale.seller.member.nickname,
            sale.latest ? "(Latest)" : ""
        ].filter(Boolean);
        const subtitleText = {
            type: "Text",
            variant: "body2",
            color: "gray",
            content: subtitleParts.join(" • ")
        };
        // Compose the price range string.
        const lowReal = sale.price_range.lowest.real;
        const highReal = sale.price_range.highest.real;
        const priceRangeText = {
            type: "Text",
            variant: "body1",
            content: formatCurrency(lowReal) + (lowReal !== highReal ? ` - ${formatCurrency(highReal)}` : "")
        };
        return {
            type: "DataListItem",
            // Left side: title and subtitle stacked vertically.
            label: [titleText, subtitleText],
            // Right side: display the formatted price range.
            value: priceRangeText
        };
    });
    // Return a DataList component containing all items.
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=21.js.map