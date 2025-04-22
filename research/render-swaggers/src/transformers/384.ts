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
  // Map runner status to chip color
  const statusColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    Ready: "success",
    Provisioning: "info",
    Shutdown: "gray",
    Deleting: "error",
    Stuck: "warning",
  };

  // Helper to create a Text component
  const makeText = (text: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: text,
  });

  // Helper to create a Chip component
  const makeChip = (label: string, color?: IAutoView.IAutoViewChipProps["color"]): IAutoView.IAutoViewChipProps => ({
    type: "Chip",
    label,
    ...(color ? { color } : {}),
  });

  // Build the list of data list items
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Status
  items.push({
    type: "DataListItem",
    label: [makeText("Status")],
    value: [
      makeChip(input.status, statusColorMap[input.status] || "primary"),
    ],
  });

  // Platform
  items.push({
    type: "DataListItem",
    label: [makeText("Platform")],
    value: [makeText(input.platform)],
  });

  // Runner Group ID (optional)
  if (input.runner_group_id !== undefined) {
    items.push({
      type: "DataListItem",
      label: [makeText("Runner Group")],
      value: [makeText(input.runner_group_id.toString())],
    });
  }

  // Maximum Runners
  if (input.maximum_runners !== undefined) {
    items.push({
      type: "DataListItem",
      label: [makeText("Max Runners")],
      value: [makeText(input.maximum_runners.toString())],
    });
  }

  // Image details (nullable)
  if (input.image_details) {
    const img = input.image_details;
    const chips: IAutoView.IAutoViewChipProps[] = [];
    chips.push(makeChip(img.display_name));
    chips.push(makeChip(`${img.size_gb} GB`));
    chips.push(makeChip(img.source));
    items.push({
      type: "DataListItem",
      label: [makeText("Image")],
      value: [{
        type: "ChipGroup",
        childrenProps: chips,
      }],
    });
  }

  // Machine spec details
  {
    const spec = input.machine_size_details;
    const chips: IAutoView.IAutoViewChipProps[] = [];
    chips.push(makeChip(`${spec.cpu_cores} cores`));
    chips.push(makeChip(`${spec.memory_gb} GB RAM`));
    chips.push(makeChip(`${spec.storage_gb} GB SSD`));
    items.push({
      type: "DataListItem",
      label: [makeText("Machine Spec")],
      value: [{
        type: "ChipGroup",
        childrenProps: chips,
      }],
    });
  }

  // Public IP enabled
  items.push({
    type: "DataListItem",
    label: [makeText("Public IP")],
    value: [
      makeChip(input.public_ip_enabled ? "Enabled" : "Disabled",
               input.public_ip_enabled ? "success" : "gray"),
    ],
  });

  // Public IP ranges (optional array)
  if (Array.isArray(input.public_ips) && input.public_ips.length > 0) {
    const ipChips: IAutoView.IAutoViewChipProps[] = [];
    for (const ip of input.public_ips) {
      if (ip.prefix && ip.length !== undefined) {
        ipChips.push(makeChip(`${ip.prefix}/${ip.length}`));
      }
    }
    if (ipChips.length > 0) {
      items.push({
        type: "DataListItem",
        label: [makeText("IP Ranges")],
        value: [{
          type: "ChipGroup",
          childrenProps: ipChips,
        }],
      });
    }
  }

  // Last active time
  const lastActive = input.last_active_on
    ? new Date(input.last_active_on).toLocaleString()
    : "Never";
  items.push({
    type: "DataListItem",
    label: [makeText("Last Active")],
    value: [makeText(lastActive)],
  });

  // Compose the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Build the card header with an icon and basic info
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `ID: ${input.id}`,
    startElement: {
      type: "Icon",
      id: "server", // generic server icon
      color: "blue",
      size: 32,
    },
  };

  // Wrap everything in a vertical card for a responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [
      header,
      {
        type: "CardContent",
        // we can pass a single presentation component directly
        childrenProps: dataList,
      },
    ],
  };
}
