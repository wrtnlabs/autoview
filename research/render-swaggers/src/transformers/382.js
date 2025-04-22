export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { total_count, machine_specs } = input;
    // Transform each machine spec into a DataListItem with icon-based Chips for CPU, Memory, and Storage
    const specItems = machine_specs.map(spec => ({
        type: "DataListItem",
        // Label column: the machine spec ID
        label: [
            {
                type: "Text",
                // Display the spec ID as plain text
                content: spec.id
            }
        ],
        // Value column: a row of Chips, each with an icon and value
        value: [
            {
                type: "Chip",
                label: `${spec.cpu_cores} cores`,
                startElement: {
                    type: "Icon",
                    id: "microchip", // CPU icon
                    size: 16,
                    color: "gray"
                },
                color: "primary",
                size: "small",
                variant: "outlined"
            },
            {
                type: "Chip",
                label: `${spec.memory_gb} GB`,
                startElement: {
                    type: "Icon",
                    id: "memory", // RAM icon
                    size: 16,
                    color: "gray"
                },
                color: "info",
                size: "small",
                variant: "outlined"
            },
            {
                type: "Chip",
                label: `${spec.storage_gb} GB`,
                startElement: {
                    type: "Icon",
                    id: "hdd", // Storage icon
                    size: 16,
                    color: "gray"
                },
                color: "secondary",
                size: "small",
                variant: "outlined"
            }
        ]
    }));
    // If no specs, show a friendly Markdown message
    const contentChildren = specItems.length > 0
        ? [
            {
                type: "DataList",
                childrenProps: specItems
            }
        ]
        : [
            {
                type: "Markdown",
                content: "_No machine specs available._"
            }
        ];
    // Compose the final VerticalCard with a header and the content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Hosted Runner Machine Specs",
                description: `Total specs: ${total_count}`,
                startElement: {
                    type: "Icon",
                    id: "server", // A server icon to represent the collection
                    size: 24,
                    color: "blue"
                }
            },
            {
                type: "CardContent",
                childrenProps: contentChildren
            }
        ]
    };
}
//# sourceMappingURL=382.js.map