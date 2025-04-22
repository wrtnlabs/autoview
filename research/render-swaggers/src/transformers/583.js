export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Build a list of DataListItemProps to represent each field
    const items = [];
    // 1. Enabled flag: show a green check or red cross icon with text
    items.push({
        type: "DataListItem",
        // Label on the left
        label: [{
                type: "Text",
                content: "Enabled",
                variant: "body2",
            }],
        // Value on the right: icon + text
        value: [
            {
                type: "Icon",
                id: input.enabled ? "check-circle" : "times-circle",
                color: input.enabled ? "green" : "red",
                size: 20,
            },
            {
                type: "Text",
                content: input.enabled ? "Yes" : "No",
                variant: "body2",
                color: input.enabled ? "green" : "red",
            },
        ],
    });
    // 2. Allowed actions: show as a colored chip
    if (input.allowed_actions !== undefined) {
        // map permission string to a human-friendly label & color
        const mapping = {
            all: { label: "All", color: "primary" },
            local_only: { label: "Local Only", color: "warning" },
            selected: { label: "Selected", color: "info" },
        };
        const info = mapping[input.allowed_actions] || { label: input.allowed_actions, color: "gray" };
        items.push({
            type: "DataListItem",
            label: [{
                    type: "Text",
                    content: "Allowed Actions",
                    variant: "body2",
                }],
            value: {
                type: "Chip",
                label: info.label,
                color: info.color,
                size: "small",
                variant: "filled",
            },
        });
    }
    // 3. If allowed_actions is 'selected', provide a button to open the selected_actions_url
    if (input.allowed_actions === "selected" && input.selected_actions_url) {
        items.push({
            type: "DataListItem",
            label: [{
                    type: "Text",
                    content: "Selected Actions URL",
                    variant: "body2",
                }],
            value: {
                type: "Button",
                variant: "outlined",
                color: "primary",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "external-link-alt",
                    color: "blue",
                    size: 16,
                },
                label: "Open",
                href: input.selected_actions_url,
            },
        });
    }
    // Compose the DataList
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Build the card header with an icon
    const header = {
        type: "CardHeader",
        title: "Actions Permissions",
        description: "GitHub Actions settings for this repository",
        startElement: {
            type: "Icon",
            id: "cogs",
            color: "blue",
            size: 24,
        },
    };
    // Wrap the DataList in CardContent
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Return a vertical card with header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=583.js.map