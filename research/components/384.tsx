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
  const statusIcon: React.ReactNode = (() => {
    switch (value.status) {
      case "Ready":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "Provisioning":
        return <LucideReact.Loader className="animate-spin text-amber-500" size={16} />;
      case "Shutdown":
        return <LucideReact.XCircle className="text-gray-500" size={16} />;
      case "Deleting":
        return <LucideReact.Trash2 className="text-red-500" size={16} />;
      case "Stuck":
        return <LucideReact.AlertTriangle className="text-red-500" size={16} />;
      default:
        return null;
    }
  })();

  const formattedLastActive = value.last_active_on
    ? new Date(value.last_active_on).toLocaleString()
    : null;

  const maxRunners = value.maximum_runners ?? 10;
  const imageDetails = value.image_details;
  const machine = value.machine_size_details;

  const sourceLabel = imageDetails?.source
    ? imageDetails.source.charAt(0).toUpperCase() + imageDetails.source.slice(1)
    : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
        {statusIcon}
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.Server size={16} className="text-gray-500 mr-1" />
          <span>{value.platform}</span>
        </div>

        {imageDetails && (
          <div className="flex items-center text-sm text-gray-600">
            <LucideReact.Image size={16} className="text-gray-500 mr-1" />
            <span>
              {imageDetails.display_name} ({imageDetails.size_gb} GB, {sourceLabel})
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mt-2">
          <div className="flex items-center text-sm text-gray-600">
            <LucideReact.Cpu size={16} className="text-gray-500 mr-1" />
            <span>{machine.cpu_cores} cores</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <LucideReact.Server size={16} className="text-gray-500 mr-1" />
            <span>{machine.memory_gb} GB RAM</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <LucideReact.HardDrive size={16} className="text-gray-500 mr-1" />
            <span>{machine.storage_gb} GB Storage</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mt-2">
          <LucideReact.Users size={16} className="text-gray-500 mr-1" />
          <span>Max Runners: {maxRunners}</span>
        </div>

        <div className="flex items-center text-sm mt-2">
          <span className="font-medium text-gray-700 mr-1">Public IP:</span>
          {value.public_ip_enabled ? (
            <span className="flex items-center text-green-600 gap-1">
              <LucideReact.CheckCircle size={16} /> Enabled
            </span>
          ) : (
            <span className="flex items-center text-red-500 gap-1">
              <LucideReact.XCircle size={16} /> Disabled
            </span>
          )}
        </div>

        {value.public_ip_enabled && value.public_ips && value.public_ips.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium text-gray-700">IP Ranges:</span>
            <ul className="list-disc list-inside ml-5 mt-1">
              {value.public_ips.map((ip, idx) => {
                const prefix = ip.prefix ?? "―";
                const length = ip.length != null ? ip.length : "―";
                return (
                  <li key={idx}>
                    {prefix}/{length}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {formattedLastActive && (
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <LucideReact.Calendar size={16} className="text-gray-500 mr-1" />
            <span>Last Active: {formattedLastActive}</span>
          </div>
        )}
      </div>
    </div>
  );
}
