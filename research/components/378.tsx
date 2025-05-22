import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.actions_hosted_runner;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusMap = {
    Ready: {
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
      label: "Ready",
    },
    Provisioning: {
      icon: <LucideReact.Clock size={16} className="text-amber-500" />,
      label: "Provisioning",
    },
    Shutdown: {
      icon: <LucideReact.XCircle size={16} className="text-gray-500" />,
      label: "Shutdown",
    },
    Deleting: {
      icon: <LucideReact.Trash2 size={16} className="text-red-500" />,
      label: "Deleting",
    },
    Stuck: {
      icon: <LucideReact.AlertTriangle size={16} className="text-red-500" />,
      label: "Stuck",
    },
  } as const;
  const currentStatus = statusMap[value.status];

  const lastActive = value.last_active_on
    ? new Date(value.last_active_on).toLocaleString()
    : "Never used";

  const maxRunners = value.maximum_runners ?? 10;

  const publicIpEnabled = value.public_ip_enabled;
  const publicIpRanges = value.public_ips ?? [];
  const visibleRanges = publicIpRanges.slice(0, 2);
  const moreRangesCount = publicIpRanges.length - visibleRanges.length;

  const imageDetails = value.image_details;
  const imageName = imageDetails?.display_name ?? "N/A";
  const imageSize = imageDetails?.size_gb;

  const { cpu_cores, memory_gb, storage_gb } = value.machine_size_details;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
      {/* Header: Name and Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <div className="flex items-center space-x-1">
          {currentStatus.icon}
          <span className="text-sm text-gray-700">{currentStatus.label}</span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        {/* Platform */}
        <div className="flex items-center">
          <LucideReact.Terminal size={16} className="text-gray-500" />
          <span className="ml-1 truncate">{value.platform}</span>
        </div>

        {/* Last Active */}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span className="ml-1 truncate">{lastActive}</span>
        </div>

        {/* Machine Spec */}
        <div className="sm:col-span-2">
          <span className="font-medium text-gray-700">Machine Spec</span>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-gray-600">
            <div className="flex items-center">
              <LucideReact.Cpu size={16} className="text-gray-500" />
              <span className="ml-1">{cpu_cores} cores</span>
            </div>
            <div className="flex items-center">
              <LucideReact.Database size={16} className="text-gray-500" />
              <span className="ml-1">{memory_gb} GB RAM</span>
            </div>
            <div className="flex items-center">
              <LucideReact.HardDrive size={16} className="text-gray-500" />
              <span className="ml-1">{storage_gb} GB SSD</span>
            </div>
          </div>
        </div>

        {/* Image Details */}
        <div>
          <span className="font-medium text-gray-700">Image</span>
          <div className="mt-1 truncate">
            {imageName}
            {imageSize != null && ` (${imageSize} GB)`}
          </div>
        </div>

        {/* Max Runners */}
        <div>
          <span className="font-medium text-gray-700">Max Runners</span>
          <div className="mt-1">{maxRunners}</div>
        </div>

        {/* Public IP Info */}
        <div className="sm:col-span-2">
          <span className="font-medium text-gray-700">Public IP</span>
          <div className="mt-1 flex flex-wrap items-center text-gray-600">
            {publicIpEnabled ? (
              <>
                <LucideReact.CheckCircle size={16} className="text-green-500" />
                <span className="ml-1">Enabled</span>
                {visibleRanges.map((ip, idx) => (
                  <span key={idx} className="ml-3 truncate">
                    {ip.prefix}/{ip.length}
                  </span>
                ))}
                {moreRangesCount > 0 && (
                  <span className="ml-3">+{moreRangesCount} more</span>
                )}
              </>
            ) : (
              <>
                <LucideReact.XCircle size={16} className="text-red-500" />
                <span className="ml-1">Disabled</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
