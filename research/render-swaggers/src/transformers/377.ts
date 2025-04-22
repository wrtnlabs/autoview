import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsHostedRunners {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            runners: Schema.actions_hosted_runner[];
        };
    }
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
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsHostedRunners.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map runner statuses to Chip color names for visual distinction.
  const statusColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    Ready: "green",
    Provisioning: "warning",
    Shutdown: "gray",
    Deleting: "error",
    Stuck: "error",
  };

  // Build a ListSubheader to display the total runner count.
  const listHeader: IAutoView.IAutoViewListSubheaderProps = {
    type: "ListSubheader",
    // Use a Text component inside the subheader.
    childrenProps: {
      type: "Text",
      content: `Total Runners: ${input.total_count}`,
      variant: "subtitle1",
    },
  };

  // Build one ListItem per runner.
  const runnerItems: IAutoView.IAutoViewListItemProps[] = input.runners.map(runner => {
    // Determine chip color based on status, fallback to 'info'.
    const chipColor = statusColorMap[runner.status] ?? "info";

    return {
      type: "ListItem",
      title: runner.name,
      description: runner.image_details
        ? runner.image_details.display_name
        : undefined,
      // Use a generic desktop icon for all runners (could be refined per platform).
      startElement: {
        type: "Icon",
        id: "desktop",
        size: 20,
        color: "blue",
      },
      // Display runner status as a colored chip.
      endElement: {
        type: "Chip",
        label: runner.status,
        color: chipColor,
        variant: "outlined",
        size: "small",
      },
    };
  });

  // Compose the final List component containing header + items.
  const listProps: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: [listHeader, ...runnerItems],
  };

  return listProps;
}
