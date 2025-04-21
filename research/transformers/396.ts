import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsRunnerGroupsHostedRunners {
        export type GetResponse = {
            total_count: number;
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
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsRunnerGroupsHostedRunners.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map runner statuses to chip colors for quick visual cues
  const statusColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
    Ready: 'success',
    Provisioning: 'warning',
    Shutdown: 'gray',
    Deleting: 'error',
    Stuck: 'pink',
  };

  // For each runner, build a small card with header and detailed content
  const cards: IAutoView.IAutoViewVerticalCardProps[] = input.runners.map(runner => {
    // Format the last active timestamp or fall back to a placeholder
    const lastActive = runner.last_active_on
      ? new Date(runner.last_active_on).toLocaleString()
      : 'Never active';

    // Status chip
    const statusChip: IAutoView.IAutoViewChipProps = {
      type: 'Chip',
      label: runner.status,
      color: statusColorMap[runner.status] || 'gray',
      size: 'small',
    };

    // Platform chip with an icon inferred from the platform string
    const platformLower = runner.platform.toLowerCase();
    const platformIconId =
      platformLower.includes('win') ? 'windows' :
      platformLower.includes('linux') ? 'linux' :
      'desktop';
    const platformChip: IAutoView.IAutoViewChipProps = {
      type: 'Chip',
      label: runner.platform,
      size: 'small',
      startElement: {
        type: 'Icon',
        id: platformIconId,
        size: 16,
      },
    };

    // Resource chips: CPU, RAM, and Storage
    const cpuChip: IAutoView.IAutoViewChipProps = {
      type: 'Chip',
      label: `${runner.machine_size_details.cpu_cores} CPU`,
      size: 'small',
      startElement: {
        type: 'Icon',
        id: 'microchip',
        size: 16,
      },
    };
    const memoryChip: IAutoView.IAutoViewChipProps = {
      type: 'Chip',
      label: `${runner.machine_size_details.memory_gb} GB RAM`,
      size: 'small',
      startElement: {
        type: 'Icon',
        id: 'memory',
        size: 16,
      },
    };
    const storageChip: IAutoView.IAutoViewChipProps = {
      type: 'Chip',
      label: `${runner.machine_size_details.storage_gb} GB SSD`,
      size: 'small',
      startElement: {
        type: 'Icon',
        id: 'hdd',
        size: 16,
      },
    };

    // Badge to show how many public IPs are available (omit if zero)
    const ipCount = runner.public_ips?.length ?? 0;
    const ipBadge: IAutoView.IAutoViewBadgeProps = {
      type: 'Badge',
      childrenProps: {
        type: 'Icon',
        id: 'globe',
        size: 16,
      },
      count: ipCount,
      showZero: false,
      color: 'info',
    };

    // Markdown to render the last active timestamp, which handles wrapping nicely on mobile
    const lastActiveMd: IAutoView.IAutoViewMarkdownProps = {
      type: 'Markdown',
      content: `**Last Active:** ${lastActive}`,
    };

    return {
      type: 'VerticalCard',
      childrenProps: [
        {
          // Header with runner name and ID, plus a server icon
          type: 'CardHeader',
          title: runner.name,
          description: `ID: ${runner.id}`,
          startElement: {
            type: 'Icon',
            id: 'server',
            color: 'blue',
            size: 24,
          },
        },
        {
          // Body content: status/platform chips, resource specs, public IP badge, last active info
          type: 'CardContent',
          childrenProps: [
            {
              type: 'ChipGroup',
              childrenProps: [statusChip, platformChip],
            },
            {
              type: 'ChipGroup',
              childrenProps: [cpuChip, memoryChip, storageChip],
            },
            ipBadge,
            lastActiveMd,
          ],
        },
      ],
    };
  });

  // Wrap all runner cards into a swipeable carousel for mobile-friendly navigation
  const carousel: IAutoView.IAutoViewCarouselProps = {
    type: 'Carousel',
    autoPlay: false,
    infinite: true,
    effect: 'slide',
    navControls: true,
    indicators: true,
    childrenProps: cards,
  };

  return carousel;
}
