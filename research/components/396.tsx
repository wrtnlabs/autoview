import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnerGroupsHostedRunners {
        export type GetResponse = {
            total_count: number;
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnerGroupsHostedRunners.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, runners } = value;
  const statusCounts = runners.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const statusEntries = Object.entries(statusCounts);
  const formatDate = (dateStr?: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
      : 'Never';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.

  // 3. Return the React element.
  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600">
        Total runners: {total_count}
        {statusEntries.length > 0 && (
          <>
            {' '}
            |
            {statusEntries.map(([status, count], i) => (
              <span key={status}>
                {' '}
                {status}: {count}
                {i < statusEntries.length - 1 ? ' |' : ''}
              </span>
            ))}
          </>
        )}
      </div>

      {runners.length === 0 ? (
        <p className="text-center text-gray-500">No runners available.</p>
      ) : (
        <ul className="space-y-4">
          {runners.map((runner) => (
            <li key={runner.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {runner.name}
                </h3>
                <span
                  className={
                    `mt-2 sm:mt-0 inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      runner.status === 'Ready'
                        ? 'bg-green-100 text-green-800'
                        : runner.status === 'Provisioning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : runner.status === 'Shutdown'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-red-100 text-red-800'
                    }`
                  }
                >
                  {runner.status}
                </span>
              </div>
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
                <div className="flex flex-col">
                  <dt className="font-medium">Platform</dt>
                  <dd>{runner.platform}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="font-medium">Last Active</dt>
                  <dd>{formatDate(runner.last_active_on)}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="font-medium">Image</dt>
                  <dd>
                    {runner.image_details
                      ? `${runner.image_details.display_name} (${runner.image_details.size_gb}GB)`
                      : 'N/A'}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="font-medium">Machine</dt>
                  <dd>
                    {`${runner.machine_size_details.cpu_cores} vCPU, ${runner.machine_size_details.memory_gb}GB RAM`}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="font-medium">Public IP</dt>
                  <dd>
                    {runner.public_ip_enabled
                      ? runner.public_ips && runner.public_ips.length > 0
                        ? `${runner.public_ips.length} range${runner.public_ips.length > 1 ? 's' : ''}`
                        : 'Enabled'
                      : 'Disabled'}
                  </dd>
                </div>
                {runner.maximum_runners != null && (
                  <div className="flex flex-col">
                    <dt className="font-medium">Max Runners</dt>
                    <dd>{runner.maximum_runners}</dd>
                  </div>
                )}
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
