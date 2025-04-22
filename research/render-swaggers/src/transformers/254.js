export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const plugin = input.plugin;
    // If there's no plugin data, show a markdown placeholder
    if (!plugin) {
        return {
            type: "Markdown",
            content: "## No plugin data available"
        };
    }
    // Helper: format timestamp to human-readable string
    const formatDate = (ts) => ts ? new Date(ts).toLocaleString() : "—";
    // Icon mapping for plugin state
    const stateIcon = plugin.state === "active"
        ? { id: "check-circle", color: "green" }
        : { id: "hourglass-start", color: "yellow" };
    // Icon mapping for appearance
    const appearanceIcon = plugin.appearance === "light"
        ? { id: "sun", color: "orange" }
        : plugin.appearance === "dark"
            ? { id: "moon", color: "blue" }
            : { id: "adjust", color: "gray" };
    // Build a list of DataListItemProps to display plugin properties
    const items = [];
    // Unique key (UUID) if available
    if (plugin.key) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "UUID", variant: "body2" },
            value: { type: "Text", content: plugin.key, variant: "body1" }
        });
    }
    // State with icon
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "State", variant: "body2" },
        value: {
            type: "Icon",
            id: stateIcon.id,
            color: stateIcon.color,
            size: 16
        }
    });
    // Creation date
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created At", variant: "body2" },
        value: { type: "Text", content: formatDate(plugin.createdAt), variant: "body1" }
    });
    // Appearance icon
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Appearance", variant: "body2" },
        value: {
            type: "Icon",
            id: appearanceIcon.id,
            color: appearanceIcon.color,
            size: 16
        }
    });
    // Run rate percentage
    if (plugin.runRate !== undefined) {
        const pct = Math.round(plugin.runRate * 100) + "%";
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Run Rate", variant: "body2" },
            value: {
                type: "Chip",
                label: pct,
                variant: "outlined",
                color: "info",
                size: "small"
            }
        });
    }
    // URL whitelist as a group of chips
    if (Array.isArray(plugin.urlWhitelist) && plugin.urlWhitelist.length > 0) {
        const chips = plugin.urlWhitelist.map((url) => ({
            type: "Chip",
            label: url,
            size: "small",
            variant: "filled"
        }));
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Allowed URLs", variant: "body2" },
            value: chips
        });
    }
    // Custom image preview if URL is provided
    if (plugin.customImageUrl) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Custom Image", variant: "body2" },
            value: {
                type: "Image",
                src: plugin.customImageUrl,
                alt: plugin.name + " custom"
            }
        });
    }
    // If there is a mobile image URL, show it
    if (plugin.mobileImageUrl) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Mobile Image", variant: "body2" },
            value: {
                type: "Image",
                src: plugin.mobileImageUrl,
                alt: plugin.name + " mobile"
            }
        });
    }
    // Assemble the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Compose the final VerticalCard: header + content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: plugin.name,
                // state icon on the left
                startElement: {
                    type: "Icon",
                    id: stateIcon.id,
                    color: stateIcon.color,
                    size: 20
                },
                // appearance icon on the right
                endElement: {
                    type: "Icon",
                    id: appearanceIcon.id,
                    color: appearanceIcon.color,
                    size: 20
                }
            },
            {
                type: "CardContent",
                childrenProps: dataList
            }
        ]
    };
}
//# sourceMappingURL=254.js.map