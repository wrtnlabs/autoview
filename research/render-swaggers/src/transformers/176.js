export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    const { channel, manager, managerBadge } = input;
    // If no channel data, show a friendly message
    if (!channel) {
        return {
            type: "Text",
            content: "No channel data available.",
        };
    }
    // Build the card header: channel name, description, and avatar if present
    const header = {
        type: "CardHeader",
        title: channel.name,
        description: channel.description,
        // Use an avatar component for the channel image
        startElement: channel.avatarUrl
            ? {
                type: "Avatar",
                src: channel.avatarUrl,
                name: channel.name,
                variant: "primary",
            }
            : undefined,
    };
    // Helper to push a DataListItem if value exists
    const items = [];
    function addItem(labelText, valueComponent) {
        if (valueComponent != null) {
            items.push({
                type: "DataListItem",
                // Label as simple text
                label: { type: "Text", content: labelText },
                // Value can be any presentation component
                value: valueComponent,
            });
        }
    }
    // Domain
    addItem("Domain", channel.domain ? { type: "Text", content: channel.domain } : null);
    // Homepage URL: render as a link-style button
    addItem("Homepage", channel.homepageUrl
        ? {
            type: "Button",
            variant: "text",
            label: "Visit",
            href: channel.homepageUrl,
            color: "primary",
        }
        : null);
    // Country
    addItem("Country", channel.country ? { type: "Text", content: channel.country } : null);
    // State / Status
    addItem("Status", channel.state ? { type: "Chip", label: channel.state, color: "info", variant: "filled" } : null);
    // Service Plan
    addItem("Plan", channel.servicePlan ? { type: "Text", content: channel.servicePlan } : null);
    // Created at: format timestamp
    if (typeof channel.createdAt === "number") {
        const dateStr = new Date(channel.createdAt).toLocaleString();
        addItem("Created", { type: "Text", content: dateStr });
    }
    // Monthly active users (mau)
    if (typeof channel.mau === "number") {
        addItem("MAU", { type: "Text", content: String(channel.mau) });
    }
    // Features toggles
    addItem("Texting", channel.enableTexting
        ? { type: "Chip", label: "Enabled", color: "success", variant: "filled" }
        : { type: "Chip", label: "Disabled", color: "gray", variant: "outlined" });
    addItem("Email", channel.enableEmail
        ? { type: "Chip", label: "Enabled", color: "success", variant: "filled" }
        : { type: "Chip", label: "Disabled", color: "gray", variant: "outlined" });
    // Compose the DataList
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: items,
        },
    };
    // Build the footer: manager info and badge counts
    let footer;
    if (manager) {
        const footerChildren = [];
        // Manager avatar + name
        footerChildren.push({
            type: "Avatar",
            src: manager.avatarUrl,
            name: manager.name,
            variant: "secondary",
        });
        // Manager name as text
        footerChildren.push({
            type: "Text",
            content: manager.name,
        });
        // Badge counts: use chips for clarity
        if (managerBadge) {
            // Alerts
            footerChildren.push({
                type: "Chip",
                label: `Alert: ${(_a = managerBadge.alert) !== null && _a !== void 0 ? _a : 0}`,
                color: "error",
                variant: "filled",
                startElement: { type: "Icon", id: "exclamation-triangle", color: "red" },
            });
            // Unread
            footerChildren.push({
                type: "Chip",
                label: `Unread: ${(_b = managerBadge.unread) !== null && _b !== void 0 ? _b : 0}`,
                color: "info",
                variant: "filled",
                startElement: { type: "Icon", id: "envelope", color: "blue" },
            });
        }
        footer = {
            type: "CardFooter",
            childrenProps: footerChildren,
        };
    }
    // Return a vertical card with header, content, and optional footer
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: footer ? [header, content, footer] : [header, content],
    };
    return verticalCard;
}
//# sourceMappingURL=176.js.map