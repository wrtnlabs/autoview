import * as LucideReact from "lucide-react";
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
      icon: (
        <LucideReact.CheckCircle
          className="text-green-500"
          size={16}
          aria-label="Ready"
        />
      ),
      label: "Ready",
    },
    Provisioning: {
      icon: (
        <LucideReact.Loader
          className="animate-spin text-blue-500"
          size={16}
          aria-label="Provisioning"
        />
      ),
      label: "Provisioning",
    },
    Shutdown: {
      icon: (
        <LucideReact.Power
          className="text-gray-500"
          size={16}
          aria-label="Shutdown"
        />
      ),
      label: "Shutdown",
    },
    Deleting: {
      icon: (
        <LucideReact.Trash2
          className="text-red-500"
          size={16}
          aria-label="Deleting"
        />
      ),
      label: "Deleting",
    },
    Stuck: {
      icon: (
        <LucideReact.AlertTriangle
          className="text-yellow-500"
          size={16}
          aria-label="Stuck"
        />
      ),
      label: "Stuck",
    },
  } as const;

  const currentStatus = statusMap[value.status];
  const formattedLastActive = value.last_active_on
    ? new Date(value.last_active_on).toLocaleString()
    : "Never used";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Name & Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <div className="flex items-center space-x-1">
          {currentStatus.icon}
          <span className="text-sm text-gray-600">{currentStatus.label}</span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        {/* Platform */}
        <div className="flex items-center space-x-1">
          <LucideReact.Server
            size={16}
            className="text-gray-500"
            aria-label="Platform"
          />
          <span>{value.platform}</span>
        </div>

        {/* Last Active */}
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar
            size={16}
            className="text-gray-500"
            aria-label="Last Active On"
          />
          <span>{formattedLastActive}</span>
        </div>

        {/* Machine Specs */}
        <div className="flex items-center space-x-1 col-span-2">
          <LucideReact.Cpu
            size={16}
            className="text-gray-500"
            aria-label="Machine Spec"
          />
          <span>
            {value.machine_size_details.cpu_cores} CPU ·{" "}
            {value.machine_size_details.memory_gb}GB RAM ·{" "}
            {value.machine_size_details.storage_gb}GB SSD
          </span>
        </div>

        {/* Image Details */}
        {value.image_details && (
          <div className="flex items-center space-x-1 col-span-2">
            <LucideReact.Image
              size={16}
              className="text-gray-500"
              aria-label="Runner Image"
            />
            <span>
              {value.image_details.display_name} ({value.image_details.size_gb}
              GB, {value.image_details.source})
            </span>
          </div>
        )}

        {/* Maximum Runners */}
        {typeof value.maximum_runners === "number" && (
          <div className="flex items-center space-x-1">
            <LucideReact.Users
              size={16}
              className="text-gray-500"
              aria-label="Maximum Runners"
            />
            <span>Max runners: {value.maximum_runners}</span>
          </div>
        )}

        {/* Public IP Enabled */}
        <div className="flex items-center space-x-1">
          <LucideReact.Globe
            size={16}
            className="text-gray-500"
            aria-label="Public IP Status"
          />
          <span>
            {value.public_ip_enabled ? "Public IP enabled" : "No public IP"}
          </span>
        </div>

        {/* Public IP List */}
        {value.public_ip_enabled &&
          value.public_ips &&
          value.public_ips.length > 0 && (
            <div className="col-span-2 text-gray-600">
              <div className="font-medium text-gray-700">Public IPs:</div>
              <ul className="list-disc list-inside space-y-0.5">
                {value.public_ips.map((ip, idx) => (
                  <li key={idx}>
                    {ip.prefix
                      ? `${ip.prefix}${ip.length != null ? `/${ip.length}` : ""}`
                      : "—"}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
  // 3. Return the React element.
  //    All displayed data is appropriately filtered, transformed, and formatted.
}
