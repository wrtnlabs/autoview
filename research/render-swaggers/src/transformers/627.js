export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Prepare list items representing each boolean flag in the input.
    const dataListItems = [];
    // Item for "enabled" flag.
    dataListItems.push({
        type: "DataListItem",
        // Use a Text component for the label.
        label: [
            {
                type: "Text",
                content: "Security updates enabled",
            },
        ],
        // Display the boolean as a color‑coded Chip: green for enabled, red for disabled.
        value: {
            type: "Chip",
            label: input.enabled ? "Yes" : "No",
            color: input.enabled ? "success" : "error",
            size: "small",
            variant: "filled",
        },
    });
    // Item for "paused" flag.
    dataListItems.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: "Security updates paused",
            },
        ],
        // Show "Yes" in warning color if paused, otherwise "No" in info color.
        value: {
            type: "Chip",
            label: input.paused ? "Yes" : "No",
            color: input.paused ? "warning" : "info",
            size: "small",
            variant: "filled",
        },
    });
    // Compose the DataList component from the items.
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Return a responsive vertical card with a header and the data list.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with an icon for visual context.
                type: "CardHeader",
                title: "Dependabot Security Updates",
                startElement: {
                    type: "Icon",
                    id: "shield-alt", // Using the FontAwesome "shield-alt" icon.
                    color: "blue",
                    size: 24,
                },
            },
            {
                // Card content contains the DataList.
                type: "CardContent",
                childrenProps: [dataList],
            },
        ],
    };
}
//# sourceMappingURL=627.js.map