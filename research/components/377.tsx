import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsHostedRunners.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusStyles: Record<string, string> = {
    Ready: "bg-green-100 text-green-800",
    Provisioning: "bg-blue-100 text-blue-800",
    Shutdown: "bg-red-100 text-red-800",
    Deleting: "bg-yellow-100 text-yellow-800",
    Stuck: "bg-red-200 text-red-900",
  };

  const formatDate = (iso?: string | null): string =>
    iso ? new Date(iso).toLocaleString() : "Never";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900">
          Hosted Runners ({value.total_count})
        </h2>
      </div>

      {/* Runners List */}
      {value.runners.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {value.runners.map((runner) => (
            <div
              key={runner.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col"
            >
              {/* Name & Status */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-gray-800 truncate">
                  {runner.name}
                </h3>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                    statusStyles[runner.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {runner.status}
                </span>
              </div>

              {/* Details */}
              <dl className="flex-1 grid grid-cols-1 gap-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <dt className="font-medium">Platform:</dt>
                  <dd>{runner.platform}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">CPU Cores:</dt>
                  <dd>{runner.machine_size_details.cpu_cores}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Memory:</dt>
                  <dd>{runner.machine_size_details.memory_gb} GB</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Storage:</dt>
                  <dd>{runner.machine_size_details.storage_gb} GB</dd>
                </div>
                {runner.image_details && (
                  <div className="flex justify-between">
                    <dt className="font-medium">Image:</dt>
                    <dd className="truncate">
                      {runner.image_details.display_name} (
                      {runner.image_details.size_gb} GB)
                    </dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="font-medium">Last Active:</dt>
                  <dd>{formatDate(runner.last_active_on)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Public IP:</dt>
                  <dd>{runner.public_ip_enabled ? "Enabled" : "Disabled"}</dd>
                </div>
                {runner.public_ip_enabled && runner.public_ips && (
                  <div className="flex flex-col">
                    <dt className="font-medium">IP Ranges:</dt>
                    <dd className="mt-1 space-y-1">
                      {runner.public_ips.map((ip, idx) => (
                        <span
                          key={idx}
                          className="block text-xs text-gray-500 truncate"
                        >
                          {ip.prefix
                            ? `${ip.prefix}/${ip.length ?? ""}`
                            : "N/A"}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {runner.runner_group_id !== undefined && (
                  <div className="flex justify-between">
                    <dt className="font-medium">Group ID:</dt>
                    <dd>{runner.runner_group_id}</dd>
                  </div>
                )}
                {runner.maximum_runners !== undefined && (
                  <div className="flex justify-between">
                    <dt className="font-medium">Max Runners:</dt>
                    <dd>{runner.maximum_runners}</dd>
                  </div>
                )}
              </dl>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No runners available.</p>
      )}
    </div>
  );
}
