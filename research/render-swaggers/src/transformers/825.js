export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to detect URIs (very basic check)
    const isUri = (s) => /^https?:\/\/.+/.test(s);
    // Transform each custom_property_value into a DataListItem
    const items = input.map(({ property_name, value }) => {
        // Label: always render the property name as a subtitle
        const label = {
            type: "Text",
            variant: "subtitle1",
            content: property_name,
        };
        // Determine the best way to render the value
        let valueComponent;
        if (value === null) {
            // Render null values as a subtle chip
            valueComponent = {
                type: "Chip",
                label: "null",
                variant: "outlined",
                color: "gray",
                size: "small",
            };
        }
        else if (Array.isArray(value)) {
            // Render arrays as a markdown bullet list for compactness
            const markdownList = value.map((v) => `- ${v}`).join("\n");
            valueComponent = {
                type: "Markdown",
                content: markdownList,
            };
        }
        else if (isUri(value)) {
            // If it's a URL, show the image directly
            valueComponent = {
                type: "Image",
                src: value,
                alt: property_name,
            };
        }
        else if (value.length > 80) {
            // Long text is better in markdown (preserves line breaks)
            valueComponent = {
                type: "Markdown",
                content: value,
            };
        }
        else {
            // Short text as inline body text
            valueComponent = {
                type: "Text",
                variant: "body2",
                content: value,
            };
        }
        // Compose the DataListItemProps
        return {
            type: "DataListItem",
            label: [label],
            value: [valueComponent],
        };
    });
    // If no properties, show a simple message
    if (items.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: "No data to display.",
        };
    }
    // Wrap the items in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Finally, wrap everything in a responsive VerticalCard
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with an icon for visual flair
                type: "CardHeader",
                title: "Properties",
                startElement: {
                    type: "Icon",
                    id: "list", // uses the FontAwesome 'list' icon
                    size: 24,
                    color: "blue",
                },
            },
            {
                // Card content holds the data list
                type: "CardContent",
                childrenProps: dataList,
            },
        ],
    };
    return card;
}
//# sourceMappingURL=825.js.map