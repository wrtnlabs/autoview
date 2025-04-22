export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Compute display values with sensible fallbacks
    const idDisplay = input.id != null ? input.id.toString() : "N/A";
    const createdAtDisplay = input.created_at
        ? new Date(input.created_at).toLocaleString()
        : "N/A";
    const updatedAtDisplay = input.updated_at
        ? new Date(input.updated_at).toLocaleString()
        : "N/A";
    // Determine enabled status for UI chips
    const isEnabled = Boolean(input.enabled);
    const enabledLabel = isEnabled ? "Enabled" : "Disabled";
    const enabledColor = isEnabled ? "success" : "error";
    // Build an icon to represent the "tag protection" concept
    const tagIcon = {
        type: "Icon",
        id: "tag", // FontAwesome tag icon
        color: "blue",
        size: 24,
    };
    // Build a chip to display the enabled/disabled status
    const statusChip = {
        type: "Chip",
        label: enabledLabel,
        color: enabledColor,
        size: "small",
    };
    // Use a DataList to display individual fields in a structured way
    const dataListItems = [
        {
            type: "DataListItem",
            // Field name
            label: {
                type: "Text",
                variant: "subtitle2",
                content: "ID",
            },
            // Field value
            value: {
                type: "Text",
                variant: "body2",
                content: idDisplay,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                content: "Created At",
            },
            value: {
                type: "Text",
                variant: "body2",
                content: createdAtDisplay,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                content: "Updated At",
            },
            value: {
                type: "Text",
                variant: "body2",
                content: updatedAtDisplay,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                content: "Pattern",
            },
            // Use Markdown to render the regex pattern in a code block for readability
            value: {
                type: "Markdown",
                content: "regex\n" + input.pattern + "\n```",
            },
        },
    ];
    // Assemble the full vertical card UI
    const card = {
        type: "VerticalCard",
        childrenProps: [
            // Header with title, icon, and status chip
            {
                type: "CardHeader",
                title: `Tag Protection #${idDisplay}`,
                description: "Visual representation of your tag protection rule",
                startElement: tagIcon,
                endElement: statusChip,
            },
            // Content containing the details list
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
        ],
    };
    return card;
}
//# sourceMappingURL=890.js.map