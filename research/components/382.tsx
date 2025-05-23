import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsHostedRunnersMachineSizes {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            machine_specs: AutoViewInputSubTypes.actions_hosted_runner_machine_spec[];
        }
    }
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
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsHostedRunnersMachineSizes.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const specs = value.machine_specs;
  const specCount = specs.length;
  const avgCpu = specCount > 0
    ? Math.round(specs.reduce((sum, s) => sum + s.cpu_cores, 0) / specCount)
    : 0;
  const avgMemory = specCount > 0
    ? Math.round(specs.reduce((sum, s) => sum + s.memory_gb, 0) / specCount)
    : 0;
  const avgStorage = specCount > 0
    ? Math.round(specs.reduce((sum, s) => sum + s.storage_gb, 0) / specCount)
    : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center text-sm text-gray-500">
        <LucideReact.Server size={16} className="mr-1" />
        <span>
          {value.total_count} Hosted Runner {value.total_count === 1 ? 'Size' : 'Sizes'}
        </span>
      </div>

      {specCount === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2">No machine specs available.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {specs.map((spec) => (
              <div key={spec.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg text-gray-800 truncate">{spec.id}</h3>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <LucideReact.Cpu size={16} className="text-indigo-500 mr-1" />
                    <span>{spec.cpu_cores} Cores</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Database size={16} className="text-green-500 mr-1" />
                    <span>{spec.memory_gb} GB RAM</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.HardDrive size={16} className="text-yellow-500 mr-1" />
                    <span>{spec.storage_gb} GB SSD</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <span className="text-gray-700 font-medium">Average Specs:</span>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <LucideReact.Cpu size={16} className="text-indigo-500 mr-1" />
                <span>{avgCpu} Cores</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Database size={16} className="text-green-500 mr-1" />
                <span>{avgMemory} GB RAM</span>
              </div>
              <div className="flex items-center">
                <LucideReact.HardDrive size={16} className="text-yellow-500 mr-1" />
                <span>{avgStorage} GB SSD</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
