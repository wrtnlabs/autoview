import { tags } from "typia";
import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants.
  const {
    name,
    status,
    platform,
    image_details,
    machine_size_details: { cpu_cores, memory_gb, storage_gb },
    maximum_runners,
    public_ip_enabled,
    public_ips,
    last_active_on,
  } = value;

  const statusColors: Record<AutoViewInput["status"], string> = {
    Ready: "bg-green-100 text-green-800",
    Provisioning: "bg-yellow-100 text-yellow-800",
    Shutdown: "bg-gray-100 text-gray-800",
    Deleting: "bg-red-100 text-red-800",
    Stuck: "bg-red-100 text-red-800",
  };
  const statusClass = statusColors[status] ?? "bg-gray-100 text-gray-800";

  const formattedAbsoluteDate = last_active_on
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(last_active_on))
    : "Never";

  const relativeLastActive = last_active_on
    ? (() => {
        const now = Date.now();
        const then = new Date(last_active_on).getTime();
        const diffSec = Math.floor((now - then) / 1000);
        if (diffSec < 60) return "Just now";
        if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
        if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
        return formattedAbsoluteDate;
      })()
    : "Never";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
        <span className={`text-xs font-medium px-2 py-1 rounded ${statusClass}`}>
          {status}
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-2">
        <span className="font-medium">Platform:</span> {platform}
      </div>

      {image_details && (
        <div className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Image:</span> {image_details.display_name} (
          {image_details.size_gb} GB)
        </div>
      )}

      <div className="text-sm text-gray-700 mb-2">
        <span className="font-medium">Specs:</span> {cpu_cores} CPU · {memory_gb} GB RAM · {storage_gb} GB Storage
      </div>

      {maximum_runners !== undefined && (
        <div className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Max Runners:</span> {maximum_runners}
        </div>
      )}

      <div className="text-sm text-gray-700 mb-2">
        <span className="font-medium">Network:</span>{" "}
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            public_ip_enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {public_ip_enabled ? "Public IPs Enabled" : "Private Only"}
        </span>
        {public_ip_enabled && public_ips && public_ips.length > 0 && (
          <div className="flex flex-wrap mt-1">
            {public_ips.map((ip, idx) => (
              <span
                key={idx}
                className="text-xs text-gray-800 bg-gray-100 px-2 py-1 rounded mr-1 mb-1"
              >
                {ip.prefix && ip.length ? `${ip.prefix}/${ip.length}` : "N/A"}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="text-sm text-gray-600">
        <span className="font-medium">Last Active:</span> {relativeLastActive}
      </div>
    </div>
  );
}
