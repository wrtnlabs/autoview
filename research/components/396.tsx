import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnerGroupsHostedRunners {
        export interface GetResponse {
            total_count: number;
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnerGroupsHostedRunners.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation helpers
  const formatDateTime = (dateString?: string | null): string =>
    dateString
      ? new Date(dateString).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      : 'N/A';

  const getStatusIcon = (
    status: AutoViewInputSubTypes.actions_hosted_runner['status']
  ): React.ReactNode => {
    switch (status) {
      case 'Ready':
        return <LucideReact.CheckCircle size={16} className="text-green-500" aria-label="Ready" />;
      case 'Provisioning':
        return (
          <LucideReact.Loader
            size={16}
            className="animate-spin text-amber-500"
            aria-label="Provisioning"
          />
        );
      case 'Shutdown':
        return <LucideReact.XCircle size={16} className="text-gray-500" aria-label="Shutdown" />;
      case 'Deleting':
        return <LucideReact.Trash2 size={16} className="text-red-500" aria-label="Deleting" />;
      case 'Stuck':
        return (
          <LucideReact.AlertTriangle size={16} className="text-red-500" aria-label="Stuck" />
        );
      default:
        return null;
    }
  };

  // 2. JSX structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Hosted Runners ({value.total_count})
        </h2>
      </header>
      <div className="grid grid-cols-1 gap-4">
        {value.runners.map((runner) => (
          <div key={runner.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-md font-medium text-gray-900 truncate">{runner.name}</span>
              <div className="flex items-center gap-1">
                {getStatusIcon(runner.status)}
                <span className="text-sm text-gray-600">{runner.status}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <LucideReact.Server size={16} />
                <span>{runner.platform}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Image size={16} />
                <span>
                  {runner.image_details
                    ? `${runner.image_details.display_name} (${runner.image_details.size_gb} GB)`
                    : 'Default Image'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Cpu size={16} />
                <span>
                  {runner.machine_size_details.cpu_cores} cores ·{' '}
                  {runner.machine_size_details.memory_gb} GB RAM ·{' '}
                  {runner.machine_size_details.storage_gb} GB storage
                </span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} />
                <span>Last active: {formatDateTime(runner.last_active_on)}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Globe
                  size={16}
                  className={runner.public_ip_enabled ? 'text-green-500' : 'text-gray-400'}
                />
                <span>{runner.public_ip_enabled ? 'Public IP' : 'No Public IP'}</span>
                {runner.public_ip_enabled && runner.public_ips && runner.public_ips.length > 0 && (
                  <span>({runner.public_ips.length})</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
