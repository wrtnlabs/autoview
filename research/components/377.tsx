import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsActionsHostedRunners {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      runners: AutoViewInputSubTypes.actions_hosted_runner[];
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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsActionsHostedRunners.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  type Runner = AutoViewInputSubTypes.actions_hosted_runner;
  const statusConfig: Record<
    Runner["status"],
    { icon: JSX.Element; color: string }
  > = {
    Ready: {
      icon: <LucideReact.CheckCircle size={16} />,
      color: "text-green-500",
    },
    Provisioning: {
      icon: <LucideReact.Loader className="animate-spin" size={16} />,
      color: "text-amber-500",
    },
    Shutdown: {
      icon: <LucideReact.Power size={16} />,
      color: "text-gray-500",
    },
    Deleting: {
      icon: <LucideReact.Trash size={16} />,
      color: "text-red-500",
    },
    Stuck: {
      icon: <LucideReact.AlertTriangle size={16} />,
      color: "text-orange-500",
    },
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-gray-50">
      {/* Summary */}
      <div className="mb-6 flex items-center gap-2 text-lg font-semibold text-gray-700">
        <LucideReact.Users size={20} />
        <span>Total Runners: {value.total_count}</span>
      </div>
      {/* Runner Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {value.runners.map((runner) => {
          const cfg = statusConfig[runner.status];
          const formattedLastActive = runner.last_active_on
            ? new Date(runner.last_active_on).toLocaleString()
            : "—";
          const imageName = runner.image_details
            ? runner.image_details.display_name
            : "Unknown Image";
          const imageSource = runner.image_details
            ? runner.image_details.source
            : "";
          const spec = runner.machine_size_details;
          return (
            <div
              key={runner.id}
              className="flex flex-col p-4 bg-white rounded-lg shadow-sm border"
            >
              <h3 className="text-md font-bold text-gray-800 truncate">
                {runner.name}
              </h3>
              <div className="mt-2 flex items-center gap-1 text-sm font-medium">
                <span className={cfg.color}>{cfg.icon}</span>
                <span className={cfg.color}>{runner.status}</span>
              </div>
              {/* Platform */}
              <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                <LucideReact.Computer size={16} />
                <span>{runner.platform}</span>
              </div>
              {/* Image Details */}
              <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                <LucideReact.Image size={16} />
                <span>
                  {imageName}
                  {imageSource ? ` (${imageSource})` : ""}
                </span>
              </div>
              {/* Machine Spec */}
              <div className="mt-2 text-sm text-gray-500">
                {spec.cpu_cores} CPU • {spec.memory_gb} GB RAM •{" "}
                {spec.storage_gb} GB SSD
              </div>
              {/* Maximum Runners */}
              {runner.maximum_runners != null && (
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                  <LucideReact.Users size={16} />
                  <span>Max: {runner.maximum_runners}</span>
                </div>
              )}
              {/* Public IPs */}
              {runner.public_ip_enabled && (
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                  <LucideReact.Globe size={16} />
                  <span>{runner.public_ips?.length ?? 0} IPs</span>
                </div>
              )}
              {/* Last Active */}
              <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                <LucideReact.Calendar size={16} />
                <span>{formattedLastActive}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
