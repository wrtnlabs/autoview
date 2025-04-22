export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Compose the card header to surface the channel name and code.
     */
    const header = {
        type: "CardHeader",
        title: input.channel.name,
        description: `Channel Code: ${input.channel.code}`,
        startElement: {
            type: "Icon",
            id: "tag",
            color: "cyan",
            size: 24,
        },
    };
    /**
     * Helper to create a DataListItem for a given icon, label, and value component.
     */
    function createItem(iconId, labelText, valueComponent) {
        return {
            type: "DataListItem",
            label: [
                { type: "Icon", id: iconId, color: "blue", size: 16 },
                { type: "Text", content: labelText, variant: "body2" },
            ],
            value: valueComponent,
        };
    }
    // Build up the list of data points for the DataList.
    const items = [];
    // Customer primary key
    items.push(createItem("fingerprint", "Customer ID", { type: "Text", content: input.id, variant: "body2" }));
    // Connection timestamp
    items.push(createItem("calendar-days", "Connected At", { type: "Text", content: input.created_at, variant: "body2" }));
    // Current page URL
    items.push(createItem("link", "URL", { type: "Markdown", content: `[Visit](${input.href})` }));
    // Referrer (may be null or empty)
    const referrer = input.referrer && input.referrer.length > 0 ? input.referrer : null;
    items.push(createItem("external-link-alt", "Referrer", referrer
        ? { type: "Markdown", content: `[${referrer}](${referrer})` }
        : { type: "Text", content: "None", variant: "body2" }));
    // IP address
    items.push(createItem("server", "IP Address", { type: "Text", content: input.ip, variant: "body2" }));
    // Assemble the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Wrap everything in a responsive vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            { type: "CardContent", childrenProps: [dataList] },
        ],
    };
    return card;
}
//# sourceMappingURL=54.js.map