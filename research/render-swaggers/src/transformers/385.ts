import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A Github-hosted hosted runner.
     *
     * @title GitHub-hosted hosted runner
    */
    export type actions_hosted_runner = {
        /**
         * The unique identifier of the hosted runner.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the hosted runner.
        */
        name: string;
        /**
         * The unique identifier of the group that the hosted runner belongs to.
        */
        runner_group_id?: number & tags.Type<"int32">;
        image_details: Schema.nullable_actions_hosted_runner_pool_image;
        machine_size_details: Schema.actions_hosted_runner_machine_spec;
        /**
         * The status of the runner.
        */
        status: "Ready" | "Provisioning" | "Shutdown" | "Deleting" | "Stuck";
        /**
         * The operating system of the image.
        */
        platform: string;
        /**
         * The maximum amount of hosted runners. Runners will not scale automatically above this number. Use this setting to limit your cost.
        */
        maximum_runners?: number & tags.Type<"int32"> & tags.Default<10>;
        /**
         * Whether public IP is enabled for the hosted runners.
        */
        public_ip_enabled: boolean;
        /**
         * The public IP ranges when public IP is enabled for the hosted runners.
        */
        public_ips?: Schema.public_ip[];
        /**
         * The time at which the runner was last used, in ISO 8601 format.
        */
        last_active_on?: (string & tags.Format<"date-time">) | null;
    };
    /**
     * Provides details of a hosted runner image
     *
     * @title GitHub-hosted runner image details.
    */
    export type nullable_actions_hosted_runner_pool_image = {
        /**
         * The ID of the image. Use this ID for the `image` parameter when creating a new larger runner.
        */
        id: string;
        /**
         * Image size in GB.
        */
        size_gb: number & tags.Type<"int32">;
        /**
         * Display name for this image.
        */
        display_name: string;
        /**
         * The image provider.
        */
        source: "github" | "partner" | "custom";
    } | null;
    /**
     * Provides details of a particular machine spec.
     *
     * @title Github-owned VM details.
    */
    export type actions_hosted_runner_machine_spec = {
        /**
         * The ID used for the `size` parameter when creating a new runner.
        */
        id: string;
        /**
         * The number of cores.
        */
        cpu_cores: number & tags.Type<"int32">;
        /**
         * The available RAM for the machine spec.
        */
        memory_gb: number & tags.Type<"int32">;
        /**
         * The available SSD storage for the machine spec.
        */
        storage_gb: number & tags.Type<"int32">;
    };
    /**
     * Provides details of Public IP for a GitHub-hosted larger runners
     *
     * @title Public IP for a GitHub-hosted larger runners.
    */
    export type public_ip = {
        /**
         * Whether public IP is enabled.
        */
        enabled?: boolean;
        /**
         * The prefix for the public IP.
        */
        prefix?: string;
        /**
         * The length of the IP prefix.
        */
        length?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.actions_hosted_runner;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Map runner status to an icon representation
    const statusIconMap: Record<string, IAutoView.IAutoViewIconProps> = {
        Ready: { type: "Icon", id: "check-circle", color: "green", size: 20 },
        Provisioning: { type: "Icon", id: "cog", color: "blue", size: 20 },
        Shutdown: { type: "Icon", id: "power-off", color: "gray", size: 20 },
        Deleting: { type: "Icon", id: "trash-alt", color: "red", size: 20 },
        Stuck: { type: "Icon", id: "exclamation-triangle", color: "orange", size: 20 },
    };

    // Helper to format date-time or fallback
    const formattedLastActive = input.last_active_on
        ? new Date(input.last_active_on).toLocaleString()
        : "Never";

    // Build a DataList of machine specs and image info
    const detailsList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: { type: "Text", content: "Machine Specs" },
                value: {
                    type: "Markdown",
                    content:
                        `- **Cores**: ${input.machine_size_details.cpu_cores}\n` +
                        `- **Memory**: ${input.machine_size_details.memory_gb} GB\n` +
                        `- **Storage**: ${input.machine_size_details.storage_gb} GB`
                }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Image Details" },
                value: input.image_details
                    ? {
                          type: "Markdown",
                          content:
                              `- **ID**: ${input.image_details.id}\n` +
                              `- **Name**: ${input.image_details.display_name}\n` +
                              `- **Size**: ${input.image_details.size_gb} GB\n` +
                              `- **Source**: ${input.image_details.source}`
                      }
                    : {
                          type: "Text",
                          content: "No image information",
                      }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Runner Group ID" },
                value: {
                    type: "Text",
                    content: input.runner_group_id !== undefined
                        ? `${input.runner_group_id}`
                        : "N/A",
                }
            }
        ]
    };

    // Build a footer with last active time and public IPs if enabled
    const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [
        {
            type: "Text",
            variant: "caption",
            content: `**Last Active**: ${formattedLastActive}`,
            color: "secondary"
        }
    ];

    if (input.public_ip_enabled && Array.isArray(input.public_ips) && input.public_ips.length > 0) {
        // Convert each public IP to a Chip
        const ipChips = input.public_ips.map((ip) => {
            const labelParts: string[] = [];
            if (ip.prefix) labelParts.push(ip.prefix);
            if (ip.length !== undefined) labelParts.push(`/${ip.length}`);
            return {
                type: "Chip",
                label: labelParts.join(""),
                color: "info",
                variant: "outlined"
            } as IAutoView.IAutoViewChipProps;
        });

        footerChildren.push({
            type: "ChipGroup",
            childrenProps: ipChips,
            maxItems: ipChips.length
        });
    }

    // Compose the VerticalCard with header, content, and footer
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: input.name,
                description: input.platform,
                startElement: statusIconMap[input.status] || {
                    type: "Icon", id: "question-circle", color: "gray", size: 20
                }
            },
            {
                type: "CardContent",
                childrenProps: detailsList
            },
            {
                type: "CardFooter",
                childrenProps: footerChildren
            }
        ]
    };

    return card;
}
