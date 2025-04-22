export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to create a DataListItem with icon, title, and a value component
    const createItem = (iconId, title, valueComponent) => ({
        type: "DataListItem",
        // The label shows an icon next to the property name
        label: [
            { type: "Icon", id: iconId, color: "teal", size: 20 },
            { type: "Text", content: title, variant: "subtitle2", color: "tertiary" }
        ],
        // The value is any presentation component: Text, Button, Chip, etc.
        value: valueComponent
    });
    // Build list items for each field
    const items = [];
    // URL field: show as clickable link button if provided
    items.push(createItem("link", "URL", input.url
        ? {
            type: "Button",
            label: input.url,
            href: input.url,
            variant: "text",
            color: "blue",
            size: "small"
        }
        : {
            type: "Text",
            content: "Not provided",
            variant: "body2",
            color: "disabled"
        }));
    // Content-type field
    items.push(createItem("file-alt", "Content Type", input.content_type
        ? {
            type: "Chip",
            label: input.content_type,
            variant: "outlined",
            color: "info",
            size: "small"
        }
        : {
            type: "Text",
            content: "Not provided",
            variant: "body2",
            color: "disabled"
        }));
    // Secret field: do not display actual secret, just indicate presence
    items.push(createItem("key", "Secret", {
        type: "Chip",
        label: input.secret ? "Configured" : "Not set",
        variant: "outlined",
        color: input.secret ? "success" : "gray",
        size: "small"
    }));
    // insecure_ssl field: interpret "0"/0 as disabled, others as enabled
    const insecure = input.insecure_ssl !== undefined && input.insecure_ssl !== "0" && input.insecure_ssl !== 0
        ? true
        : false;
    items.push(createItem("exclamation-triangle", "Insecure SSL", {
        type: "Chip",
        label: insecure ? "Enabled" : "Disabled",
        variant: "outlined",
        color: insecure ? "warning" : "success",
        size: "small"
    }));
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Create a card header with an icon
    const header = {
        type: "CardHeader",
        title: "Webhook Configuration",
        // Show a small description for mobile friendliness
        description: "Overview of your webhook settings",
        startElement: {
            type: "Icon",
            id: "cog",
            color: "blue",
            size: 24
        }
    };
    // Wrap the DataList in CardContent
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Assemble into a VerticalCard for responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
    return card;
}
//# sourceMappingURL=454.js.map