import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsActionsHostedRunnersMachineSizes.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, machine_specs } = value;
  const specsCount = machine_specs.length;
  const averageCores =
    specsCount > 0
      ? machine_specs.reduce((sum, spec) => sum + spec.cpu_cores, 0) /
        specsCount
      : 0;
  const averageMemory =
    specsCount > 0
      ? machine_specs.reduce((sum, spec) => sum + spec.memory_gb, 0) /
        specsCount
      : 0;
  const averageStorage =
    specsCount > 0
      ? machine_specs.reduce((sum, spec) => sum + spec.storage_gb, 0) /
        specsCount
      : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Server
          size={20}
          className="text-gray-600 mr-2"
          aria-hidden
        />
        <h2 className="text-lg font-semibold text-gray-800">
          Machine Sizes ({total_count})
        </h2>
      </div>

      {/* Empty State */}
      {specsCount === 0 && (
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle size={24} className="mb-2" aria-hidden />
          <span>No machine specifications available.</span>
        </div>
      )}

      {/* Specifications Grid */}
      {specsCount > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {machine_specs.map((spec) => (
              <div
                key={spec.id}
                className="p-4 bg-gray-50 rounded-lg flex flex-col space-y-2"
              >
                <h3 className="text-sm font-medium text-gray-700 flex items-center">
                  <LucideReact.Tag
                    size={16}
                    className="text-gray-500 mr-1"
                    aria-hidden
                  />
                  {spec.id}
                </h3>
                <div className="flex items-center text-gray-600">
                  <LucideReact.Cpu
                    size={16}
                    className="text-gray-500 mr-1"
                    aria-hidden
                  />
                  <span>{spec.cpu_cores} cores</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <LucideReact.Server
                    size={16}
                    className="text-gray-500 mr-1"
                    aria-hidden
                  />
                  <span>{spec.memory_gb} GB RAM</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <LucideReact.HardDrive
                    size={16}
                    className="text-gray-500 mr-1"
                    aria-hidden
                  />
                  <span>{spec.storage_gb} GB SSD</span>
                </div>
              </div>
            ))}
          </div>

          {/* Averages Summary */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center text-gray-700">
              <LucideReact.Cpu
                size={16}
                className="text-gray-500 mr-1"
                aria-hidden
              />
              <span>Avg CPU: {averageCores.toFixed(1)}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <LucideReact.Server
                size={16}
                className="text-gray-500 mr-1"
                aria-hidden
              />
              <span>Avg RAM: {averageMemory.toFixed(1)} GB</span>
            </div>
            <div className="flex items-center text-gray-700">
              <LucideReact.HardDrive
                size={16}
                className="text-gray-500 mr-1"
                aria-hidden
              />
              <span>Avg Storage: {averageStorage.toFixed(1)} GB</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
