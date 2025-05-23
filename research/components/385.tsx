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
  const statusMap: Record<AutoViewInput["status"], { icon: JSX.Element; text: string; color: string }> = {
    Ready: {
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
      text: "Ready",
      color: "text-green-500",
    },
    Provisioning: {
      icon: <LucideReact.Loader size={16} className="text-amber-500 animate-spin" />,
      text: "Provisioning",
      color: "text-amber-500",
    },
    Shutdown: {
      icon: <LucideReact.XCircle size={16} className="text-red-500" />,
      text: "Shutdown",
      color: "text-red-500",
    },
    Deleting: {
      icon: <LucideReact.Trash2 size={16} className="text-red-400" />,
      text: "Deleting",
      color: "text-red-400",
    },
    Stuck: {
      icon: <LucideReact.AlertTriangle size={16} className="text-yellow-500" />,
      text: "Stuck",
      color: "text-yellow-500",
    },
  };
  const statusInfo = statusMap[value.status];
  const formattedLastActive = value.last_active_on
    ? new Date(value.last_active_on).toLocaleString()
    : "Never used";
  const maxRunners = value.maximum_runners ?? 10;
  const publicIpList =
    value.public_ip_enabled && value.public_ips && value.public_ips.length > 0
      ? value.public_ips
          .map((ip) => {
            const prefix = ip.prefix ?? "N/A";
            const length = ip.length != null ? `/${ip.length}` : "";
            return `${prefix}${length}`;
          })
          .join(", ")
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header: Name and Status */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
        <div className="flex items-center space-x-1">
          {statusInfo.icon}
          <span className={`${statusInfo.color} text-sm font-medium`}>{statusInfo.text}</span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 text-sm text-gray-700">
        {/* Platform */}
        <div className="flex items-center">
          <LucideReact.Server size={16} className="text-gray-500 mr-2" />
          <span>{value.platform}</span>
        </div>

        {/* Image Details */}
        <div className="flex items-center">
          <LucideReact.Image size={16} className="text-gray-500 mr-2" />
          {value.image_details ? (
            <span>
              {value.image_details.display_name} · {value.image_details.size_gb} GB ·{" "}
              <span className="capitalize">{value.image_details.source}</span>
            </span>
          ) : (
            <span className="italic text-gray-400">No image details</span>
          )}
        </div>

        {/* Machine Specs */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div className="flex items-center">
            <LucideReact.Cpu size={16} className="text-gray-500 mr-1" />
            <span>{value.machine_size_details.cpu_cores} cores</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Layers size={16} className="text-gray-500 mr-1" />
            <span>{value.machine_size_details.memory_gb} GB RAM</span>
          </div>
          <div className="flex items-center">
            <LucideReact.HardDrive size={16} className="text-gray-500 mr-1" />
            <span>{value.machine_size_details.storage_gb} GB SSD</span>
          </div>
        </div>

        {/* Max Runners */}
        <div className="flex items-center">
          <LucideReact.Users size={16} className="text-gray-500 mr-2" />
          <span>Max runners: {maxRunners}</span>
        </div>

        {/* Public IP */}
        <div className="flex items-center">
          {value.public_ip_enabled ? (
            <>
              <LucideReact.Globe size={16} className="text-blue-500 mr-2" />
              <span>
                Public IPs:{" "}
                {publicIpList ? publicIpList : <span className="font-medium">Configured</span>}
              </span>
            </>
          ) : (
            <>
              <LucideReact.XCircle size={16} className="text-gray-400 mr-2" />
              <span>Public IP Disabled</span>
            </>
          )}
        </div>

        {/* Last Active */}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-500 mr-2" />
          <span>Last active: {formattedLastActive}</span>
        </div>
      </div>
    </div>
  );
}
