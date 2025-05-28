import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsHostedRunners {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            runners: AutoViewInputSubTypes.actions_hosted_runner[];
        }
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsHostedRunners.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count;
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Never';
    const d = new Date(dateString);
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusInfo: Record<string, { icon: JSX.Element; text: string }> = {
    Ready: {
      icon: <LucideReact.CheckCircle className="text-green-500" size={16} />,
      text: 'Ready',
    },
    Provisioning: {
      icon: <LucideReact.Loader className="animate-spin text-blue-500" size={16} />,
      text: 'Provisioning',
    },
    Shutdown: {
      icon: <LucideReact.Power className="text-gray-500" size={16} />,
      text: 'Shutdown',
    },
    Deleting: {
      icon: <LucideReact.Trash2 className="text-red-500" size={16} />,
      text: 'Deleting',
    },
    Stuck: {
      icon: <LucideReact.AlertTriangle className="text-orange-500" size={16} />,
      text: 'Stuck',
    },
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
        <LucideReact.Users size={20} className="text-gray-500" />
        <span>Total Runners: {totalCount}</span>
      </div>

      {value.runners.length === 0 ? (
        <div className="mt-6 flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No runners available</span>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {value.runners.map((runner) => {
            const info = statusInfo[runner.status] || {
              icon: <LucideReact.Circle className="text-gray-400" size={16} />,
              text: runner.status,
            };
            const publicIpCount = runner.public_ips?.length ?? 0;

            return (
              <div
                key={runner.id}
                className="border border-gray-200 rounded-lg p-4 flex flex-col space-y-2"
              >
                <h3 className="text-md font-medium text-gray-800 truncate">
                  {runner.name}
                </h3>

                <div className="flex items-center gap-1 text-sm">
                  {info.icon}
                  <span>{info.text}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <LucideReact.Cpu size={16} className="text-gray-500" />
                  <span>{runner.machine_size_details.cpu_cores} cores</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <LucideReact.Server size={16} className="text-gray-500" />
                  <span>
                    {runner.machine_size_details.memory_gb} GB RAM,{' '}
                    {runner.machine_size_details.storage_gb} GB Storage
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <LucideReact.Image size={16} className="text-gray-500" />
                  <span>
                    {runner.image_details
                      ? runner.image_details.display_name
                      : 'Default Image'}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <LucideReact.Globe
                    size={16}
                    className={
                      runner.public_ip_enabled
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    }
                  />
                  <span>
                    {runner.public_ip_enabled
                      ? `${publicIpCount} IP${
                          publicIpCount !== 1 ? 's' : ''
                        }`
                      : 'No Public IP'}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <LucideReact.Calendar size={16} className="text-gray-500" />
                  <span>Last active: {formatDate(runner.last_active_on)}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <LucideReact.HardDrive size={16} className="text-gray-500" />
                  <span>Platform: {runner.platform}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
