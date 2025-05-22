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
  const formattedLastActive =
    value.last_active_on && !isNaN(Date.parse(value.last_active_on))
      ? new Date(value.last_active_on).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Never";

  const maxRunners = value.maximum_runners ?? 10;

  const statusStyles = (() => {
    switch (value.status) {
      case "Ready":
        return "bg-green-100 text-green-800";
      case "Provisioning":
        return "bg-yellow-100 text-yellow-800";
      case "Shutdown":
        return "bg-gray-100 text-gray-800";
      case "Deleting":
        return "bg-red-100 text-red-800";
      case "Stuck":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-900 truncate">{value.name}</h2>
        <span
          className={`mt-2 sm:mt-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles}`}
        >
          {value.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-sm">
        <div>
          <h3 className="font-medium text-gray-800 mb-1">Image Details</h3>
          {value.image_details ? (
            <ul className="space-y-1">
              <li>
                <span className="font-semibold">Name:</span> {value.image_details.display_name}
              </li>
              <li>
                <span className="font-semibold">ID:</span> {value.image_details.id}
              </li>
              <li>
                <span className="font-semibold">Size:</span> {value.image_details.size_gb} GB
              </li>
              <li>
                <span className="font-semibold">Source:</span> {value.image_details.source}
              </li>
            </ul>
          ) : (
            <p className="text-gray-500">No image information available.</p>
          )}
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-1">Machine Specs</h3>
          <ul className="space-y-1">
            <li>
              <span className="font-semibold">CPU Cores:</span> {value.machine_size_details.cpu_cores}
            </li>
            <li>
              <span className="font-semibold">Memory:</span> {value.machine_size_details.memory_gb} GB
            </li>
            <li>
              <span className="font-semibold">Storage:</span> {value.machine_size_details.storage_gb} GB
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        <div>
          <h4 className="font-medium text-gray-800">Platform</h4>
          <p className="mt-1 text-gray-700">{value.platform}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-800">Max Runners</h4>
          <p className="mt-1 text-gray-700">{maxRunners}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-800">Last Active</h4>
          <p className="mt-1 text-gray-700">{formattedLastActive}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-800">Public IP</h4>
          <div className="mt-1">
            {value.public_ip_enabled ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                Enabled
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                Disabled
              </span>
            )}
            {value.public_ip_enabled && value.public_ips && value.public_ips.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-gray-600 text-xs">
                {value.public_ips.map((ip, idx) => (
                  <li key={idx}>
                    {ip.prefix}
                    {ip.length ? `/${ip.length}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
