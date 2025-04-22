export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Determine a color indicator based on whether the rule is enabled
    const statusColor = input.enabled ? "green" : "red";
    // Header: show the app slug with a shield icon and a status chip
    const header = {
        type: "CardHeader",
        title: input.app.slug,
        description: `Rule #${input.id}`,
        // Use a shield icon to represent security, colored by status
        startElement: {
            type: "Icon",
            id: "shield-alt", // FontAwesome icon name
            color: statusColor,
            size: 24,
        },
        // Show a small chip indicating enabled/disabled status
        endElement: {
            type: "Chip",
            label: input.enabled ? "Enabled" : "Disabled",
            variant: "filled",
            color: statusColor,
            size: "small",
        },
    };
    // Build a data list of the key/value pairs
    const dataItems = [
        {
            type: "DataListItem",
            // Label component
            label: {
                type: "Text",
                content: "Rule ID",
                variant: "body2",
            },
            // Value component
            value: {
                type: "Text",
                content: `${input.id}`,
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Enabled",
                variant: "body2",
            },
            // Mirror the chip used in the header for consistency
            value: {
                type: "Chip",
                label: input.enabled ? "Yes" : "No",
                variant: "filled",
                color: statusColor,
                size: "small",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "App ID",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: `${input.app.id}`,
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "App Node ID",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: input.app.node_id,
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Integration URL",
                variant: "body2",
            },
            // Use markdown to render a clickable link
            value: {
                type: "Markdown",
                content: `[Open Integration](${input.app.integration_url})`,
            },
        },
    ];
    // Wrap the list items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataItems,
    };
    // Content: place the DataList inside the card content
    const content = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    // Assemble the vertical card with header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=739.js.map