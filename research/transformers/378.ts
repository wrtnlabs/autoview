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
    // Map runner status to icon names and colors
    const statusIconMap: Record<string, string> = {
        Ready: "check-circle",
        Provisioning: "spinner",
        Shutdown: "power-off",
        Deleting: "trash-alt",
        Stuck: "exclamation-triangle",
    };
    const statusColorMap: Record<string, IAutoView.IAutoViewIconProps["color"]> = {
        Ready: "green",
        Provisioning: "blue",
        Shutdown: "orange",
        Deleting: "red",
        Stuck: "red",
    };

    // Fallbacks for optional fields
    const maxRunners: number = input.maximum_runners ?? 10;
    const lastActive: string = input.last_active_on
        ? new Date(input.last_active_on).toLocaleString()
        : "Never";

    // Build list items for runner details
    const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // Runner group ID if present
    if (input.runner_group_id != null) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Group ID"] },
            value: { type: "Text", content: [input.runner_group_id.toString()] },
        });
    }

    // Platform
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: ["Platform"] },
        value: { type: "Text", content: [input.platform] },
    });

    // Maximum runners
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: ["Max Runners"] },
        value: { type: "Text", content: [maxRunners.toString()] },
    });

    // Last active time
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: ["Last Active"] },
        value: { type: "Text", content: [lastActive] },
    });

    // Image details if available
    if (input.image_details) {
        const img = input.image_details;
        // Show image display name and size
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Image"] },
            value: {
                type: "Markdown",
                content: `**${img.display_name}**  \nSize: ${img.size_gb} GB  \nSource: ${img.source}`,
            },
        });
    } else {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Image"] },
            value: { type: "Text", content: ["N/A"] },
        });
    }

    // Machine spec summary as markdown
    const spec = input.machine_size_details;
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: ["Machine Specs"] },
        value: {
            type: "Markdown",
            content:
                `- CPU cores: ${spec.cpu_cores}  \n` +
                `- Memory: ${spec.memory_gb} GB  \n` +
                `- Storage: ${spec.storage_gb} GB`,
        },
    });

    // Public IPs: show chip group if enabled
    if (input.public_ip_enabled) {
        if (input.public_ips && input.public_ips.length > 0) {
            const ipChips: IAutoView.IAutoViewChipProps[] = input.public_ips.map((ip, idx) => {
                const label = ip.prefix && ip.length != null
                    ? `${ip.prefix}/${ip.length}`
                    : ip.prefix ?? "Unknown";
                return {
                    type: "Chip",
                    label,
                    variant: "filled",
                    size: "small",
                };
            });
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: ["Public IPs"] },
                value: {
                    type: "ChipGroup",
                    childrenProps: ipChips,
                },
            });
        } else {
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: ["Public IPs"] },
                value: { type: "Text", content: ["Enabled (no ranges)"] },
            });
        }
    } else {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Public IPs"] },
            value: { type: "Text", content: ["Disabled"] },
        });
    }

    // Header: show name, status icon, and runner ID
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,
        description: input.status,
        startElement: {
            type: "Icon",
            id: statusIconMap[input.status],
            color: statusColorMap[input.status],
            size: 24,
        },
        endElement: {
            type: "Chip",
            label: `ID: ${input.id}`,
            variant: "outlined",
            size: "small",
        },
    };

    // Content: a DataList of all items
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: [
            {
                type: "DataList",
                childrenProps: listItems,
            },
        ],
    };

    // Assemble a vertical card for responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
