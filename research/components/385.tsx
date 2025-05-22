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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusColor = (() => {
    switch (value.status) {
      case "Ready":
        return "bg-green-100 text-green-800";
      case "Provisioning":
        return "bg-yellow-100 text-yellow-800";
      case "Shutdown":
        return "bg-gray-100 text-gray-800";
      case "Deleting":
      case "Stuck":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  })();

  const formattedLastActive = value.last_active_on
    ? new Date(value.last_active_on).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Never";

  const maxRunners = value.maximum_runners ?? 10;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <span className={`px-2 py-1 text-sm font-medium rounded ${statusColor}`}>
          {value.status}
        </span>
      </div>

      {/* Platform */}
      <div className="text-gray-600 text-sm mb-4">
        <span className="font-medium">OS:</span> {capitalize(value.platform)}
      </div>

      {/* Details Grid */}
      <dl className="grid grid-cols-1 gap-y-3 text-gray-700 text-sm">
        {/* Machine Spec */}
        <div>
          <dt className="font-medium">Machine Spec</dt>
          <dd>
            {value.machine_size_details.cpu_cores} CPUs &middot;{" "}
            {value.machine_size_details.memory_gb} GB RAM &middot;{" "}
            {value.machine_size_details.storage_gb} GB SSD
          </dd>
        </div>

        {/* Image Details (if available) */}
        {value.image_details && (
          <div>
            <dt className="font-medium">Image</dt>
            <dd>
              {value.image_details.display_name} (
              {value.image_details.size_gb} GB,{" "}
              {capitalize(value.image_details.source)})
            </dd>
          </div>
        )}

        {/* Maximum Runners */}
        <div>
          <dt className="font-medium">Max Runners</dt>
          <dd>{maxRunners}</dd>
        </div>

        {/* Public IP */}
        <div>
          <dt className="font-medium">Public IP</dt>
          <dd>
            {value.public_ip_enabled ? "Enabled" : "Disabled"}
          </dd>
        </div>

        {/* IP Ranges (if any) */}
        {value.public_ip_enabled &&
          value.public_ips &&
          value.public_ips.length > 0 && (
            <div>
              <dt className="font-medium">IP Ranges</dt>
              <dd className="flex flex-wrap gap-2 mt-1">
                {value.public_ips.map((ip, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
                  >
                    {ip.prefix
                      ? `${ip.prefix}/${ip.length ?? ""}`
                      : "–"}
                  </span>
                ))}
              </dd>
            </div>
          )}

        {/* Last Active */}
        <div>
          <dt className="font-medium">Last Active</dt>
          <dd>{formattedLastActive}</dd>
        </div>
      </dl>
    </div>
  );
}
