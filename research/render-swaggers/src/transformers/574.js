export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to convert bytes to a human-readable format
    const formatBytes = (bytes) => {
        if (bytes === 0)
            return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const value = bytes / Math.pow(k, i);
        // Round to one decimal place, remove trailing .0
        return `${parseFloat(value.toFixed(1))} ${sizes[i]}`;
    };
    // Compute human-readable size
    const humanSize = formatBytes(input.active_caches_size_in_bytes);
    // Card header with GitHub icon and repository name
    const cardHeader = {
        type: "CardHeader",
        title: input.full_name,
        startElement: {
            type: "Icon",
            id: "github",
            size: 24,
            color: "gray",
        },
        // Show total size in description as a quick glance
        description: humanSize,
    };
    // Build a DataList of metrics: count and total size
    const dataListItems = [
        {
            type: "DataListItem",
            // Label as text
            label: {
                type: "Text",
                content: "Active Cache Count",
                variant: "body2",
            },
            // Value as a colored chip to stand out
            value: {
                type: "Chip",
                label: input.active_caches_count.toString(),
                color: "primary",
                variant: "outlined",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Active Cache Size",
                variant: "body2",
            },
            value: {
                type: "Chip",
                label: humanSize,
                color: "secondary",
                variant: "filled",
                size: "small",
            },
        },
    ];
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Card content wrapping the data list
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Compose a vertical card: header + content
    const card = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
    return card;
}
//# sourceMappingURL=574.js.map