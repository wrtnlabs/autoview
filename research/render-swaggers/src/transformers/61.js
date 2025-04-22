export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helpers to format optional fields
    const formatDateTime = (dt) => dt ? new Date(dt).toLocaleString() : "N/A";
    const formatVolume = (v) => v != null ? v.toString() : "Unlimited";
    // Build a single markdown string summarizing all parts
    const markdownLines = [];
    // Ticket overview
    markdownLines.push("## 🎫 Coupon Ticket");
    markdownLines.push(`- **Ticket ID**: \`${input.id}\``);
    markdownLines.push(`- **Issued At**: ${formatDateTime(input.created_at)}`);
    markdownLines.push(`- **Expires At**: ${formatDateTime(input.expired_at)}`);
    markdownLines.push("");
    // Customer info
    markdownLines.push("## 👤 Customer");
    markdownLines.push(`- **Customer ID**: \`${input.customer.id}\``);
    markdownLines.push(`- **Channel**: \`${input.customer.channel.name}\``);
    markdownLines.push("");
    // Coupon spec
    markdownLines.push("## 🎟️ Coupon");
    markdownLines.push(`- **Name**: ${input.coupon.name}`);
    markdownLines.push(`- **Available From**: ${formatDateTime(input.coupon.opened_at)}`);
    markdownLines.push(`- **Available Until**: ${formatDateTime(input.coupon.closed_at)}`);
    markdownLines.push("");
    // Inventory
    markdownLines.push("### 🗃️ Inventory");
    markdownLines.push(`- **Total Volume**: ${formatVolume(input.coupon.inventory.volume)}`);
    markdownLines.push(`- **Per Citizen**: ${formatVolume(input.coupon.inventory.volume_per_citizen)}`);
    markdownLines.push("");
    // Discount (render JSON for detail)
    markdownLines.push("### 💰 Discount Details");
    markdownLines.push("json");
    markdownLines.push(JSON.stringify(input.coupon.discount, (_key, val) => (val === undefined ? null : val), 2));
    markdownLines.push("```");
    markdownLines.push("");
    // Restrictions
    markdownLines.push("### 🚧 Restrictions");
    markdownLines.push("```json");
    markdownLines.push(JSON.stringify(input.coupon.restriction, (_key, val) => val === undefined ? null : val, 2));
    markdownLines.push("```");
    const markdownContent = markdownLines.join("\n");
    // Compose the card header with a ticket icon
    const header = {
        type: "CardHeader",
        title: `Ticket #${input.id}`,
        description: input.coupon.name,
        startElement: {
            type: "Icon",
            id: "ticket-alt",
            color: "cyan",
            size: 24,
        },
    };
    // Compose the card content using a Markdown component
    const content = {
        type: "CardContent",
        childrenProps: [
            {
                type: "Markdown",
                content: markdownContent,
            },
        ],
    };
    // Return a vertical card that holds the ticket overview
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=61.js.map