import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A hosted compute network settings resource.
     *
     * @title Hosted compute network settings resource
    */
    export type network_settings = {
        /**
         * The unique identifier of the network settings resource.
        */
        id: string;
        /**
         * The identifier of the network configuration that is using this settings resource.
        */
        network_configuration_id?: string;
        /**
         * The name of the network settings resource.
        */
        name: string;
        /**
         * The subnet this network settings resource is configured for.
        */
        subnet_id: string;
        /**
         * The location of the subnet this network settings resource is configured for.
        */
        region: string;
    };
}
type IAutoViewTransformerInputType = Schema.network_settings;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
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
                    id: "network-wired",       // FontAwesome "network-wired" icon
                    size: 32,
                    color: "blue"
                },
                endElement: {
                    type: "Chip",
                    label: input.region,       // Display region as a colored chip
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
                                content: input.network_configuration_id ?? "N/A",
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
