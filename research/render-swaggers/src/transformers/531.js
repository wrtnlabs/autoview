export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // We choose a vertical card to present the network settings in a compact, mobile-friendly layout.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // CardHeader: shows the resource name with a network icon and region chip.
                type: "CardHeader",
                title: input.name,
                description: `Subnet ID: ${input.subnet_id}`,
                startElement: {
                    type: "Icon",
                    id: "network-wired", // FontAwesome "network-wired" icon
                    size: 32,
                    color: "blue"
                },
                endElement: {
                    type: "Chip",
                    label: input.region, // Display region as a colored chip
                    variant: "filled",
                    color: "info"
                }
            },
            {
                // CardContent: key/value list of remaining fields.
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: [
                        {
                            // Always show the internal resource ID.
                            type: "DataListItem",
                            label: {
                                type: "Text",
                                content: "Resource ID",
                                variant: "subtitle2",
                                color: "gray"
                            },
                            value: {
                                type: "Text",
                                content: input.id,
                                variant: "body2",
                                color: "primary"
                            }
                        },
                        {
                            // Network configuration ID may be undefined; display "N/A" if so.
                            type: "DataListItem",
                            label: {
                                type: "Text",
                                content: "Configuration ID",
                                variant: "subtitle2",
                                color: "gray"
                            },
                            value: {
                                type: "Text",
                                content: (_a = input.network_configuration_id) !== null && _a !== void 0 ? _a : "N/A",
                                variant: "body2",
                                color: input.network_configuration_id ? "primary" : "gray"
                            }
                        }
                    ]
                }
            }
        ]
    };
}
//# sourceMappingURL=531.js.map