export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to map delivery state to a chip color
    const mapStateColor = (state) => {
        switch (state) {
            case "none":
            case "preparing":
            case "manufacturing":
                return "warning";
            case "underway":
            case "shipping":
                return "info";
            case "delivering":
                return "primary";
            case "arrived":
                return "success";
            default:
                return "gray";
        }
    };
    // 1. Header: show delivery ID, creation time and current state as a Chip
    const stateChip = {
        type: "Chip",
        label: input.state,
        color: mapStateColor(input.state),
        variant: "filled",
        size: "medium",
    };
    const cardHeader = {
        type: "CardHeader",
        title: `Delivery #${input.id}`,
        description: `Created at: ${new Date(input.created_at).toLocaleString()}`,
        endElement: stateChip,
    };
    // 2. Journeys: present each journey as a DataListItem with markdown-like rich text
    const journeyItems = input.journeys.map((j) => {
        var _a, _b, _c;
        // Compose a short markdown snippet for each journey step
        const md = [
            `**${(_a = j.title) !== null && _a !== void 0 ? _a : j.type}**`,
            j.description ? `> ${j.description}` : null,
            `- Started: ${(_b = j.started_at) !== null && _b !== void 0 ? _b : "-"}`,
            `- Completed: ${(_c = j.completed_at) !== null && _c !== void 0 ? _c : "-"}`,
        ]
            .filter((line) => !!line)
            .join("\n\n");
        return {
            type: "DataListItem",
            label: { type: "Markdown", content: `### ${j.type}` },
            value: { type: "Markdown", content: md },
        };
    });
    const journeysSection = {
        type: "DataList",
        childrenProps: journeyItems,
    };
    // 3. Orders: list each order with ID and summary (item count + total)
    const orderItems = input.orders.map((o) => {
        const itemCount = o.goods.length;
        const totalPrice = o.price.real.toFixed(2);
        return {
            type: "DataListItem",
            label: { type: "Text", content: `Order #${o.id}`, variant: "subtitle1" },
            value: { type: "Text", content: `${itemCount} item(s) • $${totalPrice}`, variant: "body2" },
        };
    });
    const ordersSection = {
        type: "DataList",
        childrenProps: orderItems,
    };
    // 4. Shippers: show each shipper as a small Chip
    const shipperChips = input.shippers.map((s) => ({
        type: "Chip",
        label: `${s.name}${s.company ? ` (${s.company})` : ""}`,
        variant: "outlined",
        size: "small",
        color: "gray",
    }));
    const shippersSection = {
        type: "ChipGroup",
        childrenProps: shipperChips,
        maxItems: 4,
    };
    // 5. Assemble everything into a responsive VerticalCard
    const cardContent = {
        type: "CardContent",
        childrenProps: [
            // Section header + list for journeys
            { type: "Text", content: "🚚 Delivery Journeys", variant: "subtitle2" },
            journeysSection,
            // Section header + list for orders
            { type: "Text", content: "🧾 Related Orders", variant: "subtitle2" },
            ordersSection,
            // Section header + chips for shippers
            { type: "Text", content: "📦 Shippers", variant: "subtitle2" },
            shippersSection,
        ],
    };
    const cardFooter = {
        type: "CardFooter",
        childrenProps: [
            { type: "Text", content: "Last updated:", variant: "caption" },
            { type: "Text", content: new Date(input.created_at).toLocaleString(), variant: "caption" },
        ],
    };
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=123.js.map