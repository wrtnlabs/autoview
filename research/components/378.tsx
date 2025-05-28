import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A Github-hosted hosted runner.
     *
     * @title GitHub-hosted hosted runner
    */
    export interface actions_hosted_runner {
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
        image_details: AutoViewInputSubTypes.nullable_actions_hosted_runner_pool_image;
        machine_size_details: AutoViewInputSubTypes.actions_hosted_runner_machine_spec;
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
        public_ips?: AutoViewInputSubTypes.public_ip[];
        /**
         * The time at which the runner was last used, in ISO 8601 format.
        */
        last_active_on?: (string & tags.Format<"date-time">) | null;
    }
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
    export interface actions_hosted_runner_machine_spec {
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
    }
    /**
     * Provides details of Public IP for a GitHub-hosted larger runners
     *
     * @title Public IP for a GitHub-hosted larger runners.
    */
    export interface public_ip {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.actions_hosted_runner;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    name,
    status,
    platform,
    image_details,
    machine_size_details,
    maximum_runners = 10,
    public_ip_enabled,
    public_ips,
    last_active_on,
  } = value;

  const statusMap: Record<
    AutoViewInput["status"],
    { icon: React.ReactNode; label: string }
  > = {
    Ready: {
      icon: <LucideReact.CheckCircle size={20} className="text-green-500" />,
      label: "Ready",
    },
    Provisioning: {
      icon: (
        <LucideReact.Loader
          size={20}
          className="animate-spin text-amber-500"
        />
      ),
      label: "Provisioning",
    },
    Shutdown: {
      icon: <LucideReact.Power size={20} className="text-gray-500" />,
      label: "Shutdown",
    },
    Deleting: {
      icon: <LucideReact.Trash2 size={20} className="text-red-500" />,
      label: "Deleting",
    },
    Stuck: {
      icon: <LucideReact.AlertTriangle size={20} className="text-red-500" />,
      label: "Stuck",
    },
  };

  const { icon: StatusIcon } = statusMap[status];
  const formattedLastActive = last_active_on
    ? new Date(last_active_on).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never active";

  const ipCount = public_ips?.length ?? 0;
  const imageName = image_details?.display_name ?? "N/A";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Header: Status and Name */}
      <div className="flex items-center gap-2">
        {StatusIcon}
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {name}
        </h2>
      </div>

      {/* Platform Badge */}
      <div className="flex items-center text-sm text-gray-600">
        <LucideReact.Terminal size={16} className="mr-1" />
        <span className="capitalize">{platform}</span>
      </div>

      {/* Machine Specs */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Cpu size={16} />
          <span>{machine_size_details.cpu_cores} CPU</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Server size={16} />
          <span>{machine_size_details.memory_gb} GB RAM</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.HardDrive size={16} />
          <span>{machine_size_details.storage_gb} GB Storage</span>
        </div>
      </div>

      {/* Additional Details Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 w-full md:w-auto">
        <div className="flex items-center gap-1 truncate">
          <LucideReact.Image size={16} />
          <span className="truncate">{imageName}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} />
          <span>Max runners: {maximum_runners}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Globe size={16} />
          <span>
            {public_ip_enabled
              ? `${ipCount} public IP${ipCount === 1 ? "" : "s"}`
              : "No public IP"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>{formattedLastActive}</span>
        </div>
      </div>
    </div>
  );
}
