export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no orders, show a friendly Markdown message
    if (!input.data || input.data.length === 0) {
        return {
            type: "Markdown",
            content: "### 📭 No orders found\n\nThere are no orders to display."
        };
    }
    // Transform each order into a DataListItem
    const items = input.data.map((order) => {
        var _a, _b, _c, _d;
        // Build a Markdown list of goods for this order
        const goodsMarkdown = order.goods.map((good) => {
            var _a, _b, _c, _d, _e, _f;
            // Fallback values in case nested props are missing
            const saleId = (_c = (_b = (_a = good.commodity) === null || _a === void 0 ? void 0 : _a.sale) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : "Unknown";
            const volume = (_d = good.volume) !== null && _d !== void 0 ? _d : 0;
            const price = (_f = (_e = good.price) === null || _e === void 0 ? void 0 : _e.real) !== null && _f !== void 0 ? _f : 0;
            return `- **${saleId}** (Qty: ${volume}) — $${price.toFixed(2)}`;
        }).join("\n");
        // Compose a Markdown block summarizing the order
        const content = [
            `## 📦 ${order.name}`,
            "",
            `- **Order ID**: ${order.id}`,
            `- **Customer**: ${(_b = (_a = order.customer) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "Unknown"}`,
            `- **Created**: ${new Date(order.created_at).toLocaleString()}`,
            "",
            `### 🛒 Goods`,
            goodsMarkdown,
            "",
            `### 💰 Summary`,
            `- **Nominal**: $${((_c = order.price.nominal) !== null && _c !== void 0 ? _c : 0).toFixed(2)}`,
            `- **Real**: $${((_d = order.price.real) !== null && _d !== void 0 ? _d : 0).toFixed(2)}`
        ].join("\n");
        return {
            type: "DataListItem",
            // Label shows the order title as responsive Text
            label: {
                type: "Text",
                variant: "subtitle1",
                content: `Order ${order.id}`
            },
            // Value renders the rich Markdown summary
            value: {
                type: "Markdown",
                content
            }
        };
    });
    // Wrap all items into a DataList for responsive listing
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=79.js.map