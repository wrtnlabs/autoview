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
  const {
    name,
    status,
    platform,
    maximum_runners = 10,
    public_ip_enabled,
    public_ips,
    image_details,
    machine_size_details,
    last_active_on,
  } = value;

  const formattedLastActive: string = last_active_on
    ? new Date(last_active_on).toLocaleString()
    : "Never";

  function renderStatusIcon(status: AutoViewInput["status"]): JSX.Element {
    switch (status) {
      case "Ready":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "Provisioning":
        return (
          <LucideReact.Loader
            className="animate-spin text-amber-500"
            size={16}
          />
        );
      case "Shutdown":
        return <LucideReact.XCircle className="text-red-500" size={16} />;
      case "Deleting":
        return <LucideReact.Trash2 className="text-red-500" size={16} />;
      case "Stuck":
        return (
          <LucideReact.AlertTriangle className="text-orange-500" size={16} />
        );
      default:
        return <LucideReact.HelpCircle className="text-gray-400" size={16} />;
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        <div className="flex items-center gap-1">
          {renderStatusIcon(status)}
          <span className="text-sm font-medium text-gray-600">{status}</span>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <LucideReact.Server size={16} />
          <span>{platform}</span>
        </div>

        {image_details && (
          <div className="flex items-center gap-2">
            <LucideReact.Image size={16} />
            <span className="truncate">
              {image_details.display_name} ({image_details.size_gb} GB,{" "}
              {image_details.source})
            </span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="flex items-center gap-1">
            <LucideReact.Cpu size={16} />
            <span>{machine_size_details.cpu_cores} cores</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Database size={16} />
            <span>{machine_size_details.memory_gb} GB RAM</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.HardDrive size={16} />
            <span>{machine_size_details.storage_gb} GB Storage</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LucideReact.Users size={16} />
          <span>Max runners: {maximum_runners}</span>
        </div>

        <div className="flex items-center gap-2">
          {public_ip_enabled ? (
            <>
              <LucideReact.Globe size={16} />
              <span className="truncate">
                {public_ips && public_ips.length > 0
                  ? public_ips
                      .filter((ip) => ip.enabled !== false && ip.prefix)
                      .map((ip) => `${ip.prefix}/${ip.length}`)
                      .join(", ")
                  : "Enabled"}
              </span>
            </>
          ) : (
            <>
              <LucideReact.XCircle className="text-red-500" size={16} />
              <span>Public IP Disabled</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <LucideReact.Clock size={16} />
          <span>Last active: {formattedLastActive}</span>
        </div>
      </div>
    </div>
  );
}
