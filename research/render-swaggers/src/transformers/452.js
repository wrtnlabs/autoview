export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to safely format ISO date strings for display.
    const formatDate = (iso) => {
        const t = Date.parse(iso);
        if (isNaN(t))
            return iso;
        return new Date(t).toLocaleString();
    };
    const createdDate = formatDate(input.created_at);
    const updatedDate = formatDate(input.updated_at);
    // Build an array of DataListItemProps for core webhook properties.
    const dataListItems = [];
    // ID
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "ID", variant: "subtitle2" },
        value: { type: "Text", content: input.id.toString(), variant: "body2" }
    });
    // Primary URL
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "URL", variant: "subtitle2" },
        // Render as a clickable markdown link
        value: {
            type: "Markdown",
            content: `[🔗 Open](${input.url})`
        }
    });
    // Ping URL
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Ping URL", variant: "subtitle2" },
        value: {
            type: "Markdown",
            content: `[🔗 Open ping](${input.ping_url})`
        }
    });
    // Optional deliveries_url
    if (input.deliveries_url) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Deliveries", variant: "subtitle2" },
            value: {
                type: "Markdown",
                content: `[📦 View deliveries](${input.deliveries_url})`
            }
        });
    }
    // Events array as a group of chips
    if (Array.isArray(input.events) && input.events.length > 0) {
        const chips = input.events.map((evt) => ({
            type: "Chip",
            label: evt,
            size: "small",
            variant: "outlined",
            color: "teal"
        }));
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Events", variant: "subtitle2" },
            value: {
                type: "ChipGroup",
                childrenProps: chips
            }
        });
    }
    // Active flag as a colored chip
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Active", variant: "subtitle2" },
        value: {
            type: "Chip",
            label: input.active ? "Yes" : "No",
            size: "small",
            variant: "filled",
            color: input.active ? "green" : "red"
        }
    });
    // Show config.content_type if provided
    if (input.config.content_type) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Content Type", variant: "subtitle2" },
            value: { type: "Text", content: input.config.content_type, variant: "body2" }
        });
    }
    // Show insecure_ssl flag from config
    if (typeof input.config.insecure_ssl === "string") {
        // Convert string flag ("0" or "1") to boolean-like label
        const insecure = input.config.insecure_ssl !== "0";
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Insecure SSL", variant: "subtitle2" },
            value: {
                type: "Chip",
                label: insecure ? "Enabled" : "Disabled",
                size: "small",
                variant: "outlined",
                color: insecure ? "warning" : "gray"
            }
        });
    }
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems
    };
    // Header icon for webhook
    const webhookIcon = {
        type: "Icon",
        id: "link",
        color: "blue",
        size: 24
    };
    // Active indicator chip in header
    const statusChip = {
        type: "Chip",
        label: input.active ? "Active" : "Inactive",
        size: "small",
        variant: "filled",
        color: input.active ? "success" : "error"
    };
    // Build the card UI: header, content, footer
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: input.name,
                description: input.type,
                startElement: webhookIcon,
                endElement: statusChip
            },
            {
                type: "CardContent",
                childrenProps: dataList
            },
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Markdown",
                    // Use markdown for responsive date layout
                    content: `**Created:** ${createdDate}  \n**Updated:** ${updatedDate}`
                }
            }
        ]
    };
    return card;
}
//# sourceMappingURL=452.js.map