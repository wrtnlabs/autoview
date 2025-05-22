import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsHostedRunnersMachineSizes {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            machine_specs: AutoViewInputSubTypes.actions_hosted_runner_machine_spec[];
        };
    }
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
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsHostedRunnersMachineSizes.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, machine_specs } = value;
  // Sort specs by ascending CPU cores for consistent display order
  const sortedSpecs = [...machine_specs].sort((a, b) => a.cpu_cores - b.cpu_cores);
  // Calculate average CPU cores across all specs
  const avgCores =
    machine_specs.length > 0
      ? (machine_specs.reduce((sum, s) => sum + s.cpu_cores, 0) / machine_specs.length).toFixed(1)
      : '0';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  //    Mobile-first responsive grid of cards.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Hosted Runner Machine Sizes
        </h2>
        <p className="text-sm text-gray-600">
          Total Configurations: <span className="font-medium">{total_count}</span>
          {' '}| Avg. CPU Cores: <span className="font-medium">{avgCores}</span>
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedSpecs.map((spec) => (
          <div
            key={spec.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-md font-medium text-gray-900 truncate">{spec.id}</h3>
            <dl className="mt-2 text-sm text-gray-700 space-y-1">
              <div className="flex justify-between">
                <dt className="font-semibold">CPU Cores</dt>
                <dd>{spec.cpu_cores}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-semibold">Memory</dt>
                <dd>{spec.memory_gb} GB</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-semibold">Storage</dt>
                <dd>{spec.storage_gb} GB</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
