export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map each custom property to a VerticalCard for visual display
    const cards = input.map((prop) => {
        var _a;
        // Icon mapping for each value_type
        const iconMap = {
            string: { id: "font", color: "cyan" },
            single_select: { id: "list-ul", color: "indigo" },
            multi_select: { id: "list", color: "blue" },
            true_false: { id: "toggle-on", color: "teal" },
        };
        const iconInfo = iconMap[prop.value_type] || { id: "question", color: "gray" };
        // Build a list of key/value items to show in the card content
        const dataListItems = [];
        // 1. Value Type
        dataListItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Value Type",
                variant: "body2",
            },
            value: {
                type: "Chip",
                label: prop.value_type,
                color: iconInfo.color,
                variant: "outlined",
            },
        });
        // 2. Required
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Required", variant: "body2" },
            value: {
                type: "Chip",
                label: prop.required ? "Yes" : "No",
                color: prop.required ? "success" : "gray",
                variant: "outlined",
            },
        });
        // 3. Default Value (if provided)
        if (prop.default_value != null) {
            // Render default value as inline code via markdown
            const raw = Array.isArray(prop.default_value)
                ? prop.default_value.map((v) => `\`${v}\``).join(", ")
                : `\`${prop.default_value}\``;
            dataListItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Default", variant: "body2" },
                value: { type: "Markdown", content: raw },
            });
        }
        // 4. Allowed Values (if any)
        if (prop.allowed_values && prop.allowed_values.length > 0) {
            const chips = prop.allowed_values.map((v) => ({
                type: "Chip",
                label: v,
                variant: "outlined",
                color: "primary",
                size: "small",
            }));
            dataListItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Allowed Values", variant: "body2" },
                value: {
                    type: "ChipGroup",
                    childrenProps: chips,
                    maxItems: 5,
                },
            });
        }
        // 5. Editable By (if provided)
        if (prop.values_editable_by) {
            dataListItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Editable By", variant: "body2" },
                value: {
                    type: "Chip",
                    label: prop.values_editable_by,
                    variant: "outlined",
                    color: "info",
                },
            });
        }
        // Assemble the components of each card
        const header = {
            type: "CardHeader",
            title: prop.property_name,
            description: (_a = prop.description) !== null && _a !== void 0 ? _a : undefined,
            startElement: {
                type: "Icon",
                id: iconInfo.id,
                color: iconInfo.color,
                size: 24,
            },
        };
        const content = {
            type: "CardContent",
            childrenProps: {
                type: "DataList",
                childrenProps: dataListItems,
            },
        };
        // Footer with a link button if a URL is present
        const footer = {
            type: "CardFooter",
            childrenProps: prop.url
                ? {
                    type: "Button",
                    label: "View API",
                    href: prop.url,
                    variant: "outlined",
                    size: "small",
                }
                : undefined,
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer],
        };
    });
    // Wrap all cards in a responsive Carousel for easy navigation
    return {
        type: "Carousel",
        childrenProps: cards,
        indicators: true,
        navControls: true,
        infinite: false,
        // small gutter for spacing on mobile
        gutter: 8,
    };
}
//# sourceMappingURL=506.js.map