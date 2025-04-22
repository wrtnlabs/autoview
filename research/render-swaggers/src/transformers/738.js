export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input with defaults for safety
    const { total_count = 0, available_custom_deployment_protection_rule_integrations = [], } = input;
    // If there are no integrations, show a friendly markdown message
    if (available_custom_deployment_protection_rule_integrations.length === 0) {
        return {
            type: "Markdown",
            content: [
                "### No integrations available\n",
                "There are no custom deployment protection rule integrations for this environment."
            ].join("\n")
        };
    }
    // Transform each integration into a DataListItem for display
    const dataListItems = available_custom_deployment_protection_rule_integrations.map((app) => ({
        type: "DataListItem",
        // Use a Text component with an icon + slug for label
        label: {
            type: "Text",
            variant: "body1",
            // The content array accepts strings and IconProps
            content: [
                { type: "Icon", id: "puzzle-piece", size: 16, color: "blue" },
                ` ${app.slug}`
            ]
        },
        // A button linking out to the integration details
        value: {
            type: "Button",
            label: "Open",
            variant: "outlined",
            color: "blue",
            size: "small",
            href: app.integration_url,
            endElement: { type: "Icon", id: "arrow-right", size: 12, color: "blue" }
        }
    }));
    // Wrap the list items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems
    };
    // Header for the card, showing total count and an icon
    const cardHeader = {
        type: "CardHeader",
        title: "Deployment Protection Apps",
        description: `Total integrations: ${total_count}`,
        startElement: {
            type: "Icon",
            id: "puzzle-piece",
            size: 20,
            color: "blue"
        }
    };
    // Content for the card, embedding the data list
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Return a vertical card that is responsive and groups header + content
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent]
    };
}
//# sourceMappingURL=738.js.map